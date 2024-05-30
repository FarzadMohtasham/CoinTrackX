import {useEffect, useState} from 'react'
import {styled} from 'styled-components'

import TopMover from '@components/ui/TopMover.tsx'

import useGetAssetsQuery from '@query/useGetAssets.tsx'

import {TopMover as TopMoverT} from '@ts/type/TopMover.type.ts'
import Heading from '@components/ui/Heading.tsx'
import Button from '@components/ui/Button.tsx'
import {Asset} from "@ts/type/Assets.api.type.ts";

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
            changePercent24Hr: '323.45',
            coin_id: 'btc',
            coin_symbol: 'btc'
        },
        {
            price: '1200430',
            changePercent24Hr: '323.45',
            coin_id: 'btc',
            coin_symbol: 'btc'
        },
        {
            price: '1200430',
            changePercent24Hr: '323.45',
            coin_id: 'btc',
            coin_symbol: 'btc'
        },
    ])
    const [toastHolder, setToastHolder] = useState<string | undefined>(undefined);

    const {data, error, refetch, isLoading} = useGetAssetsQuery()

    const onReloadHandler = () => {
        refetch()
    }

    useEffect(() => {

        const assets: Asset[] = data

        if (assets) {
            const sortedAssets: Asset[] = assets.sort((assetA, assetB) => {
                return Number(assetA.changePercent24Hr) - Number(assetB.changePercent24Hr)
            }).reverse().slice(0, 3)

            const newTopMovers = sortedAssets.map((asset): TopMoverT => {
                return {
                    price: Number(asset.priceUsd).toFixed(3).toString(),
                    changePercent24Hr: Number(asset.changePercent24Hr).toFixed(2).toString(),
                    coin_id: asset.id,
                    coin_symbol: asset.symbol,
                }
            })

            setTopMovers(newTopMovers)
        }
    }, [data, isLoading])

    return (
        <TopMoversContainer>
            <TopMoversHeaderWrapper>
                <Heading heading_type={'h6'}
                         font_weight={'500'}>
                    Top Movers
                </Heading>

                <Button btnType={'gray'}
                        icon={isLoading ? null : 'refresh-gray.svg'}
                        on_click_handler={onReloadHandler}
                        isLoading={isLoading}
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