import {JSX, useEffect, useState} from 'react'
import {styled} from 'styled-components'

import TopMover from '@components/dashboard/prices/TopMover.tsx'
import Heading from '@components/ui/stuff/Heading.tsx'
import Button from '@components/ui/stuff/Button.tsx'

import useGetAssetsQuery from '@query/assets/useGetAssets.query.ts'

import {TopMover as TopMoverT} from '@typings/type/component-types/TopMover.type.ts'
import {Asset} from '@typings/type/Assets.api.type.ts'

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
    justify-content: space-between;
    gap: 1rem;

    @media screen and (min-width: ${props => props.theme.responsive.sm}) {
        flex-direction: row;
    }

    @media screen and (max-width: ${props => props.theme.responsive.sm}) {
        flex-direction: column;
    }
`

const ErrorBox = styled.div`
    display: grid;
    place-content: center;

    .error-title {
        text-align: center;
        margin-bottom: 1rem;
    }

    .error-desc {
        text-align: center;
    }
`

type TopMoversProps = {
    setHasError: (val: boolean) => void;
}

export default function TopMovers(props: TopMoversProps): JSX.Element {
    const {
        setHasError,
    } = props

    const [topMovers, setTopMovers] = useState<TopMoverT[] | null>([
        {
            price: '1200430',
            changePercent24Hr: '323.45',
            coinId: 'btc',
            coinSymbol: 'btc'
        },
        {
            price: '1200430',
            changePercent24Hr: '323.45',
            coinId: 'btc',
            coinSymbol: 'btc'
        },
        {
            price: '1200430',
            changePercent24Hr: '323.45',
            coinId: 'btc',
            coinSymbol: 'btc'
        },
    ])
    const {data: assetsData, error: assetsDataLoadError, refetch, isLoading} = useGetAssetsQuery()

    const onReloadHandler = (): void => {
        refetch()
    }

    useEffect((): void => {

        const assets: Asset[] = assetsData

        if (assets) {
            const sortedAssets: Asset[] = assets.sort((assetA: Asset, assetB: Asset) => {
                return Number(assetA.changePercent24Hr) - Number(assetB.changePercent24Hr)
            }).reverse().slice(0, 3)

            const newTopMovers: TopMoverT[] = sortedAssets.map((asset: Asset): TopMoverT => {
                return {
                    price: Number(asset.priceUsd).toFixed(3).toString(),
                    changePercent24Hr: Number(asset.changePercent24Hr).toFixed(2).toString(),
                    coinId: asset.id,
                    coinSymbol: asset.symbol,
                }
            })

            setTopMovers(newTopMovers)
        }
    }, [assetsData, isLoading])

    useEffect(() => {
        if (assetsDataLoadError) setHasError(true)
        else setHasError(false)
    }, [assetsDataLoadError]);

    return (
        <TopMoversContainer>
            <TopMoversHeaderWrapper>
                <Heading headingType={'h6'}
                         fontWeight={'500'}>
                    Top Movers
                </Heading>

                <Button variant={assetsDataLoadError ? 'primary' : 'gray'}
                        icon={isLoading ? null : 'refresh-gray.svg'}
                        onClickHandler={onReloadHandler}
                        isLoading={isLoading}
                        outline={!assetsDataLoadError}
                        noBorder
                >
                    Reload
                </Button>
            </TopMoversHeaderWrapper>
            {
                assetsDataLoadError ?
                    <ErrorBox>
                        <Heading headingType={'h6'}
                                 className={'error-title'}
                                 fontWeight={'500'}>
                            Oops, Something went wrong!
                        </Heading>
                        <span className={'error-desc'}>Please reload...</span>
                    </ErrorBox>
                    :
                    <TopMoversWrapper>
                        {
                            topMovers?.map((topMover: TopMoverT, i: number) => {
                                return (
                                    <TopMover {...topMover}
                                              isLoading={isLoading}
                                              key={'top-mover-' + i}/>
                                )
                            })
                        }
                    </TopMoversWrapper>
            }
        </TopMoversContainer>
    )
}