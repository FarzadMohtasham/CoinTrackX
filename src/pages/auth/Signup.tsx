import {JSX, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {styled} from 'styled-components'
import {toast} from 'react-hot-toast'

import Heading from '@components/ui/stuff/Heading.tsx'
import Button from '@components/ui/stuff/Button.tsx'
import Separator from '@components/ui/stuff/Separator.tsx'
import InputField from '@components/ui/input-fields/InputField.input.tsx'
import CheckboxInput from '@components/ui/input-fields/Checkbox.input.tsx'
import PasswordFieldInput from '@components/ui/input-fields/PasswordField.input.tsx'

import {signupInputValidator} from '@validations/signup.validator.ts'
import {signup} from '@services/api/auth/auth.api.ts'
import useRedirectIfAuthenticated from '@hooks/useRedirectIfAuthenticated.ts'

import {
    AuthInnerWrapper,
    HeadContent as HeadContentStyled,
    MainContent as MainContentStyled,
    AuthLink, AuthContainer,
} from '@pages/auth/Auth.styled.tsx'
import {SignupValidationResult} from '@typings/validator-types/Auth.validator.type.ts'

const LoginContainer = styled(AuthContainer)``
const LoginWrapper = styled(AuthInnerWrapper)``
const HeadContent = styled(HeadContentStyled)``
const MainContent = styled(MainContentStyled)`
  width: 100%;

  .name-inputs-wrapper {
    display: flex;
    gap: 24px;
    flex-direction: row;
    width: 100%;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    .name-inputs-wrapper {
      flex-direction: column;
      gap: 32px;
    }
  }
`
const SingUpLink = styled(AuthLink)``

export function Component(): JSX.Element {
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
    const [signupButtonDisabled, setSignupButtonDisabled] = useState<boolean>(true)

    const navigate = useNavigate()

    useRedirectIfAuthenticated('dashboard', true)

    const onSignupHandler = async (): Promise<void> => {
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

    const onGithubAuthHandler = (): void => {
        toast.error('Github Auth service will add soon...', {
            icon: <img src={'/icons/github-logo.svg'}
                       width={15}
                       height={15}
                       alt={'github icon'}/>,
        })
    }

    const onAppleAuthHandler = (): void => {
        toast.error('Apple Auth service will add soon...', {
            icon: <img src={'/icons/apple-logo.png'}
                       width={15}
                       height={15}
                       alt={'apple icon'}/>
        })
    }

    useEffect((): void => {
        signupInputValidator({
            type: 'firstName',
            payload: firstName
        }).then((validationResult: SignupValidationResult): void => {
            if (validationResult.isValid) setFirstNameFieldError(null)
            else setFirstNameFieldError(validationResult.errorMessage)
        })
    }, [firstName])

    useEffect((): void => {
        signupInputValidator({type: 'lastName', payload: lastName}).then((validationResult: SignupValidationResult): void => {
            if (validationResult.isValid) setLastNameFieldError(null)
            else setLastNameFieldError(validationResult.errorMessage)
        })
    }, [lastName])

    useEffect((): void => {
        signupInputValidator({type: 'email', payload: email}).then(validationResult => {
            if (validationResult.isValid) setEmailFieldError(null)
            else setEmailFieldError(validationResult.errorMessage)
        })
    }, [email])

    useEffect((): void => {
        signupInputValidator({type: 'password', payload: password}).then((validationResult: SignupValidationResult): void => {
            if (validationResult.isValid) setPasswordFieldError(null)
            else setPasswordFieldError(validationResult.errorMessage)
        })
    }, [password])

    useEffect(() => {
        const signUpButtonDisabledState = firstNameFieldError !== null || lastNameFieldError !== null || emailFieldError !== null || passwordFieldError !== null || !agreeTerms

        if (signUpButtonDisabledState) setSignupButtonDisabled(true)
        else setSignupButtonDisabled(false)
    }, [firstNameFieldError, lastNameFieldError, emailFieldError, passwordFieldError, agreeTerms]);


    return (
        <LoginContainer>
            <LoginWrapper>
                <HeadContent>
                    <Link to={'/'}>
                        <Button variant={'white'}
                                icon={'back-icon.png'}
                                className={'back-btn'}
                                removePadding>
                            Back
                        </Button>
                    </Link>
                    <Heading className={'heading'}
                             headingType={'h3'}>Sign Up</Heading>
                    <span className={'heading-desc'}>Create an account to continue</span>
                </HeadContent>

                <MainContent>
                    <div className={'google-apple-login'}>
                        <Button expanded
                                outline
                                borderRadius={'lg'}
                                onClickHandler={onGithubAuthHandler}
                                icon={'github-logo.svg'}
                                variant={'black'}>
                            Github
                        </Button>
                        <Button expanded
                                outline
                                borderRadius={'lg'}
                                onClickHandler={onAppleAuthHandler}
                                icon={'apple-logo.png'}
                                variant={'black'}>
                            Apple
                        </Button>
                    </div>
                    <Separator title={'OR'}/>
                    <div className={'name-inputs-wrapper'}>
                        <InputField placeHolder={'First name'}
                                    label={'first-name'}
                                    onChangeHandler={setFirstName}
                                    iconSrc={'user-icon.svg'}
                                    focusIconSrc={'user-focus-icon.svg'}
                                    errorMessage={firstNameFieldError}
                                    unAllowedErrorMessages={['first name is a required field']}
                        />
                        <InputField placeHolder={'Last name'}
                                    label={'last-name'}
                                    onChangeHandler={setLastName}
                                    iconSrc={'user-icon.svg'}
                                    focusIconSrc={'user-focus-icon.svg'}
                                    errorMessage={lastNameFieldError}
                                    unAllowedErrorMessages={['last name is a required field']}
                        />
                    </div>
                    <InputField placeHolder={'email'}
                                label={'email'}
                                onChangeHandler={setEmail}
                                iconSrc={'email-icon.svg'}
                                focusIconSrc={'email-focus-icon.svg'}
                                errorMessage={emailFieldError}
                                unAllowedErrorMessages={['email is a required field']}
                    />
                    <PasswordFieldInput placeHolder={'Password'}
                                        label={'password'}
                                        unAllowedErrorMessages={['password is a required field']}
                                        iconSrc={'password-icon.svg'}
                                        errorMessage={passwordFieldError}
                                        focusIconSrc={'password-focus-icon.svg'}
                                        onChangeHandler={setPassword}
                    />
                    <CheckboxInput label={'I agree to the Terms & Conditions'}
                                   checkBoxSetter={setAgreeTerms}/>
                    <Button borderRadius={'lg'}
                            disabled={signupButtonDisabled}
                            onClickHandler={onSignupHandler}
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
