import {useParams} from "react-router-dom";
import {styled} from "styled-components";

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

export default function AssetPrice() {
    const {assetName} = useParams()

    return (
        <AssetPriceContainer>
            <AssetPriceWrapper>
                {assetName}
            </AssetPriceWrapper>
        </AssetPriceContainer>
    )
}