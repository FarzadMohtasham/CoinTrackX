import {styled} from 'styled-components'

import Container from "@components/ui/Container.tsx";
import HeadingBox from "@components/ui/HeadingBox.tsx";
import SuperchargeCard from "@components/ui/Card/Supercharge.card.tsx";

const BuyCryptoWrapperStyled = styled.section.attrs({
    id: 'buy-crypto'
})`
  padding: 10rem 0;
  display: flex;
  flex-direction: column;
  gap: 8.8rem;
`

const CardWrapperStyled = styled.div`
  display: flex;
  gap: 3.2rem;

  /*Very Small devices (landscape phones, 768px and down)*/
  @media screen and (max-width: ${props => props.theme.responsive.md}) {
    flex-direction: column;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.md}) {
    flex-direction: row;
  }
`

export default function BuyCrypto() {
    return (
        <Container>
            <BuyCryptoWrapperStyled>
                <HeadingBox label={'Buy Crypto'}
                            heading={'Supercharge your trades with advanced features'}/>

                <CardWrapperStyled>
                    <SuperchargeCard imgSrc={'/images/3d-rendering-bitcoin.home.jpg'}
                                     title={'Grow and earn everyday'}
                                     desc={'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'}/>
                    <SuperchargeCard imgSrc={'/images/3d-rendering-bitcoin2.home.jpg'}
                                     title={'Virtual cards powered by Mastercard'}
                                     desc={'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'}/>
                </CardWrapperStyled>
            </BuyCryptoWrapperStyled>
        </Container>
    )
}