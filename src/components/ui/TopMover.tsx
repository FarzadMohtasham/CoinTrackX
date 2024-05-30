import {styled} from 'styled-components'
import Skeleton from 'react-loading-skeleton'

import Icon from '@components/ui/Icon.tsx'

import {TopMoverProps} from '@ts/type/TopMover.type.ts'

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
  gap: .5rem;

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

export default function TopMover(props: TopMoverProps) {
    const {
        coin_id = 'undefined',
        coin_symbol = 'undefined',
        price = 'undefined',
        h24_change = 'undefined',
        is_loading = false,
    } = props

    console.log(is_loading)

    return (
        <TopMoverContainer>
            {
                is_loading ?
                    <Skeleton height={'100%'}
                              width={'100%'}
                              borderRadius={'.8rem'}
                    />
                    :
                    <TopMoverWrapper>
                        <TopMoverLeftCol>
                            <div className={'coin-icon-wrapper'}>
                                <Icon icon_src={'crypto/btc.svg'}
                                      width={'40rem'}
                                />
                            </div>

                            <div className={'coin-info-wrapper'}>
                                <span className={'coin-id'}>{coin_id}</span>
                                <span className={'coin-symbol'}>{coin_symbol}</span>
                            </div>
                        </TopMoverLeftCol>

                        <TopMoverRightCol>
                    <span className={'coin-price'}>
                        {price}
                    </span>

                            <span className={'coin-price-24h-change'}>
                        {h24_change}
                    </span>
                        </TopMoverRightCol>
                    </TopMoverWrapper>
            }
        </TopMoverContainer>
    )
}
