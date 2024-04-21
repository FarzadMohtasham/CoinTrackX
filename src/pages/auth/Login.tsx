import {styled} from "styled-components"
import {Link} from "react-router-dom"
import Heading from "../../components/ui/Heading.tsx"
import Button from "../../components/ui/Button.tsx"
import Separator from "../../components/ui/Separator.tsx"
import InputField from "../../components/ui/Input-Fields/InputField.input.tsx"
import {loginInputValidator} from "../../validation/login.validator.ts";

import {toast, Toaster} from 'react-hot-toast'
import {useEffect, useState} from "react";
import PasswordFieldInput from "../../components/ui/Input-Fields/PasswordField.input.tsx";
import CheckboxInput from "../../components/ui/Input-Fields/Checkbox.input.tsx";

const LoginContainer = styled.main`
  background-color: #F9F8FF;
  height: 100dvh;
  display: grid;
  place-content: center;
`

const LoginWrapper = styled.div`
  background-color: white;
  padding: 5rem;
  border-radius: 2rem;
  width: 95dvw;

  /*Very Small devices (landscape phones, 274px and up)*/
  @media (min-width: ${props => props.theme.responsive.xsm}) {
    width: 70dvw;
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media (min-width: ${props => props.theme.responsive.sm}) {
    width: 57dvw;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media (min-width: ${props => props.theme.responsive.md}) {
    width: 45dvw;
  }

  /*Large devices (desktops, 992px and up)*/
  @media (min-width: ${props => props.theme.responsive.lg}) {
    width: 30dvw;
  }
`

const HeadContent = styled.div`
  margin-bottom: 4.8rem;

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

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  .google-apple-login {
    display: flex;
    gap: 1.6rem;
  }
`

const SingUpLink = styled.div`
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

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailFieldError, setEmailFieldError] = useState<string | null>(null)
    const [passwordFieldError, setPasswordFieldError] = useState<string | null>(null)
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const onGoogleAuthHandler = () => {
        toast.error('Google Auth service will add soon...', {
            icon: <img src={'/icons/google-logo.png'}
                       width={15}
                       height={15}
                       alt={'google icon'}/>,
        })
    }

    const onAppleAuthHandler = () => {
        toast.error('Apple Auth service will add soon...', {
            icon: <img src={'/icons/apple-logo.png'}
                       width={15}
                       height={15}
                       alt={'apple icon'}/>
        })
    }

    const onLoginHandler = (): void => {
        const formData = {
            email,
            password,
            rememberMe
        }

        console.log(formData)
    }

    useEffect(() => {
        loginInputValidator({type: 'email', payload: email}).then(validationResult => {
            if (validationResult.isValid) setEmailFieldError(null)
            else setEmailFieldError(validationResult.errorMessage)
        })
    }, [email])

    useEffect(() => {
        loginInputValidator({type: 'password', payload: password}).then(validationResult => {
            if (validationResult.isValid) setPasswordFieldError(null)
            else setPasswordFieldError(validationResult.errorMessage)
        })
    }, [password])

    return (
        <LoginContainer>
            <Toaster
                position="top-center"
            />
            <LoginWrapper>
                <HeadContent>
                    <Link to={'/'}>
                        <Button btnType={'white'}
                                icon={'back-icon.png'}
                                class_name={'back-btn'}
                                remove_padding
                                hasIcon>
                            Back
                        </Button>
                    </Link>
                    <Heading class_name={'heading'}
                             heading_type={'h3'}>Log In</Heading>
                    <span className={'heading-desc'}>Welcome back, you’ve been missed!</span>
                </HeadContent>

                <MainContent>
                    <div className={'google-apple-login'}>
                        <Button expanded
                                outline
                                hasIcon
                                borderRadius={'lg'}
                                on_click_handler={onGoogleAuthHandler}
                                icon={'google-logo.png'}
                                btnType={'black'}>
                            Google
                        </Button>
                        <Button expanded
                                outline
                                hasIcon
                                borderRadius={'lg'}
                                on_click_handler={onAppleAuthHandler}
                                icon={'apple-logo.png'}
                                btnType={'black'}>
                            Apple
                        </Button>
                    </div>
                    <Separator title={'OR'}/>
                    <InputField place_holder={'email'}
                                on_change_handler={setEmail}
                                icon_src={'email-icon.svg'}
                                focus_icon_src={'email-focus-icon.svg'}
                                error_message={emailFieldError}
                                invalid_error_messages={['email is a required field']}
                    />
                    <PasswordFieldInput place_holder={'Password'}
                                        invalid_error_messages={['password is a required field']}
                                        icon_src={'password-icon.svg'}
                                        error_message={passwordFieldError}
                                        focus_icon_src={'password-focus-icon.svg'}
                                        on_change_handler={setPassword}
                    />
                    <CheckboxInput label={'Remember me'} check_box_setter={setRememberMe}/>
                    <Button borderRadius={'lg'}
                            disabled={emailFieldError !== null || passwordFieldError !== null}
                            on_click_handler={onLoginHandler}
                            expanded>
                        Log in
                    </Button>
                    <SingUpLink>
                        <span className={'prefix'}>Don’t have an account?</span>
                        <Link className={'postfix'} to={'/signup'}>
                            Sign Up
                        </Link>
                    </SingUpLink>
                </MainContent>
            </LoginWrapper>
        </LoginContainer>
    )
}