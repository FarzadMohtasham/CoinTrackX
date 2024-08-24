import { styled } from 'styled-components';

const LogoContainer = styled.div`
   display: flex;
   gap: 8px;
`;

export default function Logo() {
   return (
      <LogoContainer className={'brand-logo'}>
         <img
            src={'/images/cointrackx-logo.png'}
            className={'logo'}
            width={200}
            alt="logo"
         />
      </LogoContainer>
   );
}
