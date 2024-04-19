import {styled} from "styled-components"
import Heading from "../../components/ui/Heading.tsx"
import Button from "../../components/ui/Button.tsx"
import Separator from "../../components/ui/Separator.tsx"
import EmailInput from "../../components/ui/Input-Fields/Email.input.tsx"
import {Link} from "react-router-dom"

import {toast, Toaster} from 'react-hot-toast'
import {useState} from "react";

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
`

const HeadContent = styled.div`
  margin-bottom: 4.8rem;

  a {
    text-decoration: none;

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
    text-decoration: none;
    color: var(--color-primary);
    font-weight: 500;

    &:focus {
      color: var(--color-primary);
    }
  }
`

export default function Login() {
    const [email, setEmail] = useState<string>('')
    // const [password, setPassword] = useState<string>('')

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

    return (
        <LoginContainer>
            <Toaster
                position="top-center"
            />
            {email}
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
                                on_click_handler={onGoogleAuthHandler}
                                icon={'google-logo.png'}
                                btnType={'black'}>
                            Google
                        </Button>
                        <Button expanded
                                outline
                                hasIcon
                                on_click_handler={onAppleAuthHandler}
                                icon={'apple-logo.png'}
                                btnType={'black'}>
                            Apple
                        </Button>
                    </div>
                    <Separator title={'OR'}/>
                    <EmailInput place_holder={'email'}
                                on_change_handler={setEmail}/>
                    <Button borderRadius={'lg'} expanded>
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