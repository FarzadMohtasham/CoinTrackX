import {JSX} from 'react'
import {css, styled} from 'styled-components'

import Container from '@components/ui/stuff/Container.tsx'
import HeadingBox from '@components/ui/stuff/HeadingBox.tsx'

const coinsSrcList = [
    '/images/dogecoin.coin.home.svg',
    '/images/act.coin.home.svg',
    '/images/btc.coin.home.svg',
    '/images/eth.coin.home.svg',
    '/images/gusd.coin.home.svg',
    '/images/ogn.coin.home.svg',
    '/images/xrp.coin.home.svg',
]

const CoinsWrapperStyled = styled.section.attrs({
    id: 'coins'
})`
  padding-top: 10rem;
  padding-bottom: 4.8rem;
  display: flex;
  flex-direction: column;
  gap: 8rem;
  align-items: center;
`

const CoinsListStyled = styled.div`
  display: grid;
  gap: 5rem;
  padding: 3rem 4rem;
  background-color: white;
  width: max-content;
  height: max-content;

  img {
    width: 8rem;
  }

  /*Very Small devices (landscape phones, 768px and down)*/
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-areas: "a b"
                         "c d"
                         "e f"
                         "g .";
    border-radius: 3rem;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-areas: 'a b c d e f g';
    border-radius: 100rem;
  }
`

export default function Coins(): JSX.Element {
    return (
        <Container backgroundStyle={css`background: linear-gradient(to bottom, #EFEDFD, #FFFFFF);`}>
            <CoinsWrapperStyled>
                <HeadingBox label={'Coins'}
                            heading={'A lot of coin & tokens!'}
                            desc={'As a crypto-Currency tracking platform, We should support a lot of coin and tokens for make customers and clients happy'}/>

                <CoinsListStyled>
                    {
                        coinsSrcList.map((coinSrc, index) => {
                            return (
                                <img key={coinSrc + index}
                                     src={coinSrc}
                                     alt="coin"/>
                            )
                        })
                    }
                </CoinsListStyled>
            </CoinsWrapperStyled>
        </Container>
    )
}