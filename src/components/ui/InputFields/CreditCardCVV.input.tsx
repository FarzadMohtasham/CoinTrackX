import { css, styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { validateNumbersOnly } from '@/Libs/Utils/helpers';

type CreditCardCVVInputProps = {
   creditCardCVVSetterFn: (value: string) => void;
   creditCardCVVErrorMsgSetterFn: (err: string | null) => void;
   placeholder?: string;
   disabled?: boolean;
   maxLength?: number;
   minLength?: number;
   initialValue?: string;
};

const CreditCardCVVInputContainer = styled.div<{ $inputFocused: boolean }>`
   background-color: var(--color-gray-100);
   padding: 10px;
   border-radius: 8px;
   display: flex;
   align-items: center;
   height: 52px;
   transition: border-color 0.3s ease-in-out;
   border: 2px solid
      ${(props) =>
         props.$inputFocused
            ? css`var(--color-gray-400)`
            : css`var(--color-gray-100)`};

   input {
      width: 100%;
      background-color: rgba(0, 0, 0, 0);

      &::placeholder {
         color: var(--color-gray-300);
      }
   }
`;

export default function CreditCardCVVInput(props: CreditCardCVVInputProps) {
   const {
      creditCardCVVSetterFn,
      creditCardCVVErrorMsgSetterFn,
      placeholder = '3-digit number',
      disabled = false,
      maxLength = 5,
      minLength = 0,
      initialValue = '',
   } = props;

   const inputRef = useRef<HTMLInputElement | null>(null);
   const [inputValue, setInputValue] = useState<string>(initialValue);
   const [inputFocused, setInputFocused] = useState<boolean>(false);

   // ---------- Handlers ----------
   const onCreditCardCVVInputHandler = (e: any) => {
      setInputValue(e.target.value);
   };

   // Update inputValue on parent used component
   useEffect(() => {
      creditCardCVVSetterFn(inputValue);
   }, [inputValue]);

   // Validating CardExpDate
   useEffect(() => {
      if (inputValue.length === 0 || inputValue.length !== 3) {
         creditCardCVVErrorMsgSetterFn('');
         return;
      }

      const validationResult = validateNumbersOnly(inputValue);
      if (validationResult) creditCardCVVErrorMsgSetterFn(null);
      else creditCardCVVErrorMsgSetterFn('Enter valid CVV');
   }, [inputValue]);

   // Adding eventHandlers to input
   useEffect(() => {
      const onFocusIn = () => setInputFocused(true);
      const onFocusOut = () => setInputFocused(false);

      inputRef.current?.addEventListener('focusin', onFocusIn);
      inputRef.current?.addEventListener('focusout', onFocusOut);

      return () => {
         inputRef.current?.removeEventListener('focusout', onFocusOut);
         inputRef.current?.removeEventListener('focusin', onFocusIn);
      };
   }, []);

   return (
      <CreditCardCVVInputContainer $inputFocused={inputFocused}>
         <input
            ref={inputRef}
            name={'cvv'}
            onChange={onCreditCardCVVInputHandler}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            value={inputValue}
         />
      </CreditCardCVVInputContainer>
   );
}
