import {useEffect, useState} from 'react'
import {styled} from 'styled-components'

import TopMover from '@components/ui/TopMover.tsx'

import useGetAssetsQuery from '@query/useGetAssets.tsx'

import {TopMover as TopMoverT} from '@ts/type/TopMover.type.ts'
import Heading from '@components/ui/Heading.tsx'
import Button from '@components/ui/Button.tsx'

const TopMoversContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

const TopMoversHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TopMoversWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`

export default function TopMovers() {
    const [topMovers, setTopMovers] = useState<TopMoverT[] | null>([
        {
            price: '1200430',
            h24_change: '323.45',
            coin_id: 'btc',
            coin_symbol: 'btc'
        },
        {
            price: '1200430',
            h24_change: '323.45',
            coin_id: 'btc',
            coin_symbol: 'btc'
        },
        {
            price: '1200430',
            h24_change: '323.45',
            coin_id: 'btc',
            coin_symbol: 'btc'
        },
    ])

    const {data, error, refetch, isLoading} = useGetAssetsQuery()

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <TopMoversContainer>
            <TopMoversHeaderWrapper>
                <Heading heading_type={'h6'}
                         font_weight={'500'}>
                    Top Movers
                </Heading>

                <Button btnType={'gray'}
                        icon={'refresh-gray.svg'}
                        on_click_handler={() => refetch()}
                        no_border
                        outline
                >
                    Reload
                </Button>
            </TopMoversHeaderWrapper>

            <TopMoversWrapper>
                {
                    topMovers?.map((topMover, i) => {
                        return (
                            <TopMover {...topMover}
                                      is_loading={isLoading}
                                      key={'top-mover-' + i}/>
                        )
                    })
                }
            </TopMoversWrapper>
        </TopMoversContainer>
    )
}