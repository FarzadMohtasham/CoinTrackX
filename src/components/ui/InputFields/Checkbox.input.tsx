import { JSX, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import checkBoxData from '@Data/checkBox.data';

import {
   CheckboxProps,
   CheckboxStyledProps,
   CheckboxTypes,
   Properties,
} from '@Typings/Components/CheckBox.type';

const CheckBoxContainer = styled.div<CheckboxStyledProps>`
   display: flex;
   align-items: center;
   gap: 12px;

   label {
      font-size: var(--font-size-body-md);
      color: var(--color-black-400);
      font-weight: 500;
   }

   input {
      --active: ${(props) => props.$properties.active};
      --active-inner: ${(props) => props.$properties['active-inner']};
      --focus: ${(props) => props.$properties.focus};
      --border: ${(props) => props.$properties.border};
      --border-hover: ${(props) => props.$properties['border-hover']};
      --background: ${(props) => props.$properties.background};
      --disabled: ${(props) => props.$properties.disabled};
      --disabled-inner: ${(props) => props.$properties['disabled-inner']};
   }
`;

export default function CheckboxInput(props: CheckboxProps): JSX.Element {
   const {
      label = null,
      checkBoxSetter,
      defaultValue = false,
      type = 'primary',
   } = props;

   const [checked, setChecked] = useState<boolean>(defaultValue);

   const checkboxOnClickHandler = (): void => {
      setChecked((currentChecked: boolean) => !currentChecked);
      checkBoxSetter(!checked);
   };

   const checkboxDataAccessKey = (key: CheckboxTypes) => {
      return checkBoxData[key];
   };

   const checkboxProperties: Properties = checkboxDataAccessKey(type);

   useEffect(() => {
      checkBoxSetter(defaultValue);
   }, []);

   return (
      <CheckBoxContainer
         onClick={checkboxOnClickHandler}
         $properties={{ ...checkboxProperties }}
      >
         <input
            type={'checkbox'}
            alt="checkbox"
            checked={checked}
            onChange={(): void => {}}
            name={
               label !== null
                  ? label.replace(' ', '-').toLowerCase().trim()
                  : 'checkbox'
            }
         />
         {label !== null && <label>{label}</label>}
      </CheckBoxContainer>
   );
}
