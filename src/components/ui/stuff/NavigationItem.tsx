import { JSX } from 'react';
import { css, styled } from 'styled-components';

import Icon from '@components/ui/stuff/Icon.tsx';

import {
   NavigationItemStyledProps,
   NavigationProps,
} from '@typings/NavigationItem.type.ts';

const NavigationItemContainer = styled.div<NavigationItemStyledProps>`
   display: flex;
   align-items: center;
   gap: 8px;
   cursor: pointer;
   padding: 14px 0 14px 12px;
   width: 100%;
   transition: all 0.3s ease-in-out;
   border: 2px white solid;
   border-radius: 8px;

   ${(props) =>
      props.$active &&
      css`
         background-color: var(--color-primary-75);
         border: 2px var(--color-black-50) solid !important;
      `}
   span {
      font-size: var(--font-size-body-sm);
      color: var(
         ${(props) =>
            props.$active ? '--color-black-900' : '--color-black-600'}
      );
      font-weight: ${(props) => (props.$active ? 'bold' : '400')};
   }

   &:hover {
      ${(props) =>
         !props.$active &&
         css`
            background-color: var(--color-primary-50);
         `}
   }
`;

export default function NavigationItem(props: NavigationProps): JSX.Element {
   const {
      children = 'undefined children',
      iconSrc,
      activeIconSrc,
      iconAlt = 'navigation-icon',
      active = false,
      iconWidth = '20px',
      onClick,
   } = props;

   return (
      <NavigationItemContainer $active={active} onClick={onClick}>
         <Icon
            iconSrc={active ? activeIconSrc : iconSrc}
            width={iconWidth}
            iconAlt={iconAlt}
         />
         <span>{children}</span>
      </NavigationItemContainer>
   );
}
