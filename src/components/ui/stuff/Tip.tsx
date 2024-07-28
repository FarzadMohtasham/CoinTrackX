import React, { useState } from 'react';
import { styled } from 'styled-components';

import styles from './Tip.module.scss';

// Types
import { TipPropsType } from '@/Lib/Typings/Components/TipProps.type';

const TipContainer = styled.div`
   padding: 24px;
   border: 10px solid var(--color-neutral-200);
   border-radius: 8px;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 20px;
   background-color: var(--color-primary-150);

   &::after {
      content: '';
      background-image: url('/images/tip-bg.svg');
      position: absolute;
      right: 0;
      top: 0;
      width: 100px;
      height: 100%;
      z-index: 0;
   }

   p {
      font-size: var(--font-size-body-md);
      z-index: 1;
   }

   .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      font-size: 24px;
      font-weight: bold;
      color: black;
      z-index: 1;
   }

   .redirect-icon {
      z-index: 1;
   }
`;

export default function Tip(
   props: TipPropsType,
): React.JSX.Element | undefined {
   const [hide, setHide]: [hide: boolean, setHide: any] = useState(false);

   const {
      children,
      extended = false,
      // closable = false,
      redirect = true,
      // link = '',
      // replaceHistory = false,
   } = props;

   if (hide) return;

   const divStyle: object = {
      width: extended ? '100%' : 'max-content',
      cursor: redirect ? 'pointer' : '',
   };

   const closeIconStyle: object = {
      display: redirect ? 'none' : '',
   };

   function onCloseHandler(): void {
      setHide(true);
   }

   function onRedirectHandler(): void {
      if (!redirect) return;

      // redirect('')
   }

   return (
      <TipContainer
         className={styles.tip}
         style={divStyle}
         onClick={onRedirectHandler}
      >
         <p>{children}</p>
         <i
            className={'close-icon'}
            style={closeIconStyle}
            onClick={onCloseHandler}
         >
            &times;
         </i>
         {redirect && (
            <i className={'redirect-icon'}>
               <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M1.5 15L8.5 8L1.5 1"
                     stroke="#9C9CAB"
                     strokeWidth="1.5"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </i>
         )}
      </TipContainer>
   );
}
