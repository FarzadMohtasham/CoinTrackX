import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {styled} from 'styled-components'
import {toast} from 'react-hot-toast'

import Heading from '@components/ui/Heading.tsx'
import Button from '@components/ui/Button.tsx'
import Separator from '@components/ui/Separator.tsx'
import InputField from '@components/ui/Input-Fields/InputField.input.tsx'
import CheckboxInput from '@components/ui/Input-Fields/Checkbox.input.tsx'
import PasswordFieldInput from '@components/ui/Input-Fields/PasswordField.input.tsx'

import {signupInputValidator} from '@validation/signup.validator.ts'
import {signup} from '@services/api/auth.api.ts'
import useAutoRedirectOnAuth from '@hooks/useAutoRedirectOnAuth.ts'

import {
    AuthStyled,
    AuthInnerWrapper,
    HeadContent as HeadContentStyled,
    MainContent as MainContentStyled,
    AuthLink,
} from '@pages/auth/Auth.styled.tsx'

const LoginContainer = styled(AuthStyled)``
const LoginWrapper = styled(AuthInnerWrapper)``
const HeadContent = styled(HeadContentStyled)``
const MainContent = styled(MainContentStyled)`
  width: 100%;

  .name-inputs-wrapper {
    display: flex;
    gap: 2.4rem;
    flex-direction: row;
    width: 100%;
  }

  @media screen and (max-width: ${props => props.theme.responsive.sm}) {
    .name-inputs-wrapper {
      flex-direction: column;
      gap: 3.2rem;
    }
  }
`
const SingUpLink = styled(AuthLink)``

export default function Login() {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false)

    const [firstNameFieldError, setFirstNameFieldError] = useState<string | null>(null)
    const [lastNameFieldError, setLastNameFieldError] = useState<string | null>(null)
    const [emailFieldError, setEmailFieldError] = useState<string | null>(null)
    const [passwordFieldError, setPasswordFieldError] = useState<string | null>(null)

    const [authLoading, setAuthLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    useAutoRedirectOnAuth('dashboard', true)

    const onSignupHandler = async () => {
        if (!agreeTerms) {
            toast.error('You should agree with Terms & Conditions')
            return
        }

        setAuthLoading(true)

        try {
            // const data = await signup({firstName, lastName}, email, password)
            await signup({firstName, lastName}, email, password)
            toast.success(`Congratulation, You signed up successfully :)`)
            navigate('/login')
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
        signupInputValidator({type: 'firstName', payload: firstName}).then(validationResult => {
            if (validationResult.isValid) setFirstNameFieldError(null)
            else setFirstNameFieldError(validationResult.errorMessage)
        })
    }, [firstName])

    useEffect(() => {
        signupInputValidator({type: 'lastName', payload: lastName}).then(validationResult => {
            if (validationResult.isValid) setLastNameFieldError(null)
            else setLastNameFieldError(validationResult.errorMessage)
        })
    }, [lastName])

    useEffect(() => {
        signupInputValidator({type: 'email', payload: email}).then(validationResult => {
            if (validationResult.isValid) setEmailFieldError(null)
            else setEmailFieldError(validationResult.errorMessage)
        })
    }, [email])

    useEffect(() => {
        signupInputValidator({type: 'password', payload: password}).then(validationResult => {
            if (validationResult.isValid) setPasswordFieldError(null)
            else setPasswordFieldError(validationResult.errorMessage)
        })
    }, [password])

    const signUpButtonDisabled = firstNameFieldError !== null || lastNameFieldError !== null || emailFieldError !== null || passwordFieldError !== null

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
                             heading_type={'h3'}>Sign Up</Heading>
                    <span className={'heading-desc'}>Create an account to continue</span>
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
                    <div className={'name-inputs-wrapper'}>
                        <InputField place_holder={'First name'}
                                    on_change_handler={setFirstName}
                                    icon_src={'user-icon.svg'}
                                    focus_icon_src={'user-focus-icon.svg'}
                                    error_message={firstNameFieldError}
                                    invalid_error_messages={['first name is a required field']}
                        />
                        <InputField place_holder={'Last name'}
                                    on_change_handler={setLastName}
                                    icon_src={'user-icon.svg'}
                                    focus_icon_src={'user-focus-icon.svg'}
                                    error_message={lastNameFieldError}
                                    invalid_error_messages={['last name is a required field']}
                        />
                    </div>
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
                    <CheckboxInput label={'I agree to the Terms & Conditions'}
                                   check_box_setter={setAgreeTerms}/>
                    <Button borderRadius={'lg'}
                            disabled={signUpButtonDisabled}
                            on_click_handler={onSignupHandler}
                            isLoading={authLoading}
                            expanded>
                        Sign up
                    </Button>
                    <SingUpLink>
                        <span className={'prefix'}>Already have an account?</span>
                        <Link className={'postfix'} to={'/login'}>
                            Sign In
                        </Link>
                    </SingUpLink>
                </MainContent>
            </LoginWrapper>
        </LoginContainer>
    )
}