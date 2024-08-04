import React, {
   Dispatch,
   JSX,
   SetStateAction,
   useEffect,
   useRef,
   useState,
} from 'react';
import { css, styled } from 'styled-components';

import { checkCardProvider, formatCardNumber } from '@utils/helpers.ts';
import { CardNumberProvider } from '@typings/components/CardNumberInput.type.ts';

import Icon from '@components/ui/stuff/Icon.tsx';

type CardNumberProps = {
   cardNumberSetterFn: (value: string) => void;
   disabled?: boolean;
   cardNumberHasErrorSetterFn: Dispatch<SetStateAction<boolean>>;
   creditCardProviderSetterFn: Dispatch<
      SetStateAction<CardNumberProvider | ''>
   >;
   initialValue?: string;
   maxLength?: number;
};

const CardNumberInputContainer = styled.div<{ $inputFocused: boolean }>`
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

const CreditProvidersWrapper = styled.div<{
   $creditCardProvider: CardNumberProvider | '';
}>`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 5px;
   margin-right: 10px;

   .visa-icon {
      opacity: ${(props) =>
         props.$creditCardProvider === 'Visa' ? '1' : '.25'};
   }

   .mastercard-icon {
      opacity: ${(props) =>
         props.$creditCardProvider === 'MasterCard' ? '1' : '.25'};
   }
`;

export default function CardNumberInput(props: CardNumberProps): JSX.Element {
   const {
      cardNumberSetterFn,
      cardNumberHasErrorSetterFn,
      creditCardProviderSetterFn,
      disabled = false,
      initialValue = '',
      maxLength = 19,
   } = props;

   const inputRef = useRef<HTMLInputElement | null>(null);
   const [inputValue, setInputValue] = useState<string>(() =>
      formatCardNumber(initialValue),
   );
   const [creditCardProvider, setCreditCardProvider] = useState<
      'Visa' | 'MasterCard' | ''
   >('');
   const [inputHasError, setInputHasError] = useState<boolean>(false);
   const [inputFocused, setInputFocused] = useState<boolean>(false);

   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      let sanitizedCardNumber = value.replace(/\s+/g, '');
      const segmentCounts: number =
         Math.ceil(sanitizedCardNumber.length / 4) - 2;
      sanitizedCardNumber = sanitizedCardNumber.slice(
         0,
         maxLength - segmentCounts,
      );

      setInputValue(formatCardNumber(sanitizedCardNumber));
   };

   // Update inputValue on parent component
   useEffect(() => {
      cardNumberSetterFn(inputValue.split(' ').join(''));
   }, [inputValue]);

   // Update credit card provider
   useEffect(() => {
      const spaceCount = 2;
      setCreditCardProvider('');
      if (inputValue.length < 13 + spaceCount) return;
      const cardProvider = checkCardProvider(inputValue.split(' ').join(''));
      setCreditCardProvider(cardProvider || '');
   }, [inputValue]);

   // Check CardNumber Error
   useEffect(() => {
      cardNumberHasErrorSetterFn(inputHasError);
   }, [inputHasError]);

   // Set cardNumberProvider
   useEffect(() => {
      creditCardProviderSetterFn(creditCardProvider);
   }, [creditCardProvider]);

   // Updating inputHasError
   useEffect(() => {
      setInputHasError(
         inputValue.length < 13 + 2 || creditCardProvider.length === 0,
      );
   }, [inputValue, creditCardProvider]);

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
      <CardNumberInputContainer $inputFocused={inputFocused}>
         <input
            value={inputValue}
            ref={inputRef}
            onChange={onInputChange}
            disabled={disabled}
            maxLength={maxLength}
            placeholder="XXXX XXXX XXXX XXXX"
         />
         <CreditProvidersWrapper
            className={'credit-provider-icons'}
            $creditCardProvider={creditCardProvider}
         >
            <Icon
               iconSrc="visa-logo.svg"
               iconAlt="visa icon"
               className={'visa-icon'}
               width={'36px'}
               height={'auto'}
            />

            <Icon
               iconSrc="master-card-logo.svg"
               iconAlt="mastercard icon"
               className={'mastercard-icon'}
               width={'36px'}
               height={'auto'}
            />
         </CreditProvidersWrapper>
      </CardNumberInputContainer>
   );
}
