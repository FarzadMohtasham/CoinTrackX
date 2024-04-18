import {styled} from "styled-components"
import Icon from "../Icon.tsx";

type EmailInputProps = {
    place_holder?: string;
    on_change_handler?: (value: string) => void;
}

const Input = styled.div`
  display: flex;
  align-items: center;
  gap: .8rem;
  border-radius: 1.2rem;
  border: .1rem solid var(--color-black-100);
  padding: 1.2rem;

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

const EmailInputContainer = styled(Input)`

`

export default function EmailInput(props: EmailInputProps) {
    const {
        place_holder = 'Undefined',
        on_change_handler = () => {
        },
    } = props

    const onChange = (value: string) => {
        on_change_handler(value)
    }

    return (
        <EmailInputContainer>
            <Icon width={'20rem'} icon_src={'email-icon.svg'}/>
            <input type={'text'} name={'email'} placeholder={place_holder}
                   onChange={e => onChange(e.target.value)}/>
        </EmailInputContainer>
    )
}