/* eslint-disable react-refresh/only-export-components */
import {
   forwardRef,
   JSX,
   Ref,
   useEffect,
   useImperativeHandle,
   useRef,
   useState,
} from 'react';
import { css, styled } from 'styled-components';

import Icon from '@components/ui/stuff/Icon.tsx';

import {
   InputProps,
   InputRefProps,
   InputStyledProps,
} from '@typings/components/InputFieldProps.type.ts';

const FieldContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
`;

const InputStyled = styled.div`
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

const InputFieldContainer = styled(InputStyled)<InputStyledProps>`
   position: relative;
   margin-bottom: 5px;
   border-color: ${(props) =>
      props.$inputIsActive
         ? props.$hasError
            ? css`var(--color-danger-400)`
            : css`var(--color-black-200)`
         : props.$hasError
           ? css`var(--color-danger-400)`
           : css`var(--color-black-50)`};

   input[type='text'] {
      color: ${(props) =>
         props.$disabled ? css`var(--color-black-300)` : 'black'};

      &:disabled {
         background-color: rgba(0, 0, 0, 0);
      }
   }

   ${(props) =>
      props.$disabled &&
      css`
         &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: var(--color-black-50);
            left: 0;
            top: 0;
            border-radius: 8px;
         }
      `}
`;

const ErrorContainer = styled.span`
   color: var(--color-danger);
   font-size: var(--font-size-body-sm);
`;

const FieldLabel = styled.label`
   margin-bottom: 8px;
   color: var(--color-black);
   font-size: var(--font-size-body-md);
`;

function Input(props: InputProps, ref: Ref<InputRefProps>): JSX.Element {
   const {
      placeHolder = 'Undefined',
      label,
      onChangeHandler = (): void => {},
      inputValue,
      iconSrc = 'email-icon.svg',
      focusIconSrc = 'email-icon.svg',
      iconWidth = '20px',
      errorMessage = null,
      unAllowedErrorMessages = [],
      maxLength = 200,
      minLength = 0,
      hasError = false,
      disabled = false,
      showLabel = true,
   } = props;

   const [inputFieldIsActive, setInputFieldIsActive] = useState<boolean>(false);
   const inputRef = useRef<HTMLInputElement | null>(null);

   const inputOnFocusHandler = () => setInputFieldIsActive(true);
   const inputOnBlurHandler = () => setInputFieldIsActive(false);

   const clearInput = () => onChangeHandler('');
   const focusInput = () => inputRef.current?.focus();

   useImperativeHandle(ref, () => ({
      clearInput,
      focusInput,
   }));

   useEffect((): void => {
      onChangeHandler(inputValue);
   }, [inputValue]);

   return (
      <FieldContainer>
         {label && showLabel && <FieldLabel>{label}</FieldLabel>}
         <InputFieldContainer
            $inputIsActive={inputFieldIsActive}
            $hasError={hasError}
            $disabled={disabled}
         >
            {iconSrc !== null && (
               <>
                  {!inputFieldIsActive && (
                     <Icon width={iconWidth} iconSrc={iconSrc || ''} />
                  )}
                  {inputFieldIsActive && (
                     <Icon width={iconWidth} iconSrc={focusIconSrc} />
                  )}
               </>
            )}
            <input
               type={'text'}
               maxLength={maxLength}
               minLength={minLength}
               name={label}
               ref={inputRef}
               placeholder={placeHolder}
               value={inputValue}
               onChange={(e) => onChangeHandler(e.target.value)}
               onFocus={inputOnFocusHandler}
               onBlur={inputOnBlurHandler}
               disabled={disabled}
            />
         </InputFieldContainer>
         {unAllowedErrorMessages.length !== 0 &&
            errorMessage &&
            unAllowedErrorMessages.find(
               (val: string): boolean => val === errorMessage,
            ) === undefined && <ErrorContainer>{errorMessage}</ErrorContainer>}
      </FieldContainer>
   );
}

export default forwardRef(Input);
