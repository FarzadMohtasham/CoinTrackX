import { JSX } from 'react';
import { styled } from 'styled-components';

import {
   CopyRightProps,
   CopyRightStyledProps,
} from '@/Libs/Typings/Components/CopyRightProps.type';

const date: Date = new Date();

const CopyRightStyled = styled.span<CopyRightStyledProps>`
   color: ${(props: any) => props.color};
`;

export default function CopyRight(props: CopyRightProps): JSX.Element {
   const { color = 'black' }: CopyRightProps = props;

   return (
      <CopyRightStyled color={color} className={'copy-right'}>
         Copyright {date.getFullYear()} © CoinTrackX
      </CopyRightStyled>
   );
}
