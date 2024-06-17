import {JSX, useState} from "react";
import {useParams} from "react-router-dom";
import {styled} from "styled-components";

import AssetInfo from "@components/dashboard/prices/assetPrice/AssetInfo.tsx";
import AssetSummary from "@components/dashboard/prices/assetPrice/AssetSummary.tsx";
import GoBack from "@components/ui/stuff/GoBack.tsx";

import {AssetName} from "@typings/type/Assets.api.type.ts";

import useGetAssetSummaryQuery from "@query/assetSummary/useGetAssetSummary.query.ts";
import useGetAssetQuery from "@query/assets/useGetAsset.query.ts";
import AssetChart from "@components/dashboard/prices/assetPrice/AssetChart.tsx";
import AssetMarkets from "@components/dashboard/prices/assetPrice/AssetMarkets.tsx";

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

export default function AssetPricePage(): JSX.Element {
    const {hasError, setHasError} = useState()
    const {assetName} = useParams<Readonly<string>>()

    return (
        <AssetPriceContainer>
            <AssetPriceWrapper>
                <GoBack link={'/dashboard/prices'}>Go Back</GoBack>
                <AssetInfo assetName={assetName as AssetName}/>
                <AssetSummary assetName={assetName as AssetName}/>
                <AssetChart assetName={assetName as AssetName}/>
                <AssetMarkets assetName={assetName as AssetName}/>
            </AssetPriceWrapper>
        </AssetPriceContainer>
    )
}