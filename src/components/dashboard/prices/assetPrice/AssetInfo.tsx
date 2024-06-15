import {styled} from 'styled-components'
import {Asset} from "@typings/type/Assets.api.type.ts";
import {QueryError} from "@supabase/supabase-js";
import Icon from "@components/ui/stuff/Icon.tsx";
import Skeleton from "react-loading-skeleton";
import {amountToBeFixed} from "@utils/helpers.ts";
import Badge from "@components/ui/stuff/Badge.tsx";

type AssetInfoProps = {
    assetInfo: Asset;
    error: QueryError,
    isLoading: boolean,
    refresh: Function;
}

const AssetInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const AssetInfoLeftCol = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;

    div.asset-details-wrapper {
        div.details {
            display: flex;
            align-items: center;
            gap: 1rem;

            span.asset-name {
                font-weight: 500;
                font-size: var(--font-size-heading-3);
            }

            span.asset-symbol {
                font-size: var(--font-size-body-sm);
                color: var(--color-black-300);
                font-weight: 500;
            }
        }

        span.asset-desc {
            font-size: var(--font-size-body-xsm);
            color: var(--color-black-700);
        }
    }
`

const AssetInfoRightCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;

    div.asset-price-details {
        display: flex;
        align-items: center;
        gap: 1rem;

        span.asset-price {
            font-size: var(--font-size-heading-4);
            font-weight: 500;
        }
    }

    div.asset-price-sub-details {
        text-align: right;

        span.asset-24h-change-amount {
            font-size: var(--font-size-body-sm);
        }
    }
`

export default function AssetInfo(props: AssetInfoProps) {
    const {assetInfo, error, refresh, isLoading}: AssetInfoProps = props

    return (
        <>
            {
                isLoading ?
                    <Skeleton height={'10rem'}/>
                    :
                    <AssetInfoContainer>
                        <AssetInfoLeftCol>
                            <div className={'asset-image-wrapper'}>
                                <Icon iconSrc={`crypto/${assetInfo?.symbol.toLowerCase()}.svg`} width={'60rem'}/>
                            </div>
                            <div className={'asset-details-wrapper'}>
                                <div className="details">
                                    <span className={'asset-name'}>{assetInfo?.name}</span>
                                    <span className={'asset-symbol'}>{assetInfo?.symbol}</span>
                                </div>
                                <span className={'asset-desc'}>Currency in USD. Market Open</span>
                            </div>
                        </AssetInfoLeftCol>

                        <AssetInfoRightCol>
                            <div className={'asset-price-details'}>
                                <span className="asset-price">${amountToBeFixed(Number(assetInfo?.priceUsd))}</span>
                                <Badge type={'success'}
                                       borderRadius={'full'}
                                       outline
                                >
                                    <Icon iconSrc={'arrow-up.svg'} width={'6rem'}/>
                                    {amountToBeFixed(Number(assetInfo?.changePercent24Hr))} %
                                </Badge>
                            </div>
                            <div className="asset-price-sub-details">
                                <span className={'asset-24h-change-amount'}>
                                    {Number(assetInfo?.changePercent24Hr) >= 0 && '+'}
                                    {
                                        amountToBeFixed(Number(assetInfo?.priceUsd) / 100 * Number(assetInfo?.changePercent24Hr))
                                    }$
                                </span>
                            </div>
                        </AssetInfoRightCol>
                    </AssetInfoContainer>
            }
        </>
    )
}