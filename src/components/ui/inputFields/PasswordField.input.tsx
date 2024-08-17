import { Fragment, JSX, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import Icon from '@components/ui/stuff/Icon.tsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';

import {
   InputProps,
   InputStyledProps,
} from '@typings/components/InputFieldProps.type.ts';

const PasswordInputStyled = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   border-radius: 12px;
   border: 2px solid var(--color-black-50);
   padding: 12px;
   transition: border-color 0.3s ease-in-out;

   input {
      width: 100%;
      height: 24px;
      border: none;
      font-size: var(--font-size-body-md);

      &::placeholder {
         color: var(--color-black-200);
         font-weight: 500;
      }

      &:focus {
         outline-width: 0;
      }
   }
`;

const PasswordFieldContainer = styled(PasswordInputStyled)<InputStyledProps>`
   position: relative;
   border-color: ${(props) =>
      props.$inputIsActive
         ? 'var(--color-black-400)'
         : 'var(--color-black-50)'};

   .visible-icon,
   .invisible-icon {
      cursor: pointer;
   }
`;

const ErrorContainer = styled.span`
   color: var(--color-danger);
`;

export default function PasswordInputField(props: InputProps): JSX.Element {
   const [passwordFieldSelected, setInputFieldSelected] =
      useState<boolean>(false);
   const [passwordValue, setPasswordValue] = useState<string>('');
   const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

   const {
      placeHolder = 'Undefined',
      onChangeHandler = (): void => {},
      iconSrc = 'email-focus-icon.svg',
      focusIconSrc = 'password-focus-icon.svg',
      iconWidth = '20px',
      errorMessage = null,
      unAllowedErrorMessages = [],
   }: InputProps = props;

   const inputFieldIconChangeVariants: Variants = {
      initial: {
         opacity: 0,
      },
      animate: {
         opacity: 1,
         transition: { duration: 0.3 },
      },
      exit: {
         opacity: 0,
         transition: { duration: 0.3 },
      },
   };

   const handlePasswordVisible = (): void => {
      setPasswordVisible((preValue: boolean): boolean => !preValue);
   };

   useEffect((): void => {
      onChangeHandler(passwordValue);
   }, [passwordValue]);

   return (
      <Fragment>
         <PasswordFieldContainer
            $inputIsActive={passwordFieldSelected}
            $hasError={false}
            $disabled={false}
         >
            <AnimatePresence mode="wait">
               {!passwordFieldSelected && (
                  <Icon
                     key={'!passwordFieldSelected'}
                     width={iconWidth}
                     iconSrc={iconSrc || ''}
                     as={motion.img}
                     initial={'initial'}
                     animate={'animate'}
                     exit={'exit'}
                     variants={inputFieldIconChangeVariants}
                  />
               )}
               {passwordFieldSelected && (
                  <Icon
                     key={'passwordFieldSelected'}
                     width={iconWidth}
                     iconSrc={focusIconSrc}
                     as={motion.img}
                     initial={'initial'}
                     animate={'animate'}
                     exit={'exit'}
                     variants={inputFieldIconChangeVariants}
                  />
               )}
            </AnimatePresence>
            <input
               type={passwordVisible ? 'text' : 'password'}
               name={'input'}
               placeholder={placeHolder}
               value={passwordValue}
               onFocus={() => setInputFieldSelected(true)}
               onBlur={() => setInputFieldSelected(false)}
               onChange={(e) => setPasswordValue(e.target.value)}
            />
            <AnimatePresence mode="wait">
               {passwordVisible ? (
                  <Icon
                     key={'icon1'}
                     width={iconWidth}
                     iconAlt={'visible icon'}
                     className={'visible-icon'}
                     onClickHandler={handlePasswordVisible}
                     iconSrc={'invisible-icon.svg'}
                     as={motion.img}
                     initial={'initial'}
                     animate={'animate'}
                     exit={'exit'}
                     variants={inputFieldIconChangeVariants}
                  />
               ) : (
                  <Icon
                     key={'icon2'}
                     width={iconWidth}
                     iconAlt={'invisible icon'}
                     className={'invisible-icon'}
                     onClickHandler={handlePasswordVisible}
                     iconSrc={'visible-icon.svg'}
                     as={motion.img}
                     initial={'initial'}
                     animate={'animate'}
                     exit={'exit'}
                     variants={inputFieldIconChangeVariants}
                  />
               )}
            </AnimatePresence>
         </PasswordFieldContainer>
         {unAllowedErrorMessages.length !== 0 &&
            errorMessage &&
            unAllowedErrorMessages.find(
               (val: string): boolean => val === errorMessage,
            ) === undefined && <ErrorContainer>{errorMessage}</ErrorContainer>}
      </Fragment>
   );
}
