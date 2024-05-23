import {styled} from "styled-components";

import Select from "@components/ui/Select.tsx";

import {SelectMenuItem} from "@ts/type/Select.type.ts";

const CurrencyPriceContainer = styled.div`
  display: grid;
`

const CurrencyList: SelectMenuItem[] = [
    {
        name: 'btc',
        default: true,
        icon_src: 'crypto/btc.svg'
    },
    {
        name: 'eth',
        default: false,
        icon_src: 'crypto/eth.svg'
    },
    {
        name: 'bnb',
        default: false,
        icon_src: 'crypto/bnb.svg'
    },
    {
        name: 'cake',
        default: false,
        icon_src: 'crypto/cake.svg'
    },
]

export default function CurrencyPrice() {
    return (
        <CurrencyPriceContainer>
            <Select $menu_items={CurrencyList} $has_icon/>
        </CurrencyPriceContainer>
    )
}