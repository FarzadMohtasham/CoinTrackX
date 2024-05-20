import PortfolioValueCrypto from '@components/ui/Crypto/PortfolioValue.crypto.tsx'
import PortfolioVolume24HCrypto from '@components/ui/Crypto/PortfolioVolume24H.crypto.tsx'
import {styled} from 'styled-components'

const PortfolioSummaryContainer = styled.div`
  display: flex;
  gap: 5rem;
  border: .2rem solid var(--color-black-50);
  border-radius: 2.5rem;
  padding: 2.4rem;
`

export default function PortfolioSummary() {
    return (
        <PortfolioSummaryContainer>
            <PortfolioValueCrypto/>
            <PortfolioVolume24HCrypto/>
        </PortfolioSummaryContainer>
    )
}