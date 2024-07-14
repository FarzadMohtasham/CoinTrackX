import { css, styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { validateCardExpDate } from '@utils/helpers.ts';

type CreditCardExpInputProps = {
  creditCardExpSetterFn: (value: string) => void;
  creditCardExpErrorMsgSetterFn: (err: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  initialValue?: string;
};

const CreditCardExpContainer = styled.div<{ $inputFocused: boolean }>`
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

export default function CreditCardExpInput(props: CreditCardExpInputProps) {
  const {
    creditCardExpSetterFn,
    creditCardExpErrorMsgSetterFn,
    placeholder = 'MM/YY',
    disabled = false,
    maxLength = 5,
    minLength = 0,
    initialValue = ''
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  // ---------- Handlers ----------
  const onCreditCardExpInputHandler = (e: any) => {
    setInputValue(e.target.value.trim());
  };

  // Update inputValue on parent used component
  useEffect(() => {
    creditCardExpSetterFn(inputValue);
  }, [inputValue]);

  // Validating CardExpDate
  useEffect(() => {
    if (inputValue.length === 0 || inputValue.length !== 5) {
      creditCardExpErrorMsgSetterFn('');
      return;
    }

    const validationResult = validateCardExpDate(inputValue);
    if (validationResult) creditCardExpErrorMsgSetterFn(null);
    else creditCardExpErrorMsgSetterFn('Enter valid expiration(MM/YY)');
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
    <CreditCardExpContainer $inputFocused={inputFocused}>
      <input
        ref={inputRef}
        name={'exp'}
        value={inputValue}
        onChange={onCreditCardExpInputHandler}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
      />
    </CreditCardExpContainer>
  );
}
