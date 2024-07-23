import { styled } from 'styled-components';

export const AuthContainer = styled.main`
  background-color: #f9f8ff;
  height: 100dvh;
  display: grid;
  place-content: center;
`;

export const AuthInnerWrapper = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 20px;
  width: 95dvw;

  /*Very Small devices (landscape phones, 274px and up)*/
  @media screen and (min-width: ${(props) => props.theme.breakpoints.xsm}) {
    width: 70dvw;
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 57dvw;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
    width: 45dvw;
  }

  /*Large devices (desktops, 992px and up)*/
  @media screen and (min-width: ${(props) => props.theme.breakpoints.lg}) {
    width: 30dvw;
  }
`;

export const HeadContent = styled.div`
  margin-bottom: 38px;

  a {
    .back-btn {
      margin-bottom: 10px;
    }
  }

  .heading {
    margin-bottom: 12px;
  }

  .heading-desc {
    font-size: var(--font-size-body-md);
    color: var(--color-black-500);
    font-weight: 500;
    display: block;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;

  .google-apple-login {
    display: flex;
    gap: 16px;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    gap: 12px;
  }
`;

export const AuthLink = styled.div`
  display: flex;
  gap: 5px;

  .prefix {
    color: var(--color-black-500);
    font-weight: 500;
  }

  .postfix {
    color: var(--color-primary);
    font-weight: 500;

    &:focus {
      color: var(--color-primary);
    }
  }
`;
