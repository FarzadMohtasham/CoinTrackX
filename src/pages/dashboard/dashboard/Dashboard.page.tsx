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
  className: 'portfolio-summary-wrapper'
})`
  @media screen and (max-width: ${(props: any) => props.theme.breakpoints.sm}) {
    grid-column: 1 / 10;
  }

  @media screen and (min-width: ${(props: any) => props.theme.breakpoints.sm}) {
    grid-column: 2 / 9;
  }

  @media screen and (min-width: ${(props: any) => props.theme.breakpoints.lg}) {
    grid-column: 3 / 8;
  }
`;

export function Component(): JSX.Element {
  return (
    <DashboardContainer>
      <PortfolioSummaryWrapper>
        <PortfolioSummary />
        <CurrencyPrice />
      </PortfolioSummaryWrapper>
    </DashboardContainer>
  );
}
