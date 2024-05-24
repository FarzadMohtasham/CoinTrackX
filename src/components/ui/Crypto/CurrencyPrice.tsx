import {styled} from "styled-components";

import Select from "@components/ui/Select.tsx";

import {SelectMenuItem} from "@ts/type/Select.type.ts";

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

const CurrencyPriceContainer = styled.div`
  display: grid;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: bold;
    font-size: var(--font-size-body-lg);
  }
`

export default function CurrencyPrice() {
    return (
        <CurrencyPriceContainer>
            <Header>
                <span>
                    Currency Price
                </span>
                <Select $menu_items={CurrencyList} $has_icon/>
            </Header>
        </CurrencyPriceContainer>
    )
}