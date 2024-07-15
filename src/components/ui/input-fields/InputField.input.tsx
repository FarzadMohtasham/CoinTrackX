import { forwardRef, JSX, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { styled } from 'styled-components';

import Icon from '@components/ui/stuff/Icon.tsx';

import { InputProps, InputRefProps, InputStyledProps } from '@typings/component-types/InputFieldProps.type.ts';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  border-color: ${(props) =>
  props.$inputSelected === 'true'
    ? 'var(--color-black-200)'
    : 'var(--color-black-50)'};
  margin-bottom: 5px;
`;

const ErrorContainer = styled.span`
  color: var(--color-danger);
  font-size: var(--font-size-body-sm);
`;

function Input(props: InputProps, ref: Ref<InputRefProps>): JSX.Element {
  const {
    placeHolder = 'Undefined',
    label,
    onChangeHandler = (): void => {
    },
    iconSrc = 'email-icon.svg',
    focusIconSrc = 'email-icon.svg',
    iconWidth = '20px',
    errorMessage = null,
    unAllowedErrorMessages = [],
    maxLength = 200,
    minLength = 0,
    initialValue = ''
  } = props;

  const [inputFieldSelected, setInputFieldSelected] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputOnFocusHandler = () => setInputFieldSelected(true);
  const inputOnBlurHandler = () => setInputFieldSelected(false);

  const clearInput = () => setInputValue('');
  const focusInput = () => inputRef.current?.focus();

  useImperativeHandle(ref, () => ({
    clearInput,
    focusInput
  }));

  useEffect((): void => {
    onChangeHandler(inputValue);
  }, [inputValue]);

  return (
    <FieldContainer>
      <InputFieldContainer $inputSelected={inputFieldSelected.toString()}>
        {iconSrc !== null && (
          <>
            {!inputFieldSelected && (
              <Icon width={iconWidth} iconSrc={iconSrc || ''} />
            )}
            {inputFieldSelected && (
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
          onFocus={inputOnFocusHandler}
          onBlur={inputOnBlurHandler}
          onChange={(e) => setInputValue(e.target.value.trim())}
        />
      </InputFieldContainer>
      {unAllowedErrorMessages.length !== 0 &&
        errorMessage &&
        unAllowedErrorMessages.find(
          (val: string): boolean => val === errorMessage
        ) === undefined && <ErrorContainer>{errorMessage}</ErrorContainer>}
    </FieldContainer>
  );
}

export default forwardRef(Input);
