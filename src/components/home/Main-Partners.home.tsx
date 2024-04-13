import {styled} from "styled-components"
import Container from "../ui/Container.tsx";

const PartnersContainer = styled.section`
  padding-top: 10rem;
  padding-bottom: 4.8rem;
`

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-bottom: 4.8rem;

  .label {
    text-transform: uppercase;
    color: var(--color-primary);
    display: block;
    text-align: center;
  }

  .title {
    text-align: center;
    font-weight: 500;
  }

  .desc {
    text-align: center;
    color: var(--color-black-500);
    font-size: var(--font-size-body-md);
    font-weight: 500;
  }
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
                <DataWrapper>
                    <span className={'label'}>partners</span>
                    <h3 className={'title'}>We’re backed by the bests of the world!</h3>
                    <span className={'desc'}>Trusted by these blockchains leading industries </span>
                </DataWrapper>

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