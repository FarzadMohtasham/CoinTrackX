import PortfolioValueCrypto from '@components/ui/Crypto/PortfolioValue.crypto.tsx'
import PortfolioVolume24HCrypto from '@components/ui/Crypto/PortfolioVolume24H.crypto.tsx'
import {styled} from 'styled-components'

const PortfolioSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5rem;
  border: .2rem solid var(--color-black-50);
  border-radius: 2.5rem;
  padding: 2.4rem;

  /*Very Small devices (landscape phones, 576px and down)*/
  @media (max-width: ${props => props.theme.responsive.sm}) {
    flex-direction: column;
  }
`

export default function PortfolioSummary() {
    return (
        <PortfolioSummaryContainer>
            <PortfolioValueCrypto/>
            <PortfolioVolume24HCrypto/>
        </PortfolioSummaryContainer>
    )
}