import {styled} from "styled-components"
import Icon from "../Icon.tsx";
import {useEffect, useState} from "react";
import {InputProps, InputStyledProps} from "../../../ts/type/InputFieldProps.type.ts";

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
  border-color: ${props => props.input_selected === 'true' ? 'var(--color-black-500)' : 'var(--color-black-50)'};
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
    } = props

    useEffect((): void => {
        on_change_handler(inputValue)
    }, [inputValue])

    return (
        <InputFieldContainer input_selected={inputFieldSelected.toString()}>
            {!inputFieldSelected && <Icon width={icon_width} icon_src={icon_src}/>}
            {inputFieldSelected && <Icon width={icon_width} icon_src={focus_icon_src}/>}
            <input type={'text'}
                   name={'input'}
                   placeholder={place_holder}
                   value={inputValue}
                   onFocus={() => setInputFieldSelected(true)}
                   onBlur={() => setInputFieldSelected(false)}
                   onChange={e => setInputValue(e.target.value)}/>
        </InputFieldContainer>
    )
}