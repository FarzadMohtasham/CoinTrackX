import {styled} from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import Heading from "../../components/ui/Heading.tsx"
import Button from "../../components/ui/Button.tsx"
import Separator from "../../components/ui/Separator.tsx"
import InputField from "../../components/ui/Input-Fields/InputField.input.tsx"
import {loginInputValidator} from "../../validation/login.validator.ts"

import {toast} from 'react-hot-toast'
import {useEffect, useState} from "react"
import PasswordFieldInput from "../../components/ui/Input-Fields/PasswordField.input.tsx"
import CheckboxInput from "../../components/ui/Input-Fields/Checkbox.input.tsx"

import {
    AuthStyled,
    AuthInnerWrapper,
    HeadContent as HeadContentStyled,
    MainContent as MainContentStyled,
    AuthLink,
} from "./Auth.styled.tsx"
import {login} from "../../services/api/auth.api.ts";
import useAutoRedirectOnAuth from "../../hooks/useAutoRedirectOnAuth.ts";

const LoginContainer = styled(AuthStyled)``
const LoginWrapper = styled(AuthInnerWrapper)``
const HeadContent = styled(HeadContentStyled)``
const MainContent = styled(MainContentStyled)``
const SingUpLink = styled(AuthLink)``

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailFieldError, setEmailFieldError] = useState<string | null>(null)
    const [passwordFieldError, setPasswordFieldError] = useState<string | null>(null)
    const [_, setRememberMe] = useState<boolean>(false)

    const [authLoading, setAuthLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    useAutoRedirectOnAuth('dashboard', true)

    const onLoginHandler = async () => {
        setAuthLoading(true)
        try {
            // const data = await login(email, password)
            await login(email, password)
            toast.success('Good, Sign in was successful!')
            navigate('/dashboard', {
                replace: true
            })
        } catch (e: string | any) {
            toast.error(e.toString())
        }
        setAuthLoading(false)
    }

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
                    <CheckboxInput label={'Remember me'}
                                   check_box_setter={setRememberMe}/>
                    <Button borderRadius={'lg'}
                            disabled={emailFieldError !== null || passwordFieldError !== null}
                            on_click_handler={onLoginHandler}
                            isLoading={authLoading}
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