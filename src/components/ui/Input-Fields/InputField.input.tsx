import {useEffect, useState} from "react";
import {styled} from "styled-components"

import Icon from "@components/ui/Icon.tsx";

import {InputProps, InputStyledProps} from "@ts/type/InputFieldProps.type.ts";

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
  margin-bottom: 1rem;
  border-color: ${props => props.$input_selected === 'true' ? 'var(--color-black-400)' : 'var(--color-black-50)'};
`

const ErrorContainer = styled.span`
  color: var(--color-danger);
`

export default function Input(props: InputProps) {
    const [inputFieldSelected, setInputFieldSelected] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const {
        place_holder = 'Undefined',
        on_change_handler = () => {
        },
        icon_src = 'email-icon.svg',
        focus_icon_src = 'email-icon.svg',
        icon_width = '20rem',
        error_message = null,
        invalid_error_messages = []
    } = props

    useEffect((): void => {
        on_change_handler(inputValue)
    }, [inputValue])

    const inputOnFocusHandler = () => setInputFieldSelected(true)
    const inputOnBlurHandler = () => setInputFieldSelected(false)

    return (
        <FieldContainer>
            <InputFieldContainer $input_selected={inputFieldSelected.toString()}>
                {!inputFieldSelected && <Icon width={icon_width} icon_src={icon_src}/>}
                {inputFieldSelected && <Icon width={icon_width} icon_src={focus_icon_src}/>}
                <input type={'text'}
                       name={'input'}
                       placeholder={place_holder}
                       value={inputValue}
                       onFocus={inputOnFocusHandler}
                       onBlur={inputOnBlurHandler}
                       onChange={e => setInputValue(e.target.value)}/>
            </InputFieldContainer>
            {
                (invalid_error_messages.length !== 0 && error_message) && (
                    invalid_error_messages.find((val) => val === error_message) === undefined &&
                    <ErrorContainer>{error_message}</ErrorContainer>
                )
            }
        </FieldContainer>
    )
}