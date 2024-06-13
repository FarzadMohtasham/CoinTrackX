import {JSX} from "react";
import {AssetSummary as AssetSummaryT} from "@typings/type/AssetSummary.type.ts";
import {styled} from "styled-components";
import Skeleton from "react-loading-skeleton";

type AssetSummaryProps = {
    assetSummaryInfo: AssetSummaryT | undefined;
    error: Error | null,
    isLoading: boolean,
    refresh: Function;
}

const AssetSummaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    .summary-title {
        font-size: var(--font-size-body-lg);
        font-weight: 500;
        display: block;
    }

    .summary-info {
        display: block;
        font-size: var(--font-size-body-sm);
        color: var(--color-black-600);
        font-weight: 400;
        text-align: justify;
    }
`

export default function AssetSummary(props: AssetSummaryProps): JSX.Element {
    const {
        assetSummaryInfo,
        error,
        refresh,
        isLoading,
    } = props

    return (
        <>
            {
                isLoading ?
                    <Skeleton height={'3rem'} count={5}/>
                    :
                    <AssetSummaryContainer>
                        <span className={'summary-title'}>
                            About
                        </span>
                        <span className={'summary-info'}>
                            {assetSummaryInfo?.asset_summary}
                        </span>
                    </AssetSummaryContainer>
            }
        </>
    )
}