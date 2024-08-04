import { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Logo from '@components/ui/stuff/Logo.tsx';
import Button from '@components/ui/stuff/Button.tsx';
import Icon from '@components/ui/stuff/Icon.tsx';

import useUserLoggedIn from '@hooks/useUserLoggedIn.ts';
import scrollTo from '@utils/scroller.ts';
import { removeLetter } from '@utils/helpers.ts';

const navItems = [
   {
      name: 'partners',
      link: '#partners',
   },
   {
      name: 'platforms',
      link: '#platforms',
   },
   {
      name: 'coins',
      link: '#coins',
   },
   {
      name: 'buy crypto',
      link: '#buy-crypto',
   },
   {
      name: 'testimonials',
      link: '#testimonials',
   },
];

const HeaderStyled = styled.header`
   display: flex;
   justify-content: center;
   width: 100vw;
   position: fixed;
   background-color: white;
   box-shadow: rgba(17, 12, 46, 0.05) 0px 48px 100px 0px;

   .header-items-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 90%;

      @media screen and (max-width: 0) {
         width: 97%;
      }

      @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
         width: 94%;
      }

      @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
         width: 91%;
      }

      @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
         width: 88%;
      }

      @media screen and (min-width: ${(props) => props.theme.breakpoints.xl}) {
         width: 85%;
      }

      @media screen and (min-width: ${(props) => props.theme.breakpoints.xxl}) {
         width: 75%;
      }
   }
`;

const NavBarStyled = styled.nav`
   display: none;

   @media screen and (min-width: 1200px) {
      & {
         display: block;
      }
   }
`;

const NavItemsStyled = styled.ul`
   list-style: none;
   display: flex;
   gap: 40px;
`;

const NavItemStyled = styled.li`
   cursor: pointer;
   font-weight: 400;

   a {
      color: var(--color-black-600);
      transition: color 0.3s ease-in-out;
   }

   &:hover {
      a {
         color: var(--color-black-800);
      }
   }
`;

const ButtonsCTAStyled = styled.div`
   display: flex;
   gap: 16px;
   padding: 20px 0;

   @media screen and (max-width: var(--breakpoint-md)) {
      .cta-buttons {
         span.btn-text {
            display: none;
         }
      }
   }
`;

const CTABtnText = styled.span<{ $userLoggedIn: boolean }>`
   @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
      display: inline;
   }

   @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
      ${(props) =>
         props.$userLoggedIn &&
         css`
            display: none;
         `};
   }
`;

export default function Header(): JSX.Element {
   const userLoggedIn = useUserLoggedIn();

   return (
      <HeaderStyled>
         <div className={'header-items-wrapper'}>
            <Logo />
            <NavBarStyled>
               <NavItemsStyled>
                  {navItems.map(
                     (nav: { name: string; link: string }, index: number) => {
                        return (
                           <NavItemStyled key={nav.name + index}>
                              <a
                                 onClick={() => {
                                    scrollTo(removeLetter(nav.link, '#'));
                                 }}
                              >
                                 {nav.name.toUpperCase()}
                              </a>
                           </NavItemStyled>
                        );
                     },
                  )}
               </NavItemsStyled>
            </NavBarStyled>
            <ButtonsCTAStyled className="cta-buttons">
               <NavLink to={'/login'}>
                  <Button variant={'black'} borderRadius={'lg'} outline>
                     {userLoggedIn && (
                        <Icon iconSrc={'dashboard.svg'} width={'20px'} />
                     )}
                     <CTABtnText $userLoggedIn={userLoggedIn}>
                        {userLoggedIn ? 'Go To Dashboard' : 'Login'}
                     </CTABtnText>
                  </Button>
               </NavLink>
               {!userLoggedIn && (
                  <NavLink to={'/login'}>
                     <Button borderRadius={'lg'} hideOn={'mobile'} outline>
                        Get Started
                     </Button>
                  </NavLink>
               )}
            </ButtonsCTAStyled>
         </div>
      </HeaderStyled>
   );
}
