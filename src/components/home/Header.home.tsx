import {styled, IStyledComponent} from "styled-components";
import Logo from "../ui/Logo.tsx";
import Button from "../ui/Button.tsx";
import {NavLink} from "react-router-dom";
import scrollTo from "../../utils/scroller.ts";
import {removeLetter} from "../../utils/helpers.ts";

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

const HeaderStyled: IStyledComponent<any> = styled.header`
  padding: 2.4rem 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavBarStyled: IStyledComponent<any> = styled.nav`
  display: none;

  @media (min-width: 992px) {
    & {
      display: block;
    }
  }
`

const NavItemsStyled: IStyledComponent<any> = styled.ul`
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

export default function Header() {
    const userLoggedIn = !!JSON.parse(localStorage.getItem(import.meta.env.VITE_User_Auth_Local_Storage_KEY) as string)?.access_token

    console.log(userLoggedIn)

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
                        {
                            userLoggedIn ? 'Go To Dashboard' : 'Login'
                        }
                    </Button>
                </NavLink>
                {
                    !userLoggedIn && <Button borderRadius={'lg'}
                                             hideOn={'mobile'}
                                             outline>
                        Get Started
                    </Button>
                }
            </ButtonsCTAStyled>
        </HeaderStyled>
    )
}