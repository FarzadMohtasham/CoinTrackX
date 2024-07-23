import ContactInfo from '@components/dashboard/settings/profile/ContactInfo.tsx';
import PersonalInfo from '@components/dashboard/settings/profile/PersonalInfo.tsx';
import CloseAccount from '@components/dashboard/settings/profile/CloseAccount.tsx';
import { styled } from 'styled-components';

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
        padding: 32px;
    }
    
    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
        padding: 16px;
    }
`

export default function ProfilePage() {
  return (
    <ProfileContainer>
      <ContactInfo/>
      <PersonalInfo/>
      <CloseAccount/>
    </ProfileContainer>
  );
}
