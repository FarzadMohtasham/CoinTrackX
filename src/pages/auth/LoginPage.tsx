import { JSX, useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { toast } from 'react-hot-toast';

import Heading from '@/Components/UI/Stuff/Heading.tsx';
import Button from '@/Components/UI/Stuff/Button.tsx';
import Separator from '@/Components/UI/Stuff/Separator.tsx';
import InputField from '@/Components/UI/InputFields/InputField.input.tsx';
import PasswordFieldInput from '@/Components/UI/InputFields/PasswordField.input.tsx';
import CheckboxInput from '@/Components/UI/InputFields/Checkbox.input.tsx';

import { loginInputValidator } from '@/Lib/Validations/login.validator.ts';
import { login } from '@/Services/API/auth/auth.api.ts';

import {
   AuthContainer,
   AuthInnerWrapper,
   AuthLink,
   HeadContent as HeadContentStyled,
   MainContent as MainContentStyled,
} from './AuthShared.tsx';
import useLocaleStorage from '@/Lib/Hooks/useLocaleStorage.ts';

const Container = styled(AuthContainer)``;
const Wrapper = styled(AuthInnerWrapper)``;
const HeadContent = styled(HeadContentStyled)``;
const MainContent = styled(MainContentStyled)``;
const SingUpLink = styled(AuthLink)``;

export default function LoginPage(): JSX.Element {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [emailFieldError, setEmailFieldError] = useState<string | null>(null);
   const [passwordFieldError, setPasswordFieldError] = useState<string | null>(
      null,
   );
   const [_, setRememberMe] = useState<boolean>(false);

   const [authLoading, setAuthLoading] = useState<boolean>(false);

   const navigate = useNavigate();

   const onLoginHandler = async (): Promise<void> => {
      setAuthLoading(true);
      try {
         // const data = await login(email, password)
         await login(email, password);
         toast.success('Good, Sign in.html was successful!');
         navigate('/dashboard', {
            replace: true,
         });
      } catch (e: string | any) {
         toast.error(e.toString());
      }
      setAuthLoading(false);
   };

   const onGoogleAuthHandler = (): void => {
      toast.error('Google Auth service will add soon...', {
         icon: (
            <img
               src={'/icons/google-logo.png'}
               width={15}
               height={15}
               alt={'google icon'}
            />
         ),
      });
   };

   const onAppleAuthHandler = (): void => {
      toast.error('Apple Auth service will add soon...', {
         icon: (
            <img
               src={'/icons/apple-logo.png'}
               width={15}
               height={15}
               alt={'apple icon'}
            />
         ),
      });
   };

   useEffect((): void => {
      loginInputValidator({ type: 'email', payload: email }).then(
         (validationResult) => {
            if (validationResult.isValid) setEmailFieldError(null);
            else setEmailFieldError(validationResult.errorMessage);
         },
      );
   }, [email]);

   useEffect((): void => {
      loginInputValidator({ type: 'password', payload: password }).then(
         (validationResult): void => {
            if (validationResult.isValid) setPasswordFieldError(null);
            else setPasswordFieldError(validationResult.errorMessage);
         },
      );
   }, [password]);

   return (
      <Container>
         <Wrapper>
            <HeadContent>
               <Link to={'/'}>
                  <Button
                     variant={'white'}
                     icon={'back-icon.png'}
                     className={'back-btn'}
                     removePadding
                  >
                     Back
                  </Button>
               </Link>
               <Heading className={'heading'} headingType={'h3'}>
                  Log In
               </Heading>
               <span className={'heading-desc'}>
                  Welcome back, you’ve been missed!
               </span>
            </HeadContent>

            <MainContent>
               <div className={'google-apple-login'}>
                  <Button
                     expanded
                     outline
                     borderRadius={'lg'}
                     onClickHandler={onGoogleAuthHandler}
                     icon={'google-logo.png'}
                     variant={'black'}
                  >
                     Google
                  </Button>
                  <Button
                     expanded
                     outline
                     borderRadius={'lg'}
                     onClickHandler={onAppleAuthHandler}
                     icon={'apple-logo.png'}
                     variant={'black'}
                  >
                     Apple
                  </Button>
               </div>
               <Separator title={'OR'} />
               <InputField
                  inputValue={email}
                  onChangeHandler={setEmail}
                  placeHolder={'email'}
                  label={'email'}
                  iconSrc={'email-icon.svg'}
                  focusIconSrc={'email-focus-icon.svg'}
                  errorMessage={emailFieldError}
                  unAllowedErrorMessages={['email is a required field']}
               />
               <PasswordFieldInput
                  inputValue={password}
                  onChangeHandler={setPassword}
                  placeHolder={'Password'}
                  label={'password'}
                  unAllowedErrorMessages={['password is a required field']}
                  iconSrc={'password-icon.svg'}
                  errorMessage={passwordFieldError}
                  focusIconSrc={'password-focus-icon.svg'}
               />
               <CheckboxInput
                  label={'Remember me'}
                  checkBoxSetter={setRememberMe}
               />
               <Button
                  borderRadius={'lg'}
                  disabled={
                     emailFieldError !== null || passwordFieldError !== null
                  }
                  onClickHandler={onLoginHandler}
                  isLoading={authLoading}
                  expanded
               >
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
   );
}

export const loader = async () => {
   const userLocalStorage: object | null = useLocaleStorage(
      import.meta.env.VITE_User_Auth_Local_Storage_KEY,
   );

   if (userLocalStorage !== null) {
      if (JSON.parse(String(userLocalStorage)).access_token) {
         return redirect('/dashboard');
      }
   }

   return null;
};
