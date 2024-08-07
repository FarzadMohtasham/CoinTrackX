import { JSX } from 'react';
import { styled } from 'styled-components';

import PortfolioValueCrypto from '@components/ui/crypto/PortfolioValue.crypto.tsx';
import PortfolioVolume24HCrypto from '@components/ui/crypto/PortfolioVolume24H.crypto.tsx';

import { IStyledComponentBase } from 'styled-components/dist/types';

const PortfolioSummaryContainer: IStyledComponentBase<any> = styled.div.attrs({
   className: 'portfolio-summary',
})`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   gap: 50px;
   border: 2px solid var(--color-black-50);
   border-radius: 25px;
   padding: 24px;

   /*Very Small devices (landscape phones, 576px and down)*/
   @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
      flex-direction: column;
   }
`;

export default function PortfolioSummary(): JSX.Element {
   return (
      <PortfolioSummaryContainer>
         <PortfolioValueCrypto />
         <PortfolioVolume24HCrypto />
      </PortfolioSummaryContainer>
   );
}
