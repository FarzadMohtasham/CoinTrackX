import { JSX, useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { toast } from 'react-hot-toast';

import Heading from '@components/ui/stuff/Heading.tsx';
import Button from '@components/ui/stuff/Button.tsx';
import Separator from '@components/ui/stuff/Separator.tsx';
import InputField from '@components/ui/inputFields/InputField.input.tsx';
import CheckboxInput from '@components/ui/inputFields/Checkbox.input.tsx';
import PasswordInputField from '@components/ui/inputFields/PasswordField.input.tsx';

import { SignupValidationResult } from '@typings/validator/Auth.validator.type.ts';
import { signupInputValidator } from '@validations/signup.validator.ts';
import { signup } from '@services/apis/auth/auth.api.ts';
import useLocaleStorage from '@hooks/useLocaleStorage.ts';

import {
   AuthContainer,
   AuthInnerWrapper,
   AuthLink,
   HeadContent as HeadContentStyled,
   MainContent as MainContentStyled,
} from '@/pages/auth/AuthShared.styled';

const LoginContainer = styled(AuthContainer)``;
const LoginWrapper = styled(AuthInnerWrapper)``;
const HeadContent = styled(HeadContentStyled)``;
const MainContent = styled(MainContentStyled)`
   width: 100%;

   .name-inputs-wrapper {
      display: flex;
      gap: 24px;
      flex-direction: row;
      width: 100%;
   }

   @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
      .name-inputs-wrapper {
         flex-direction: column;
         gap: 32px;
      }
   }
`;
const SingUpLink = styled(AuthLink)``;

export default function SignupPage(): JSX.Element {
   const [firstName, setFirstName] = useState<string>('');
   const [lastName, setLastName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

   const [firstNameFieldError, setFirstNameFieldError] = useState<
      string | null
   >(null);
   const [lastNameFieldError, setLastNameFieldError] = useState<string | null>(
      null,
   );
   const [emailFieldError, setEmailFieldError] = useState<string | null>(null);
   const [passwordFieldError, setPasswordFieldError] = useState<string | null>(
      null,
   );

   const [authLoading, setAuthLoading] = useState<boolean>(false);
   const [signupButtonDisabled, setSignupButtonDisabled] =
      useState<boolean>(true);

   const navigate = useNavigate();

   const onSignupHandler = async (): Promise<void> => {
      if (!agreeTerms) {
         toast.error('You should agree with Terms & Conditions');
         return;
      }

      setAuthLoading(true);

      try {
         // const data = await signup({firstName, lastName}, email, password)
         await signup({ firstName, lastName }, email, password);
         toast.success('Congratulation, You signed up successfully :)');
         navigate('/login');
      } catch (e: string | any) {
         toast.error(e.toString());
      }

      setAuthLoading(false);
   };

   const onGithubAuthHandler = (): void => {
      toast.error('Github Auth service will add soon...', {
         icon: (
            <img
               src={'/icons/github-logo.svg'}
               width={15}
               height={15}
               alt={'github icon'}
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
      signupInputValidator({
         type: 'firstName',
         payload: firstName,
      }).then((validationResult: SignupValidationResult): void => {
         if (validationResult.isValid) setFirstNameFieldError(null);
         else setFirstNameFieldError(validationResult.errorMessage);
      });
   }, [firstName]);

   useEffect((): void => {
      signupInputValidator({
         type: 'lastName',
         payload: lastName,
      }).then((validationResult: SignupValidationResult): void => {
         if (validationResult.isValid) setLastNameFieldError(null);
         else setLastNameFieldError(validationResult.errorMessage);
      });
   }, [lastName]);

   useEffect((): void => {
      signupInputValidator({ type: 'email', payload: email }).then(
         (validationResult) => {
            if (validationResult.isValid) setEmailFieldError(null);
            else setEmailFieldError(validationResult.errorMessage);
         },
      );
   }, [email]);

   useEffect((): void => {
      signupInputValidator({
         type: 'password',
         payload: password,
      }).then((validationResult: SignupValidationResult): void => {
         if (validationResult.isValid) setPasswordFieldError(null);
         else setPasswordFieldError(validationResult.errorMessage);
      });
   }, [password]);

   useEffect(() => {
      const signUpButtonDisabledState =
         firstNameFieldError !== null ||
         lastNameFieldError !== null ||
         emailFieldError !== null ||
         passwordFieldError !== null ||
         !agreeTerms;

      if (signUpButtonDisabledState) setSignupButtonDisabled(true);
      else setSignupButtonDisabled(false);
   }, [
      firstNameFieldError,
      lastNameFieldError,
      emailFieldError,
      passwordFieldError,
      agreeTerms,
   ]);

   return (
      <LoginContainer>
         <LoginWrapper>
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
                  Sign Up
               </Heading>
               <span className={'heading-desc'}>
                  Create an account to continue
               </span>
            </HeadContent>

            <MainContent>
               <div className={'google-apple-login'}>
                  <Button
                     expanded
                     outline
                     borderRadius={'lg'}
                     onClickHandler={onGithubAuthHandler}
                     icon={'github-logo.svg'}
                     variant={'black'}
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
               <div className={'name-inputs-wrapper'}>
                  <InputField
                     inputValue={firstName}
                     label="firstname"
                     showLabel={false}
                     onChangeHandler={setFirstName}
                     placeHolder={'First name'}
                     iconSrc={'user-icon.svg'}
                     focusIconSrc={'user-focus-icon.svg'}
                     errorMessage={firstNameFieldError}
                     unAllowedErrorMessages={['first name is a required field']}
                  />
                  <InputField
                     inputValue={lastName}
                     label="lastname"
                     showLabel={false}
                     onChangeHandler={setLastName}
                     placeHolder={'Last name'}
                     iconSrc={'user-icon.svg'}
                     focusIconSrc={'user-focus-icon.svg'}
                     errorMessage={lastNameFieldError}
                     unAllowedErrorMessages={['last name is a required field']}
                  />
               </div>
               <InputField
                  inputValue={email}
                  label="email"
                  showLabel={false}
                  onChangeHandler={setEmail}
                  placeHolder={'email'}
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
                  label={'I agree to the Terms & Conditions'}
                  checkBoxSetter={setAgreeTerms}
               />
               <Button
                  borderRadius={'lg'}
                  disabled={signupButtonDisabled}
                  onClickHandler={onSignupHandler}
                  isLoading={authLoading}
                  expanded
               >
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
