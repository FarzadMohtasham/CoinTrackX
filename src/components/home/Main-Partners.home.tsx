import {styled} from "styled-components"

import Container from "@components/ui/Container.tsx";
import HeadingBox from "@components/ui/HeadingBox.tsx";

const PartnersContainer = styled.section.attrs({
    id: 'partners'
})`
  padding-top: 10rem;
  padding-bottom: 4.8rem;
`

const Brands = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;

  /*Small devices (landscape phones, 768px and down)*/
  @media (max-width: ${props => props.theme.responsive.md}) {
    flex-direction: column;
    gap: 5rem;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media (min-width: ${props => props.theme.responsive.md}) {
    flex-direction: row;
  }
`

const Brand = styled.div`
  img {
    width: 16.4rem;
  }
`

export default function Partners() {
    return (
        <Container>
            <PartnersContainer>
                <HeadingBox label={'partners'}
                            heading={'We’re backed by the bests of the world!'}
                            desc={'Trusted by these blockchains leading industries'}
                            headingTag={'h3'}/>

                <Brands>
                    <Brand><img src="/images/logo1.brand.home.svg" alt=""/></Brand>
                    <Brand><img src="/images/logo2.brand.home.svg" alt=""/></Brand>
                    <Brand><img src="/images/logo3.brand.home.svg" alt=""/></Brand>
                    <Brand><img src="/images/logo4.brand.home.svg" alt=""/></Brand>
                </Brands>
            </PartnersContainer>
        </Container>
    )
}