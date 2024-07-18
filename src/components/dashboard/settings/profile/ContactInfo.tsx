import { styled } from 'styled-components';
import Heading from '@components/ui/stuff/Heading.tsx';
import UploadProfilePhoto from '@components/dashboard/settings/profile/ContactInfo_UploadProfilePhoto.tsx';
import UpdateContactInfo from '@components/dashboard/settings/profile/ContactInfo_UpdateContactInfo.tsx';
import Button from '@components/ui/stuff/Button.tsx';

const ContactInfoContainer = styled.div`
    border-radius: 8px;
    border: 1px solid var(--color-black-100);
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 32px;
`;

const LeftCol = styled.div`

`;

const RightCol = styled.div`

`;

const ActionsContainer = styled.div`
    display: flex;
    gap: 12px;
`;

export default function ContactInfo() {
  

  return (
    <ContactInfoContainer>
      <ContentWrapper>
        <LeftCol>
          <Heading headingType={'h6'}>
            Contact Info
          </Heading>
          <span className={'desc'}>
          Manage your information
        </span>
        </LeftCol>

        <RightCol>
          <UploadProfilePhoto />
          <UpdateContactInfo />
        </RightCol>
      </ContentWrapper>

      <ActionsContainer>
        <Button>
          Save Changes
        </Button>
        <Button outline={true}>
          Reset Changes
        </Button>
      </ActionsContainer>
    </ContactInfoContainer>
  );
}