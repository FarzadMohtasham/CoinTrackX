import {styled} from 'styled-components'

export const AuthStyled = styled.main`
  background-color: #F9F8FF;
  height: 100dvh;
  display: grid;
  place-content: center;
`

export const AuthInnerWrapper = styled.div`
  background-color: white;
  padding: 5rem;
  border-radius: 2rem;
  width: 95dvw;

  /*Very Small devices (landscape phones, 274px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.xsm}) {
    width: 70dvw;
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.sm}) {
    width: 57dvw;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.md}) {
    width: 45dvw;
  }

  /*Large devices (desktops, 992px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.lg}) {
    width: 30dvw;
  }
`

export const HeadContent = styled.div`
  margin-bottom: 3.8rem;

  a {
    .back-btn {
      margin-bottom: 1rem;
    }
  }

  .heading {
    margin-bottom: 1.2rem;
  }

  .heading-desc {
    font-size: var(--font-size-body-md);
    color: var(--color-black-500);
    font-weight: 500;
    display: block;
  }
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;

  .google-apple-login {
    display: flex;
    gap: 1.6rem;
  }
  
  @media screen and (max-width: ${props => props.theme.responsive.sm}) {
    gap: 1.2rem;
  }
`

export const AuthLink = styled.div`
  display: flex;
  gap: .5rem;

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
`