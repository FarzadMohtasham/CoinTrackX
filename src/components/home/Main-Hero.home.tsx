import {JSX} from 'react'
import {styled, css} from 'styled-components'
import {Link} from 'react-router-dom'

import Heading from '@components/ui/stuff/Heading.tsx'
import Button from '@components/ui/stuff/Button.tsx'
import Container from '@components/ui/stuff/Container.tsx'
import useUserLoggedIn from '@hooks/useUserLoggedIn.ts'

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
      margin-bottom: 3.2rem;
    }

    p {
      color: var(--color-black-600);
      line-height: 1.55;
      margin-bottom: 4.8rem;
      display: block;
    }
  }

  .right-col {
    img {
      width: 100%;
    }
  }

  /*Very Small devices (landscape phones, 768px and down)*/
  @media screen and (max-width: ${props => props.theme.responsive.md}) {
    .left-col {
      width: 100%;
    }

    .right-col {
      width: 100%;
    }
  }

  /*Medium devices (tablets, 768px and up)*/
  @media screen and (min-width: ${props => props.theme.responsive.md}) {
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
  @media screen and (min-width: ${props => props.theme.responsive.xl}) {
    .left-col {
      align-items: flex-start !important;
      text-align: left !important;
    }
  }
`

export default function Hero(): JSX.Element {
    const userLoggedIn: boolean = useUserLoggedIn()

    return (
        <Container backgroundStyle={css`background: linear-gradient(to top, #f8f7fe, #fff);`}>
            <HeroStyled>
                <div className={'left-col'}>
                    <span>Sign in to your secure wallet!</span>
                    <Heading headingType={'h1'}>The next-gen crypto tracking & trading training platform</Heading>
                    <p>Track your crypto currency coin and tokens in one place, from BTC and ETH to XRP...</p>
                    <Link to={'login'}>
                        <Button borderRadius={'lg'}>
                            {
                                userLoggedIn ? 'Index' : 'Get Started'
                            }
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