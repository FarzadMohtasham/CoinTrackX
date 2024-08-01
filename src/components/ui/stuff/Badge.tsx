import { JSX } from 'react';
import { styled } from 'styled-components';

// Component
import Icon from './Icon.tsx';

import {
   BadgeProps,
   BadgePropsType,
} from '@/Libs/Typings/Components/BadgeProps.type.ts';

const borderRadiusVariations = {
   none: '0',
   sm: '5px',
   md: '8px',
   lg: '11px',
   full: '100px',
};

const BadgeStyled = styled.span<BadgeProps>`
   display: flex;
   align-items: center;
   gap: 5px;
   width: max-content;
   background-color: ${(props: any) => props.$bgColor};
   padding: 6px 8px;
   font-size: var(--font-size-body-xsm);
   color: ${(props: any) => props.$textColor};
   border-radius: ${(props: any) =>
      props.$borderRadiusVariations[props.$borderRadius]};
   border: 1px solid ${(props: any) => props.$borderColor};
   font-weight: 500;
`;

export default function Badge(props: BadgePropsType): JSX.Element {
   const {
      children,
      iconSrc = null,
      iconSize = '20px',
      type = 'success',
      iconDir = 'left',
      outline = false,
      borderRadius = 'none',
   } = props;

   const bgColor =
      type === 'success'
         ? `var(--color-success${outline ? '-100' : ''})`
         : `var(--color-danger${outline ? '-100' : ''})`;

   const borderColor =
      type === 'success'
         ? `var(--color-success${outline ? '-200' : ''})`
         : `var(--color-danger${outline ? '-200' : ''})`;

   const textColor =
      type === 'success'
         ? outline
            ? 'var(--color-success)'
            : 'var(--color-white)'
         : outline
           ? 'var(--color-danger)'
           : 'var(--color-white)';

   return (
      <BadgeStyled
         $bgColor={bgColor}
         $borderColor={borderColor}
         $textColor={textColor}
         $borderRadiusVariations={borderRadiusVariations}
         $borderRadius={borderRadius}
      >
         {iconSrc &&
            (iconDir === 'left' ? (
               <Icon width={iconSize} iconSrc={iconSrc} className="left-icon" />
            ) : null)}
         {children}
         {iconSrc &&
            (iconDir === 'right' ? (
               <Icon
                  width={iconSize}
                  iconSrc={iconSrc}
                  className="right-icon"
               />
            ) : null)}
      </BadgeStyled>
   );
}
