import {styled} from "styled-components"
import Icon from "../Icon.tsx";
import {useState} from "react";

type InputProps = {
    place_holder: string;
    on_change_handler: (value: string) => void;
    icon_src: string;
    icon_width: string;
}

type InputStyledProps = {
    inputSelected: boolean;
}

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
  border-color: ${props => props.inputSelected ? 'var(--color-black-500)' : 'var(--color-black-50)'};
`

export default function Input(props: InputProps) {
    const [inputFieldSelected, setInputFieldSelected] = useState<boolean>(false)

    const {
        place_holder = 'Undefined',
        on_change_handler = () => {
        },
        icon_src = 'email-icon.svg',
        icon_width = '20rem',
    } = props

    const onChange = (value: string): void => {
        on_change_handler(value)
    }

    return (
        <InputFieldContainer inputSelected={inputFieldSelected}>
            <Icon width={icon_width} icon_src={icon_src}/>
            <input type={'text'} name={'input'} placeholder={place_holder}
                   onFocus={() => setInputFieldSelected(true)}
                   onBlur={() => setInputFieldSelected(false)}
                   onChange={e => onChange(e.target.value)}/>
        </InputFieldContainer>
    )
}