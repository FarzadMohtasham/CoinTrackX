import { styled } from 'styled-components';

import ContactInfo from '@/Components/Dashboard/Settings/Profile/ContactInfo';
import PersonalInfo from '@/Components/Dashboard/Settings/Profile/PersonalInfo';

const ProfileContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 24px;

   @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
      padding: 32px;
   }

   @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
      padding: 16px;
   }
`;

export default function ProfilePage() {
   return (
      <ProfileContainer>
         <ContactInfo />
         <PersonalInfo />
      </ProfileContainer>
   );
}
