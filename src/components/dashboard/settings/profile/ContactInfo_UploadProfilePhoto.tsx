import { styled } from 'styled-components';
import Heading from '@components/ui/stuff/Heading.tsx';
import Button from '@components/ui/stuff/Button.tsx';

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

export default function UploadProfilePhoto() {

  return (
    <UploadProfilePhotoContainer>
      <LeftCol>
        <div className="image-wrapper">
          <img className={'user-profile'}
               src={'https://zwrleecsvygsftotatty.supabase.co/storage/v1/object/public/CoinTrackX/blank-profile.png?t=2024-07-19T12%3A39%3A44.706Z'}
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
        <Button variant={'primary'} outline className="upload-button">Upload Photo</Button>
      </RightCol>
    </UploadProfilePhotoContainer>
  );
}