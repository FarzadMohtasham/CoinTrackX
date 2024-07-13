import { styled } from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export default function Logo() {
  return (
    <LogoContainer className={'brand-logo'}>
      <img src={'/images/logo.svg'} className={'logo'} width={24} alt="logo" />
      <img
        src={'/images/logo-type.svg'}
        className={'logo-type'}
        width={115}
        alt="logo type"
      />
    </LogoContainer>
  );
}
