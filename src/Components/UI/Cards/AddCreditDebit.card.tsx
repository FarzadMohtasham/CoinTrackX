import React, { JSX } from 'react';
import { styled } from 'styled-components';

import Icon from '@components/ui/stuff/Icon.tsx';

type AddCreditDebitCardProps = {
   onClick: () => void;
   containerText?: string;
};

const AddCreditDebitCardContainer = styled.div`
   display: grid;
   height: 185px;
   place-content: center;
   border-radius: 12px;
   border: 2px solid var(--color-black-100);
   cursor: pointer;
   transition: background-color 0.3s ease-in-out;

   .wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 20px;

      span {
         font-size: var(--font-size-body-md);
         color: var(--color-primary);
         font-weight: 500;
      }
   }

   &:hover {
      background-color: var(--color-black-25);
   }
`;

export const AddCreditDebitCard: React.FC<AddCreditDebitCardProps> = (
   props,
): JSX.Element => {
   return (
      <AddCreditDebitCardContainer onClick={props.onClick}>
         <div className={'wrapper'}>
            <Icon
               iconSrc={'plus-with-border.svg'}
               width={'40px'}
               height={'40px'}
            />
            <span className={'add-a-payment-method'}>
               {props.containerText || 'Add a Credit/Debit Payment Card'}
            </span>
         </div>
      </AddCreditDebitCardContainer>
   );
};

export default AddCreditDebitCard;
