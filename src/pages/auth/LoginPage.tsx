import { JSX, useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { toast } from 'react-hot-toast';

import Heading from '@components/ui/stuff/Heading.tsx';
import Button from '@components/ui/stuff/Button.tsx';
import Separator from '@components/ui/stuff/Separator.tsx';
import InputField from '@components/ui/inputFields/InputField.input.tsx';
import PasswordInputField from '@components/ui/inputFields/PasswordField.input.tsx';
import CheckboxInput from '@components/ui/inputFields/Checkbox.input.tsx';

import { loginInputValidator } from '@validations/login.validator.ts';
import { login } from '@services/apis/auth/auth.api.ts';

import {
   AuthContainer,
   AuthInnerWrapper,
   AuthLink,
   HeadContent as HeadContentStyled,
   MainContent as MainContentStyled,
} from './AuthShared.styled.tsx';
import useLocaleStorage from '@hooks/useLocaleStorage.ts';
import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig.ts';
import { useMutation } from '@tanstack/react-query';

const Container = styled(AuthContainer)``;
const Wrapper = styled(AuthInnerWrapper)``;
const HeadContent = styled(HeadContentStyled)``;
const MainContent = styled(MainContentStyled)``;
const SingUpLink = styled(AuthLink)``;

const redirectToUrlAfterAuth =
   import.meta.env.MODE === 'development'
      ? 'http://localhost:3000/dashboard'
      : 'https://coin-track-x.vercel.app/dashboard';

export default function LoginPage(): JSX.Element {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [emailFieldError, setEmailFieldError] = useState<string | null>(null);
   const [passwordFieldError, setPasswordFieldError] = useState<string | null>(
      null,
   );
   const [_, setRememberMe] = useState<boolean>(false);
   const [authIsLoading, setAuthIsLoading] = useState<boolean>(false);

   const navigate = useNavigate();

   const { mutateAsync: githubLoginMutation } = useMutation({
      mutationFn: async () => {
         await supabaseClient.auth.signInWithOAuth({
            provider: 'github',
            options: {
               redirectTo: redirectToUrlAfterAuth,
            },
         });
      },
      onMutate: () => {
         setAuthIsLoading(true);
      },
      onError: () => {
         toast.error('Failed to login with Github, Please try again.');
      },
      onSettled: () => {
         setAuthIsLoading(false);
      },
   });

   const onLoginHandler = async (): Promise<void> => {
      setAuthIsLoading(true);
      try {
         // const data = await login(email, password)
         await login(email, password);
         toast.success('Signed successfully!');
         navigate('/dashboard', {
            replace: true,
         });
      } catch (e: string | any) {
         toast.error(e.toString());
      }
      setAuthIsLoading(false);
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
               <Heading className={'heading'} tagName={'h3'}>
                  Log In
               </Heading>
               <span className={'heading-desc'}>
                  Welcome back, you’ve been missed!
               </span>
            </HeadContent>

            <MainContent>
               <div className={'google-apple-login'}>
                  <Button
                     borderRadius={'lg'}
                     onClickHandler={githubLoginMutation}
                     icon={'github-logo.svg'}
                     variant={'black'}
                     disabled={authIsLoading}
                     expanded
                     outline
                  >
                     Github
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
                  showLabel={false}
                  iconSrc={'email-icon.svg'}
                  focusIconSrc={'email-focus-icon.svg'}
                  errorMessage={emailFieldError}
                  unAllowedErrorMessages={['email is a required field']}
               />
               <PasswordInputField
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
                  isLoading={authIsLoading}
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
