import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { styled } from 'styled-components';

import Heading from '@components/ui/stuff/Heading.tsx';
import UploadImageInput from '@components/ui/inputFields/UploadImage.input.tsx';
import { ImageFileTypeValidator } from '@utils/helpers.ts';

import { ONE_MILLION } from '@data/bigNumbers.data.ts';
import useUserProfile from '@/queries/auth/useUserProfile.query';

type UploadProfilePhotoProps = {
   imageFile: File | undefined;
   setImageFile: Dispatch<SetStateAction<File | undefined>>;
};

const UploadProfilePhotoContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   align-items: center;

   @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
      gap: 100px;
      flex-direction: row;
   }
`;

const LeftCol = styled.div`
   display: flex;
   flex-direction: row;
   gap: 10px;
   align-items: center;

   .image-wrapper {
      img.user-profile {
         width: 80px;
         height: 80px;
         border-radius: 50%;
         object-fit: cover;
      }
   }

   .profile-info-wrapper {
      .username {
         font-weight: 500;
      }

      span.email {
         font-size: var(--font-size-body-lg);
      }
   }

   @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
      flex-direction: column;
   }
`;

const RightCol = styled.div``;

const maxFileSizeMB = 3;

export default function UploadProfilePhoto({
   setImageFile,
   imageFile,
}: UploadProfilePhotoProps) {
   const { data: userProfile } = useUserProfile();

   const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
      if (!e.target.files) {
         return;
      }

      const file = e.target.files[0];

      // File type checking
      const fileTypeIsValid = ImageFileTypeValidator({
         fileType: file.type,
      });

      if (!fileTypeIsValid) {
         toast.error('Invalid image file type, Please choose JPEG or PNG');
         e.target.value = '';
         return;
      }

      // File size checking
      if (!file.size || file.size > maxFileSizeMB * ONE_MILLION) {
         toast.error(
            `Please choose image file size lower that ${maxFileSizeMB}MB`,
         );
         e.target.value = '';
         return;
      }

      setImageFile(e.target.files[0]);
   };

   return (
      <UploadProfilePhotoContainer>
         <LeftCol>
            <div className="image-wrapper">
               {imageFile ? (
                  <img
                     className={'user-profile'}
                     src={URL.createObjectURL(imageFile)}
                     alt={'user-profile-image'}
                  />
               ) : (
                  <img
                     className={'user-profile'}
                     src={
                        userProfile?.profile_img_url ||
                        'https://zwrleecsvygsftotatty.supabase.co/storage/v1/object/public/CoinTrackX/blank-profile.png?t=2024-07-19T12%3A39%3A44.706Z'
                     }
                     alt={'user-profile-image'}
                  />
               )}
            </div>
            <div className="profile-info-wrapper">
               <Heading tagName={'h6'} className={'username'}>
                  {userProfile?.display_name
                     ? userProfile.display_name
                     : userProfile?.first_name || userProfile?.last_name
                       ? userProfile.first_name + ' ' + userProfile.last_name
                       : 'No Name :)'}
               </Heading>
               <span className="email">{userProfile?.email}</span>
            </div>
         </LeftCol>

         <RightCol>
            <UploadImageInput setImageFile={handleFileChange}>
               Upload file
            </UploadImageInput>
         </RightCol>
      </UploadProfilePhotoContainer>
   );
}
