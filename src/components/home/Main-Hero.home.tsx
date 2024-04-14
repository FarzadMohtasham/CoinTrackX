import {styled, css} from 'styled-components'
import Heading from "../ui/Heading.tsx";
import Button from "../ui/Button.tsx";
import {Link} from "react-router-dom";
import Container from "../ui/Container.tsx";

const HeroStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 6.8rem;
  padding: 8rem 0;

  .left-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    span {
      display: block;
      padding-bottom: 2.4rem;
      color: var(--color-primary);
    }

    h1 {
      display: block;
      line-height: 1.1;
      padding-bottom: 3.2rem;
    }

    p {
      color: var(--color-black-600);
      line-height: 1.55;
      padding-bottom: 4.8rem;
    }
  }

  .right-col {
    img {
      width: 100%;
    }
  }

  /*Very Small devices (landscape phones, 768px and down)*/
  @media (max-width: ${props => props.theme.responsive.md}) {
    .left-col {
      width: 100%;
    }

    .right-col {
      width: 100%;
    }
  }

  /*Medium devices (tablets, 768px and up)*/
  @media (min-width: ${props => props.theme.responsive.md}) {
    flex-direction: row;
    gap: 11.8rem;

    .left-col {
      width: 50%;
    }

    .right-col {
      width: 50%;
    }
  }

  /*X-Large devices (large desktops, 1200px and up)*/
  @media (min-width: ${props => props.theme.responsive.xl}) {
    .left-col {
      align-items: flex-start !important;
      text-align: left !important;
    }
  }
`

export default function Hero() {
    return (
        <Container background_style={css`background: linear-gradient(to top, #f8f7fe, #fff);`}>
            <HeroStyled>
                <div className={'left-col'}>
                    <span>Sign in to your secure wallet!</span>
                    <Heading>The next-gen crypto tracking & trading training platform</Heading>
                    <p>Track your crypto currency coin and tokens in one place, from BTC and ETH to XRP...</p>
                    <Link to={'login'}>
                        <Button type={"primary"}
                                borderRadius={'lg'}>
                            Get started
                        </Button>
                    </Link>
                </div>

                <div className={'right-col'}>
                    <img src="/images/illustration.home.png" alt=""/>
                </div>
            </HeroStyled>
        </Container>
    )
}