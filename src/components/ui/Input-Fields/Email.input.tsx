import {styled} from "styled-components"
import Icon from "../Icon.tsx";
import {useState} from "react";

type EmailInputProps = {
    place_holder: string;
    on_change_handler: (value: string) => void;
}

type InputStyledProps = {
    inputSelected: boolean;
}

const Input = styled.div`
  display: flex;
  align-items: center;
  gap: .8rem;
  border-radius: 1.2rem;
  border: .1rem solid var(--color-black-100);
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

const EmailInputContainer = styled(Input)<InputStyledProps>`
  border-color: ${props => props.inputSelected ? 'var(--color-black-600)' : 'var(--color-black-100)'};
`

export default function EmailInput(props: EmailInputProps) {
    const [inputSelected, setInputSelected] = useState<boolean>(false)

    const {
        place_holder = 'Undefined',
        on_change_handler = () => {
        },
    } = props

    const onChange = (value: string) => {
        on_change_handler(value)
    }

    return (
        <EmailInputContainer inputSelected={inputSelected}>
            <Icon width={'20rem'} icon_src={'email-icon.svg'}/>
            <input type={'text'} name={'email'} placeholder={place_holder}
                   onFocus={() => setInputSelected(true)}
                   onBlur={() => setInputSelected(false)}
                   onChange={e => onChange(e.target.value)}/>
        </EmailInputContainer>
    )
}