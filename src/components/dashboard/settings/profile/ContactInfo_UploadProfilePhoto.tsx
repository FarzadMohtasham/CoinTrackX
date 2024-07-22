import { styled } from 'styled-components';
import Heading from '@components/ui/stuff/Heading.tsx';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import UploadImageInput from '@components/ui/input-fields/UploadImage.input.tsx';
import { ImageFileTypeValidator } from '@utils/helpers.ts';
import { toast } from 'react-hot-toast';
import { ONE_MILLION } from '@data/bigNumbers.data.ts';

type UploadProfilePhotoProps = {
  imageFile: File | undefined;
  setImageFile: Dispatch<SetStateAction<File | undefined>>;
}

const UploadProfilePhotoContainer = styled.div`
    display: flex;
    gap: 100px;
    align-items: center;
`;

const LeftCol = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;

    .image-wrapper {
        img.user-profile {
            width: 80px;
            height: 80px;
            border-radius: 50%;
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
`;

const RightCol = styled.div`

`;

const maxFileSizeMB = 2;

export default function UploadProfilePhoto({ setImageFile, imageFile }: UploadProfilePhotoProps) {

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    // File type checking
    const fileTypeIsValid = ImageFileTypeValidator({
      fileType: file.type
    });

    if (!fileTypeIsValid) {
      toast.error('Invalid image file type, Please choose JPEG or PNG');
      e.target.value = '';
      return;
    }

    // File size checking
    if (!file.size || file.size > (maxFileSizeMB * ONE_MILLION)) {
      toast.error(`Please choose image file size lower that ${maxFileSizeMB}MB`);
      e.target.value = '';
      return;
    }

    setImageFile(e.target.files[0]);
  };

  return (
    <UploadProfilePhotoContainer>
      <LeftCol>
        <div className="image-wrapper">
          <img className={'user-profile'}
               src={String(imageFile) || 'https://zwrleecsvygsftotatty.supabase.co/storage/v1/object/public/CoinTrackX/blank-profile.png?t=2024-07-19T12%3A39%3A44.706Z'}
               alt={'user-profile-image'} />
        </div>
        <div className="profile-info-wrapper">
          <Heading headingType={'h6'} className={'username'}>
            Andre Samosa
          </Heading>
          <span className="email">
            andresamosa@mail.com
          </span>
        </div>
      </LeftCol>

      <RightCol>
        <UploadImageInput setImageFile={handleFileChange} />
      </RightCol>
    </UploadProfilePhotoContainer>
  );
}