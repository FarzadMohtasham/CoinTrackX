import { JSX } from 'react';
import { styled } from 'styled-components';

import PortfolioSummary from '@components/dashboard/PortfolioSummary.tsx';
import CurrencyPrice from '@components/ui/crypto/CurrencyPrice.tsx';

const DashboardContainer = styled.div`
   display: grid;
   grid-template-columns: repeat(9, 1fr);
   padding: 32px 20px;

   .portfolio-summary {
      margin-bottom: 24px;
   }
`;

const PortfolioSummaryWrapper = styled.div.attrs({
   className: 'portfolio-summary-wrapper',
})`
   @media screen and (max-width: ${({ theme }: any) => theme.breakpoints.md}) {
      grid-column: 1 / 10;
   }

   @media screen and (min-width: ${({ theme }: any) => theme.breakpoints.md}) {
      grid-column: 1 / 10;
   }

   @media screen and (min-width: ${({ theme }: any) => theme.breakpoints.lg}) {
      grid-column: 2 / 9;
   }

   @media screen and (min-width: ${({ theme }: any) => theme.breakpoints.xl}) {
      grid-column: 3 / 8;
   }
`;

export default function DashboardPage(): JSX.Element {
   return (
      <DashboardContainer>
         <PortfolioSummaryWrapper>
            <PortfolioSummary />
            <CurrencyPrice />
         </PortfolioSummaryWrapper>
      </DashboardContainer>
   );
}
