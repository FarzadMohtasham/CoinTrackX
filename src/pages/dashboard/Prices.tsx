import {styled} from 'styled-components'

import TopMovers from '@components/dashboard/prices/TopMovers.tsx'
import PricesTable from '@components/dashboard/prices/PricesTable.tsx'
import {JSX} from "react";

const PricesContainer = styled.div`
  padding: 3.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .portfolio-summary {
    margin-bottom: 2.4rem;
  }
`

const PricesWrapper = styled.div`
`

const TopMoversWrapper = styled.div``

export default function Prices(): JSX.Element {
    return (
        <PricesContainer>

            <TopMoversWrapper>
                <TopMovers/>
            </TopMoversWrapper>

            <PricesWrapper>
                <PricesTable/>
            </PricesWrapper>
        </PricesContainer>
    )
}