import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { v4 as uuidv4 } from 'uuid';

import Button from '@components/ui/stuff/Button.tsx';
import Heading from '@components/ui/stuff/Heading.tsx';
import UploadProfilePhoto from '@components/dashboard/settings/profile/ContactInfo_UploadProfilePhoto.tsx';
import UpdateContactInfo from '@components/dashboard/settings/profile/ContactInfo_UpdateContactInfo.tsx';

import useUserProfile from '@/queries/auth/useUserProfile.query';
import { updateUserProfile } from '@/services/apis/auth/userProfile/updateUserProfile.api';
import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';

const ContactInfoContainer = styled.div`
   border-radius: 8px;
   border: 1px solid var(--color-black-100);
   padding: 20px;
   display: flex;
   flex-direction: column;
   gap: 20px;
`;

const ContentWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   gap: 32px;
`;

const LeftCol = styled.div`
   span.description {
      color: var(--color-black-700);
      font-size: var(--font-size-body-sm);
   }
`;

const RightCol = styled.div`
   flex-grow: 1;
   display: flex;
   flex-direction: column;
   gap: 32px;
`;

const ActionsContainer = styled.div`
   display: flex;
   gap: 12px;
`;

const ErrorContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   .desc {
      margin-bottom: 20px;
   }
`;

export default function ContactInfo() {
   const [displayName, setDisplayName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [profileImageFile, setProfileImageFile] = useState<File | undefined>();

   console.log(profileImageFile?.type);

   // ///////////////////////////////////////////////////////////
   // Queries
   const {
      data: userProfile,
      error: userProfileError,
      isLoading: userProfileIsLoading,
      refetch: userProfileRefetch,
   } = useUserProfile();

   const { mutateAsync: mutateContactInfo, isPending: mutateIsPending } =
      useMutation({
         mutationFn: async () => {
            let newUserProfileImgUrl = null;

            if (profileImageFile) {
               const { data: uploadData, error: uploadError } =
                  await supabaseClient.storage
                     .from('avatars')
                     .upload(
                        `${userProfile?.user_id}/${userProfile?.email}-${uuidv4()}.${profileImageFile.type.split('/')[1]}`,
                        profileImageFile,
                        {
                           cacheControl: '3600',
                           upsert: false,
                        },
                     );

               console.log(uploadData);

               if (uploadError) throw new Error(uploadError.message);

               const { data: signedUrlData, error: signedUrlError } =
                  await supabaseClient.storage
                     .from('avatars')
                     .createSignedUrl(
                        uploadData.path,
                        60 * 60 * 24 * 365 * 100,
                     );

               if (signedUrlError) throw new Error(signedUrlError.message);

               newUserProfileImgUrl = signedUrlData.signedUrl;
            }

            await updateUserProfile({
               display_name: displayName,
               profile_img_url:
                  newUserProfileImgUrl || userProfile?.profile_img_url,
            });
         },
         onSuccess: () => {
            toast.success('Contact info updated successfully');
         },
         onError: ({ message }) => {
            toast.error(message);
         },
      });

   // ///////////////////////////////////////////////////////////
   // Handlers
   const saveChangesClick = async () => {
      await mutateContactInfo();
      await userProfileRefetch();
   };

   const handleResetChangesClick = () => {
      if (!userProfile) return;

      setDisplayName(userProfile?.display_name);
   };

   // ///////////////////////////////////////////////////////////
   // Update fields on isLoading state change
   useEffect(() => {
      if (!userProfile) return;

      setTimeout(() => {
         setDisplayName(userProfile?.display_name || '');
         setEmail(userProfile?.email || '');
      }, 0);
   }, [userProfile]);

   useEffect(() => {
      if (userProfileError) {
         toast.error('Something went wrong, Please try again');
      }
   }, [userProfileError]);

   // ///////////////////////////////////////////////////////////
   if (userProfileIsLoading)
      return <Skeleton count={3} height={'100px'} width={'100%'} />;

   if (userProfileError) {
      return (
         <ErrorContainer>
            <Heading className="error-title">Something went wrong!</Heading>
            <span className="desc">{userProfileError}</span>
            <Button
               disabled={userProfileIsLoading}
               isLoading={userProfileIsLoading}
               onClickHandler={userProfileRefetch}
            >
               Try again
            </Button>
         </ErrorContainer>
      );
   }

   return (
      <ContactInfoContainer>
         <>
            <ContentWrapper>
               <LeftCol>
                  <Heading tagName={'h6'}>Contact Info</Heading>
                  <span className={'description'}>Manage your information</span>
               </LeftCol>

               <RightCol>
                  <UploadProfilePhoto
                     imageFile={profileImageFile}
                     setImageFile={setProfileImageFile}
                  />
                  <UpdateContactInfo
                     email={email}
                     setEmail={setEmail}
                     displayName={displayName}
                     setDisplayName={setDisplayName}
                  />
               </RightCol>
            </ContentWrapper>

            <ActionsContainer>
               <Button
                  disabled={mutateIsPending}
                  isLoading={mutateIsPending}
                  onClickHandler={saveChangesClick}
               >
                  Save Changes
               </Button>
               <Button
                  disabled={mutateIsPending}
                  outline={true}
                  onClickHandler={handleResetChangesClick}
               >
                  Reset Changes
               </Button>
            </ActionsContainer>
         </>
      </ContactInfoContainer>
   );
}
