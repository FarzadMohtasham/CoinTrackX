import React, { JSX } from 'react';
import { styled } from 'styled-components';

import Icon from '@components/ui/stuff/Icon.tsx';
import { MotionProps } from 'framer-motion';

type AddCreditDebitCardProps = MotionProps & {
   onClick: () => void;
   containerText?: string;
};

const AddCreditDebitCardContainer = styled.div<MotionProps>`
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

export const AddCreditDebitCard: React.FC<AddCreditDebitCardProps> = ({
   onClick,
   containerText = 'Add a Credit/Debit Payment Card',
   ...otherProps
}): JSX.Element => {
   return (
      <AddCreditDebitCardContainer onClick={onClick} {...otherProps}>
         <div className={'wrapper'}>
            <Icon
               iconSrc={'plus-with-border.svg'}
               width={'40px'}
               height={'40px'}
            />
            <span className={'add-a-payment-method'}>{containerText}</span>
         </div>
      </AddCreditDebitCardContainer>
   );
};

export default AddCreditDebitCard;
