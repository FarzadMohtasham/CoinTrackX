import {styled, IStyledComponent} from "styled-components";
import Logo from "../ui/Logo.tsx";
import Button from "../ui/Button.tsx";
import {NavLink} from "react-router-dom";

const navItems = [
    {
        name: 'features',
        link: '#'
    },
    {
        name: 'prices',
        link: '#'
    },
    {
        name: 'company',
        link: '#'
    },
    {
        name: 'developers',
        link: '#'
    },
    {
        name: 'developers',
        link: '#'
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
    text-decoration: none;
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
    return (
        <HeaderStyled>
            <Logo/>

            <NavBarStyled>
                <NavItemsStyled>
                    {
                        navItems.map((nav: { name: string, link: string }, index: number) => {
                            return (
                                <NavItemStyled key={nav.name + index}>
                                    <a href={nav.link}>
                                        {nav.name}
                                    </a>
                                </NavItemStyled>
                            )
                        })
                    }
                </NavItemsStyled>
            </NavBarStyled>

            <ButtonsCTAStyled className='cta-buttons'>
                <NavLink to={'login'}>
                    <Button type={'black'}
                            borderRadius={'lg'}
                            outline>
                        Sign In
                    </Button>
                </NavLink>
                <Button type={'primary'}
                        borderRadius={'lg'}
                        outline>
                    Get Started
                </Button>
            </ButtonsCTAStyled>
        </HeaderStyled>
    )
}