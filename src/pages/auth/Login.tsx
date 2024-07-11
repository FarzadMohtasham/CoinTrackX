import {JSX, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {styled} from 'styled-components'
import {toast} from 'react-hot-toast'

import Heading from '@components/ui/stuff/Heading.tsx'
import Button from '@components/ui/stuff/Button.tsx'
import Separator from '@components/ui/stuff/Separator.tsx'
import InputField from '@components/ui/input-fields/InputField.input.tsx'
import PasswordFieldInput from '@components/ui/input-fields/PasswordField.input.tsx'
import CheckboxInput from '@components/ui/input-fields/Checkbox.input.tsx'

import {loginInputValidator} from '@validations/login.validator.ts'
import {login} from '@services/api/auth/auth.api.ts'

import {
    AuthInnerWrapper,
    HeadContent as HeadContentStyled,
    MainContent as MainContentStyled,
    AuthLink, AuthContainer,
} from "./Auth.styled.tsx"
import useRedirectIfAuthenticated from '@hooks/useRedirectIfAuthenticated.ts'

const Container = styled(AuthContainer)``
const Wrapper = styled(AuthInnerWrapper)``
const HeadContent = styled(HeadContentStyled)``
const MainContent = styled(MainContentStyled)``
const SingUpLink = styled(AuthLink)``

export function Component(): JSX.Element {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailFieldError, setEmailFieldError] = useState<string | null>(null)
    const [passwordFieldError, setPasswordFieldError] = useState<string | null>(null)
    const [_, setRememberMe] = useState<boolean>(false)

    const [authLoading, setAuthLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    useRedirectIfAuthenticated()

    const onLoginHandler = async (): Promise<void> => {
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

    const onGoogleAuthHandler = (): void => {
        toast.error('Google Auth service will add soon...', {
            icon: <img src={'/icons/google-logo.png'}
                       width={15}
                       height={15}
                       alt={'google icon'}/>,
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
        loginInputValidator({type: 'email', payload: email}).then(validationResult => {
            if (validationResult.isValid) setEmailFieldError(null)
            else setEmailFieldError(validationResult.errorMessage)
        })
    }, [email])

    useEffect((): void => {
        loginInputValidator({type: 'password', payload: password}).then((validationResult): void => {
            if (validationResult.isValid) setPasswordFieldError(null)
            else setPasswordFieldError(validationResult.errorMessage)
        })
    }, [password])

    return (
        <Container>
            <Wrapper>
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
                             headingType={'h3'}>Log In</Heading>
                    <span className={'heading-desc'}>Welcome back, you’ve been missed!</span>
                </HeadContent>

                <MainContent>
                    <div className={'google-apple-login'}>
                        <Button expanded
                                outline
                                borderRadius={'lg'}
                                onClickHandler={onGoogleAuthHandler}
                                icon={'google-logo.png'}
                                variant={'black'}>
                            Google
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
                    <CheckboxInput label={'Remember me'}
                                   checkBoxSetter={setRememberMe}/>
                    <Button borderRadius={'lg'}
                            disabled={emailFieldError !== null || passwordFieldError !== null}
                            onClickHandler={onLoginHandler}
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
            </Wrapper>
        </Container>
    )
}
