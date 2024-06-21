import {JSX, useState} from 'react'
import {styled} from 'styled-components'

import checkBoxData from '@data/checkBox.data.ts'

import {CheckboxProps, CheckboxStyledProps, CheckboxTypes, Properties} from '@typings/type/component-props/CheckBox.type.ts'

const CheckBoxContainer = styled.div<CheckboxStyledProps>`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  label {
    font-size: var(--font-size-body-md);
    color: var(--color-black-400);
    font-weight: 500;
  }

  input {
    --active: ${props => props.$properties.active};
    --active-inner: ${props => props.$properties['active-inner']};
    --focus: ${props => props.$properties.focus};
    --border: ${props => props.$properties.border};
    --border-hover: ${props => props.$properties['border-hover']};
    --background: ${props => props.$properties.background};
    --disabled: ${props => props.$properties.disabled};
    --disabled-inner: ${props => props.$properties['disabled-inner']};
  }
`

export default function CheckboxInput(props: CheckboxProps): JSX.Element {
    const {
        label = null,
        checkBoxSetter,
        defaultValue = false,
        type = 'primary'
    } = props

    const [checked, setChecked] = useState<boolean>(defaultValue)

    const checkboxOnClickHandler = (): void => {
        setChecked((currentChecked: boolean) => !currentChecked)
        checkBoxSetter(!checked)
    }

    const checkboxDataAccessKey = (key: CheckboxTypes) => {
        return checkBoxData[key]
    }

    const checkboxProperties: Properties = checkboxDataAccessKey(type)

    return (
        <CheckBoxContainer onClick={checkboxOnClickHandler}
                           $properties={{...checkboxProperties}}>
            <input type={'checkbox'}
                   checked={checked}
                   onChange={(): void => {
                   }}
                   name={label !== null ? label.replace(' ', '-').toLowerCase().trim() : 'checkbox'}/>
            {
                label !== null && <label>{label}</label>
            }
        </CheckBoxContainer>
    )
}