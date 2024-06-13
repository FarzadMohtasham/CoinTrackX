import {useParams} from "react-router-dom";
import {styled} from "styled-components";
import AssetInfo from "@components/dashboard/prices/assetPrice/AssetInfo.tsx";
import useGetAssetQuery from "@query/assets/useGetAsset.query.ts";
import {AssetName} from "@typings/type/Assets.api.type.ts";
import AssetSummary from "@components/dashboard/prices/assetPrice/AssetSummary.tsx";
import useGetAssetSummaryQuery from "@query/assetSummary/useGetAssetSummary.query.ts";
import GoBack from "@components/ui/stuff/GoBack.tsx";

const AssetPriceContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    padding: 3.2rem 2rem;

    .asset-price-wrapper {
        margin-bottom: 2.4rem;
    }
`

const AssetPriceWrapper = styled.div.attrs({
    className: 'asset-price-wrapper',
})`
    display: flex;
    flex-direction: column;
    gap: 4rem;

    @media screen and (max-width: ${(props: any) => props.theme.responsive.sm}) {
        grid-column: 1 / 10;
    }

    @media screen and (min-width: ${(props: any) => props.theme.responsive.sm}) {
        grid-column: 2 / 9;
    }

    @media screen and (min-width: ${(props: any) => props.theme.responsive.lg}) {
        grid-column: 3 / 8;
    }
`

export default function AssetPricePage() {
    const {assetName} = useParams<Readonly<string>>()
    const {
        data: assetData,
        error: assetError,
        refetch: assetRefresh,
        isLoading: assetIsLoading
    } = useGetAssetQuery(assetName as AssetName, {
        gcTime: 0,
    })

    const {
        data: assetSummaryData,
        error: assetSummaryError,
        isLoading: assetSummaryIsLoading,
        refetch: assetSummaryRefresh,
    } = useGetAssetSummaryQuery(assetName as AssetName)

    return (
        <AssetPriceContainer>
            <AssetPriceWrapper>
                <GoBack link={'/dashboard/prices'}>Go Back</GoBack>
                <AssetInfo assetInfo={assetData} error={assetError} refresh={assetRefresh} isLoading={assetIsLoading}/>
                <AssetSummary assetSummaryInfo={assetSummaryData}
                              error={assetSummaryError}
                              refresh={assetSummaryRefresh}
                              isLoading={assetSummaryIsLoading}/>
            </AssetPriceWrapper>
        </AssetPriceContainer>
    )
}