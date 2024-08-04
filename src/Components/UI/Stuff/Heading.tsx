import { JSX } from 'react';
import { styled } from 'styled-components';

import {
   HeadingPropsType,
   HeadingStyledProps,
} from '@typings/components/HeadingProps.type.ts';

const HeadingStyled = styled.h1<HeadingStyledProps>`
   font-weight: ${(props: any) => props.$fontWeight};
`;

export default function Heading(props: HeadingPropsType): JSX.Element {
   const {
      children,
      tagName = 'h3',
      fontWeight = '400',
      className = '',
   }: HeadingPropsType = props;

   return (
      <HeadingStyled
         className={className}
         $fontWeight={fontWeight}
         as={tagName}
      >
         {children}
      </HeadingStyled>
   );
}
