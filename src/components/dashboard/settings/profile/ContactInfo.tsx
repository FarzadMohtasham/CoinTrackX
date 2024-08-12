import { useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

import Button from '@components/ui/stuff/Button.tsx';
import Heading from '@components/ui/stuff/Heading.tsx';
import UploadProfilePhoto from '@components/dashboard/settings/profile/ContactInfo_UploadProfilePhoto.tsx';
import UpdateContactInfo from '@components/dashboard/settings/profile/ContactInfo_UpdateContactInfo.tsx';

import { contactInputSchema } from '@schemas/contactInput.schema.ts';
import useUserProfile from '@/queries/auth/useUserProfile.query';
import { updateUserProfile } from '@/services/apis/auth/userProfile/updateUserProfile.api';

type ValidationErrorT = {
   inner?: ValidationError[];
};

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
   const [displayNameErrorMsg, setDisplayNameErrorMsg] = useState<string>('');
   const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');

   // Constants
   const fieldsAreValid: boolean = !!(displayNameErrorMsg || emailErrorMsg);

   // Queries
   let {
      data: userProfile,
      error: userProfileError,
      isLoading: userProfileIsLoading,
      refetch: userProfileRefetch,
   } = useUserProfile();

   const { mutateAsync: mutateContactInfo, isPending: mutateIsPending } =
      useMutation({
         mutationFn: async () => {
            await updateUserProfile({
               display_name: displayName,
            });
         },
         onSuccess: () => {
            toast.success('Contact info updated successfully');
         },
         onError: ({ message }) => {
            toast.error(message);
         },
      });

   // Handlers
   const handleResetChangesClick = () => {
      if (!userProfile) return;

      setDisplayName(userProfile?.display_name);
   };

   const saveChangesClick = async () => {
      await mutateContactInfo();
      await userProfileRefetch();
   };

   const resetErrorMessages = () => {
      setDisplayNameErrorMsg('');
      setEmailErrorMsg('');
   };

   // Validation process of user inputs
   useEffect(() => {
      const runValidation = async () => {
         try {
            await contactInputSchema.validate(
               {
                  displayName,
                  email,
               },
               { abortEarly: false },
            );
            resetErrorMessages();
         } catch (e: unknown) {
            if (!e) return;

            const error: ValidationErrorT = e;
            let displayNameFieldError = null;
            let emailFieldError = null;

            const innerError = error.inner || [];
            innerError.map((err: ValidationError) => {
               switch (err.path) {
                  case 'displayName':
                     displayNameFieldError = err.message;
                     break;
                  case 'email':
                     emailFieldError = err.message;
                     break;
               }
            });

            if (displayNameFieldError)
               setDisplayNameErrorMsg(displayNameFieldError);
            else setDisplayNameErrorMsg('');

            if (emailFieldError) setEmailErrorMsg(emailFieldError);
            else setEmailErrorMsg('');
         }
      };

      runValidation().then();
   }, [displayName, email]);

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
                     displayNameErrorMsg={displayNameErrorMsg}
                     emailErrorMsg={emailErrorMsg}
                  />
               </RightCol>
            </ContentWrapper>

            <ActionsContainer>
               <Button
                  disabled={mutateIsPending || fieldsAreValid}
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
