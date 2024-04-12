import { styled } from 'styled-components'
import Heading from "../ui/Heading.tsx";
import Button from "../ui/Button.tsx";

const HeroStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 6.8rem;
  padding: 3rem 0;

  /*X-Large devices (large desktops, 1200px and up)*/
  @media (min-width: ${props => props.theme.responsive.xl}) {
    flex-direction: row;
    gap: 11.8rem;

    .left-col {
      align-items: flex-start !important;
      text-align: left !important;
    }
  }

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
      max-width: 54.4rem;
    }
  }
`

export default function Hero() {
    return (
        <HeroStyled>
            <div className={'left-col'}>
                <span>Sign in to your secure wallet!</span>
                <Heading>The next-gen crypto tracking & trading training platform</Heading>
                <p>Track your crypto currency coin and tokens in one place, from BTC and ETH to XRP...</p>
                <Button type={"primary"}
                        borderRadius={'lg'}>
                    Get started
                </Button>
            </div>

            <div className={'right-col'}>
                <img src="/images/illustration.home.png" alt=""/>
            </div>
        </HeroStyled>
    )
}