import {JSX} from "react";
import {styled} from "styled-components";
import Skeleton from "react-loading-skeleton";
import useGetAssetSummaryQuery from "@query/assetSummary/useGetAssetSummary.query.ts";
import {AssetName} from "@typings/type/Assets.api.type.ts";

type AssetSummaryProps = {
    assetName: AssetName,
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
        data: assetSummaryData,
        error: assetSummaryError,
        isLoading: assetSummaryIsLoading,
        refetch: assetSummaryRefresh,
    } = useGetAssetSummaryQuery(props.assetName)

    return (
        <>
            {
                assetSummaryIsLoading ?
                    <Skeleton height={'3rem'} count={5}/>
                    :
                    <AssetSummaryContainer>
                        <span className={'summary-title'}>
                            About
                        </span>
                        <span className={'summary-info'}>
                            {assetSummaryData?.asset_summary}
                        </span>
                    </AssetSummaryContainer>
            }
        </>
    )
}