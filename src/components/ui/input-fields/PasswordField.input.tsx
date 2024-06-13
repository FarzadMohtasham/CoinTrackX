import {Fragment, JSX, useEffect, useState} from 'react'
import {styled} from 'styled-components'

import Icon from '@components/ui/stuff/Icon.tsx'

import {InputProps, InputStyledProps} from '@typings/type/InputFieldProps.type.ts'

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
`

const PasswordFieldContainer = styled(PasswordInputStyled)<InputStyledProps>`
  border-color: ${props => props.$inputSelected === 'true' ? 'var(--color-black-400)' : 'var(--color-black-50)'};

  .visible-icon, .invisible-icon {
    cursor: pointer;
  }
`

const ErrorContainer = styled.span`
  color: var(--color-danger);
`

export default function PasswordFieldInput(props: InputProps): JSX.Element {
    const [passwordFieldSelected, setInputFieldSelected] = useState<boolean>(false)
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    const {
        placeHolder = 'Undefined',
        onChangeHandler = (): void => {
        },
        iconSrc = 'email-focus-icon.svg',
        focusIconSrc = 'password-focus-icon.svg',
        iconWidth = '20rem',
        errorMessage = null,
        invalidErrorMessages = []
    }: InputProps = props

    useEffect((): void => {
        onChangeHandler(passwordValue)
    }, [passwordValue])

    const handlePasswordVisible = (): void => {
        setPasswordVisible((preValue: boolean): boolean => !preValue)
    }

    return (
        <Fragment>
            <PasswordFieldContainer $inputSelected={passwordFieldSelected.toString()}>
                {!passwordFieldSelected && <Icon width={iconWidth} iconSrc={iconSrc}/>}
                {passwordFieldSelected && <Icon width={iconWidth} iconSrc={focusIconSrc}/>}
                <input type={passwordVisible ? 'text' : 'password'}
                       name={'input'}
                       placeholder={placeHolder}
                       value={passwordValue}
                       onFocus={() => setInputFieldSelected(true)}
                       onBlur={() => setInputFieldSelected(false)}
                       onChange={e => setPasswordValue(e.target.value)}/>
                {
                    passwordVisible ?
                        <Icon width={iconWidth} iconAlt={'visible icon'}
                              className={'visible-icon'}
                              onClickHandler={handlePasswordVisible}
                              iconSrc={'invisible-icon.svg'}/>
                        :
                        <Icon width={iconWidth} iconAlt={'invisible icon'}
                              className={'invisible-icon'}
                              onClickHandler={handlePasswordVisible}
                              iconSrc={'visible-icon.svg'}/>
                }
            </PasswordFieldContainer>
            {
                (invalidErrorMessages.length !== 0 && errorMessage) && (
                    invalidErrorMessages.find((val: string): boolean => val === errorMessage) === undefined &&
                    <ErrorContainer>{errorMessage}</ErrorContainer>
                )
            }
        </Fragment>
    )
}