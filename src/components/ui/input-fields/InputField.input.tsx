import {JSX, useEffect, useState} from 'react'
import {styled} from 'styled-components'

import Icon from '@components/ui/stuff/Icon.tsx'

import {InputProps, InputStyledProps} from '@typings/type/component-props/InputFieldProps.type.ts'

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InputStyled = styled.div`
  display: flex;
  align-items: center;
  gap: .8rem;
  border-radius: 1.2rem;
  border: .2rem solid var(--color-black-50);
  padding: 1.2rem;
  transition: border-color .3s ease-in-out;

  input {
    width: 100%;
    height: 2.4rem;
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
`

const InputFieldContainer = styled(InputStyled)<InputStyledProps>`
  border-color: ${props => props.$inputSelected === 'true' ? 'var(--color-black-200)' : 'var(--color-black-50)'};
`

const ErrorContainer = styled.span`
  color: var(--color-danger);
`

export default function Input(props: InputProps): JSX.Element {
    const [inputFieldSelected, setInputFieldSelected] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const {
        placeHolder = 'Undefined',
        onChangeHandler = (): void => {
        },
        iconSrc = 'email-icon.svg',
        focusIconSrc = 'email-icon.svg',
        iconWidth = '20rem',
        errorMessage = null,
        invalidErrorMessages = []
    } = props

    useEffect((): void => {
        onChangeHandler(inputValue)
    }, [inputValue])

    const inputOnFocusHandler = () => setInputFieldSelected(true)
    const inputOnBlurHandler = () => setInputFieldSelected(false)

    return (
        <FieldContainer>
            <InputFieldContainer $inputSelected={inputFieldSelected.toString()}>
                {!inputFieldSelected && <Icon width={iconWidth} iconSrc={iconSrc}/>}
                {inputFieldSelected && <Icon width={iconWidth} iconSrc={focusIconSrc}/>}
                <input type={'text'}
                       name={'input'}
                       placeholder={placeHolder}
                       value={inputValue}
                       onFocus={inputOnFocusHandler}
                       onBlur={inputOnBlurHandler}
                       onChange={e => setInputValue(e.target.value)}/>
            </InputFieldContainer>
            {
                (invalidErrorMessages.length !== 0 && errorMessage) && (
                    invalidErrorMessages.find((val: string): boolean => val === errorMessage) === undefined &&
                    <ErrorContainer>{errorMessage}</ErrorContainer>
                )
            }
        </FieldContainer>
    )
}