import {styled} from 'styled-components'
import Skeleton from 'react-loading-skeleton'

import Icon from '@components/ui/Icon.tsx'

import {TopMoverProps} from '@ts/type/TopMover.type.ts'
import {JSX} from "react";

const TopMoverContainer = styled.div`
  width: 100%;
  height: 8rem;
`

const TopMoverWrapper = styled.div`
  border: .2rem solid var(--color-black-50);
  border-radius: .8rem;
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const TopMoverLeftCol = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  .coin-icon-wrapper {
  }

  .coin-info-wrapper {
    display: flex;
    flex-direction: column;

    .coin-id {
      font-size: var(--font-size-body-sm);
      font-weight: 500;
    }

    .coin-symbol {
      font-size: var(--font-size-body-xsm);
      color: var(--color-black-300);
      font-weight: 500;
    }
  }
`

const TopMoverRightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: .5rem;

  .coin-price {
    font-size: var(--font-size-body-sm);
    font-weight: 500;
  }

  .coin-price-24h-change {
    font-size: var(--font-size-body-xsm);
    color: var(--color-black-400);
    font-weight: 400;
  }
`

export default function TopMover(props: TopMoverProps): JSX.Element {
    const {
        coinId = 'undefined',
        coinSymbol = 'undefined',
        price = 'undefined',
        changePercent24Hr = 'undefined',
        isLoading = false,
    }: TopMoverProps = props

    const calc24HChangeAmount = (): string => {
        const priceToCalc: number = Number(Number(price).toFixed(3))
        const changePercent24HrToCalc: number = Number(Number(changePercent24Hr).toFixed(2))

        const calcResult: number = ((priceToCalc / 100) * changePercent24HrToCalc)

        switch (true) {
            case priceToCalc < 0.00001:
                return calcResult.toFixed(7)
            case priceToCalc < 0.0001:
                return calcResult.toFixed(6)
            case priceToCalc < 0.001:
                return calcResult.toFixed(5)
            case priceToCalc < 0.01:
                return calcResult.toFixed(4)
            case priceToCalc < 0.1:
                return calcResult.toFixed(3)
            case priceToCalc <= 1 || priceToCalc >= 1:
                return calcResult.toFixed(2)
            default:
                return ''
        }
    }

    return (
        <TopMoverContainer>
            {
                isLoading ?
                    <Skeleton height={'100%'}
                              width={'100%'}
                              borderRadius={'.8rem'}
                    />
                    :
                    <TopMoverWrapper>
                        <TopMoverLeftCol>
                            <div className={'coin-icon-wrapper'}>
                                <Icon iconSrc={`crypto/${coinSymbol.toLowerCase()}.svg`}
                                      width={'40rem'}
                                />
                            </div>

                            <div className={'coin-info-wrapper'}>
                                <span className={'coin-id'}>{coinId}</span>
                                <span className={'coin-symbol'}>{coinSymbol}</span>
                            </div>
                        </TopMoverLeftCol>

                        <TopMoverRightCol>
                            <span className={'coin-price'}>
                                {price}$
                            </span>

                            <span className={'coin-price-24h-change'}>
                                {changePercent24Hr}%({calc24HChangeAmount()}$)
                            </span>
                        </TopMoverRightCol>
                    </TopMoverWrapper>
            }
        </TopMoverContainer>
    )
}
