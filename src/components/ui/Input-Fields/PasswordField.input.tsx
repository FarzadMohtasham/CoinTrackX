import {styled} from "styled-components";
import {InputProps, InputStyledProps} from "../../../ts/type/InputFieldProps.type.ts";
import {useEffect, useState} from "react";
import Icon from "../Icon.tsx";

const PasswordInputStyled = styled.div`
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

  .visible-icon, .invisible-icon {
    opacity: .5;
  }
`

const PasswordFieldContainer = styled(PasswordInputStyled)<InputStyledProps>`
  border-color: ${props => props.input_selected === 'true' ? 'var(--color-black-400)' : 'var(--color-black-50)'};

  .visible-icon, .invisible-icon {
    cursor: pointer;
  }
`

const ErrorContainer = styled.span`
  color: var(--color-danger);
`

export default function PasswordFieldInput(props: InputProps) {
    const [passwordFieldSelected, setInputFieldSelected] = useState<boolean>(false)
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    const {
        place_holder = 'Undefined',
        on_change_handler = () => {
        },
        icon_src = 'email-focus-icon.svg',
        focus_icon_src = 'password-focus-icon.svg',
        icon_width = '20rem',
        error_message = null,
        invalid_error_messages = []
    } = props

    useEffect((): void => {
        on_change_handler(passwordValue)
    }, [passwordValue])

    const handlePasswordVisible = (): void => {
        setPasswordVisible(preValue => !preValue)
    }

    return (
        <>
            <PasswordFieldContainer input_selected={passwordFieldSelected.toString()}>
                {!passwordFieldSelected && <Icon width={icon_width} icon_src={icon_src}/>}
                {passwordFieldSelected && <Icon width={icon_width} icon_src={focus_icon_src}/>}
                <input type={passwordVisible ? 'text' : 'password'}
                       name={'input'}
                       placeholder={place_holder}
                       value={passwordValue}
                       onFocus={() => setInputFieldSelected(true)}
                       onBlur={() => setInputFieldSelected(false)}
                       onChange={e => setPasswordValue(e.target.value)}/>
                {
                    passwordVisible ?
                        <Icon width={icon_width} icon_alt={'visible icon'}
                              class_name={'visible-icon'}
                              on_click_handler={handlePasswordVisible}
                              icon_src={'visible-icon.png'}/>
                        :
                        <Icon width={icon_width} icon_alt={'invisible icon'}
                              class_name={'invisible-icon'}
                              on_click_handler={handlePasswordVisible}
                              icon_src={'invisible-icon.png'}/>
                }
            </PasswordFieldContainer>
            {
                (invalid_error_messages.length !== 0 && error_message) && (
                    invalid_error_messages.find((val) => val === error_message) === undefined &&
                    <ErrorContainer>{error_message}</ErrorContainer>
                )
            }
        </>
    )
}