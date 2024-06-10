import {JSX} from 'react'
import {styled} from 'styled-components'

import PortfolioSummary from '@components/dashboard/PortfolioSummary.tsx'
import CurrencyPrice from '@components/ui/crypto/CurrencyPrice.tsx'

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  padding: 3.2rem 2rem;

  .portfolio-summary {
    margin-bottom: 2.4rem;
  }
`

const PortfolioSummaryWrapper = styled.div.attrs({
    className: 'portfolio-summary-wrapper',
})`
  @media screen and (max-width: ${(props: any) => props.theme.responsive.sm}) {
    grid-column: 1 / 10;
  }

  @media screen and (min-width: ${(props: any) => props.theme.responsive.sm}) {
    grid-column: 2 / 9;
  }

  @media screen and (min-width: ${(props: any) => props.theme.responsive.lg}) {
    grid-column: 3 / 8;
  }
`

export default function Dashboard(): JSX.Element {
    return (
        <DashboardContainer>
            <PortfolioSummaryWrapper>
                <PortfolioSummary/>
                <CurrencyPrice/>
            </PortfolioSummaryWrapper>
        </DashboardContainer>
    )
}