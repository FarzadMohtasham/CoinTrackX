import {JSX} from 'react'
import {NavLink} from 'react-router-dom'
import {styled} from 'styled-components'

import Logo from '@components/ui/stuff/Logo.tsx'
import Button from '@components/ui/stuff/Button.tsx'
import scrollTo from '@utils/scroller.ts'
import useUserLoggedIn from '@hooks/useUserLoggedIn.ts'
import Icon from '@components/ui/stuff/Icon.tsx'

import {removeLetter} from '@utils/helpers.ts'

const navItems = [
    {
        name: 'partners',
        link: '#partners'
    },
    {
        name: 'platforms',
        link: '#platforms'
    },
    {
        name: 'coins',
        link: '#coins'
    },
    {
        name: 'buy crypto',
        link: '#buy-crypto'
    },
    {
        name: 'testimonials',
        link: '#testimonials'
    },
]

const HeaderStyled = styled.header`
  padding: 2.4rem 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavBarStyled = styled.nav`
  display: none;

  @media screen and (min-width: 992px) {
    & {
      display: block;
    }
  }
`

const NavItemsStyled = styled.ul`
  list-style: none;
  display: flex;
  gap: 4rem;
`

const NavItemStyled = styled.li`
  cursor: pointer;
  font-weight: 400;

  a {
    color: var(--color-black-600);
    transition: color .3s ease-in-out;
  }

  &:hover {
    a {
      color: var(--color-black-800);
    }
  }
`

const ButtonsCTAStyled = styled.div`
  display: flex;
  gap: 1.6rem;
`

export default function Header(): JSX.Element {
    const userLoggedIn = useUserLoggedIn()

    return (
        <HeaderStyled>
            <Logo/>

            <NavBarStyled>
                <NavItemsStyled>
                    {
                        navItems.map((nav: { name: string, link: string }, index: number) => {
                            return (
                                <NavItemStyled key={nav.name + index}>
                                    <a onClick={() => {
                                        scrollTo(removeLetter(nav.link, '#'))
                                    }}>
                                        {nav.name.toUpperCase()}
                                    </a>
                                </NavItemStyled>
                            )
                        })
                    }
                </NavItemsStyled>
            </NavBarStyled>

            <ButtonsCTAStyled className='cta-buttons'>
                <NavLink to={'/login'}>
                    <Button btnType={'black'}
                            borderRadius={'lg'}
                            outline>
                        {userLoggedIn && <Icon iconSrc={'dashboard.svg'} width={'20rem'}/>}
                        {userLoggedIn ? 'Go To Dashboard' : 'Login'}
                    </Button>
                </NavLink>
                {
                    !userLoggedIn && <NavLink to={'/login'}>
                        <Button borderRadius={'lg'}
                                hideOn={'mobile'}
                                outline>
                            Get Started
                        </Button>
                    </NavLink>
                }
            </ButtonsCTAStyled>
        </HeaderStyled>
    )
}