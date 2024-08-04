import { JSX, useEffect, useRef, useState } from 'react';
import {
   Link,
   Outlet,
   redirect,
   useLocation,
   useNavigate,
} from 'react-router-dom';
import { css, styled } from 'styled-components';

import Heading from '@Components/UI/Stuff/Heading.tsx';
import Logo from '@Components/UI/Stuff/Logo.tsx';
import NavigationItem from '@Components/UI/Stuff/NavigationItem.tsx';
import Profile from '@Components/UI/Stuff/Profile.tsx';
import Alert from '@Components/Dashboard/Notifications.tsx';

import { NavigationListData } from '@Data/navigationList.data.ts';
import {
   NavigationItemType,
   NavigationProps,
} from '@Typings/NavigationItem.type.ts';
import Icon from '@Components/UI/Stuff/Icon.tsx';
import { useUiStore } from '@Services/Stores/ui.store.ts';
import useUserLoggedIn from '@Hooks/useUserLoggedIn.ts';

const LayoutContainer = styled.div`
   height: 100vh;
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: repeat(12, 1fr);
   position: relative;
   overflow: hidden;

   /*Very Small devices (landscape phones, 576px and down)*/
   @media screen and (max-width: ${({ theme }: any) => theme.breakpoints.sm}) {
      .layout-header {
         grid-column: 1 / 13;
         grid-row: 1 / 2;
      }

      .layout-main {
         grid-column: 1 / 13;
         grid-row: 2 / 13;
      }

      .layout-sidebar {
         grid-column: 1 / 3;
         grid-row: 1 / 13;
      }
   }
   /*Small devices (landscape phones, 576px and up)*/
   @media screen and (min-width: ${({ theme }: any) => theme.breakpoints.sm}) {
      .layout-header {
         grid-column: 1 / 13;
         grid-row: 1 / 2;
      }

      .layout-main {
         grid-column: 1 / 13;
         grid-row: 2 / 13;
      }

      .layout-sidebar {
         grid-column: 1 / 3;
         grid-row: 1 / 13;
      }
   }
   /*Medium devices (tablets, 768px and up)*/
   @media screen and (min-width: ${({ theme }: any) => theme.breakpoints.md}) {
      .layout-header {
         grid-column: 4 / 13;
         grid-row: 1 / 2;
      }

      .layout-main {
         grid-column: 4 / 13;
         grid-row: 2 / 13;
      }

      .layout-sidebar {
         grid-column: 1 / 4;
         grid-row: 1 / 13;
      }
   }
   /*Large devices (desktops, 992px and up)*/
   @media screen and (min-width: ${({ theme }: any) => theme.breakpoints.lg}) {
      .layout-header {
         grid-column: 3 / 13;
         grid-row: 1 / 2;
      }

      .layout-main {
         grid-column: 3 / 13;
         grid-row: 2 / 13;
      }

      .layout-sidebar {
         grid-column: 1 / 3;
         grid-row: 1 / 13;
      }
   }
`;
const LayoutHeader = styled.div.attrs({ className: 'layout-header' })`
   display: flex;
   align-items: center;
   justify-content: space-between;
   border-bottom: 2px var(--color-black-100) solid;
   padding: 0 24px;

   .left-col {
      display: flex;
      align-items: center;
      gap: 20px;

      .menu-burger {
         display: block;
      }
   }

   .right-col {
      display: flex;
      align-items: center;
      gap: 20px;
   }

   @media screen and (min-width: ${({ theme }: any) => theme.breakpoints.md}) {
      .left-col {
         .menu-burger {
            display: none;
         }
      }
   }
`;

const LayoutSidebar = styled.aside.attrs({ className: 'layout-sidebar' })`
   display: flex;
   flex-direction: column;
   gap: 48px;
   border-right: 2px var(--color-black-100) solid;
   padding: 32px 24px;
   width: 100%;
   height: 100%;
   overflow: scroll;
   overflow-x: hidden;

   .navigation-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
   }

   /*Very Small devices (landscape phones, 576px and down)*/
   @media screen and (max-width: ${({ theme }: any) => theme.breakpoints.sm}) {
      display: none;
   }

   /*Small devices (landscape phones, 576px and up)*/
   @media screen and (min-width: ${({ theme }: any) => theme.breakpoints.sm}) {
      display: none;
   }

   /*Medium devices (tablets, 768px and up)*/
   @media screen and (min-width: ${({ theme }: any) => theme.breakpoints.md}) {
      display: flex;
   }
`;

const LayoutMain = styled.div.attrs({ className: 'layout-main' })`
   overflow-y: scroll;
`;

const MobileSideBar = styled.div.attrs<{
   $navIsOpen: boolean;
   $navStatusWithDelay: boolean;
}>({ className: 'mobile-side-bar' })`
   background-color: white;
   position: absolute;
   width: 75vw;
   height: 100vh;
   transform: translateX(${(props) => (props.$navIsOpen ? '0' : '-75')}vw);
   transition: transform 0.3s ease-in-out;
   box-shadow: rgba(17, 12, 46, 0.15) 0 48px 100px 0;
   z-index: 15;
   padding: 10px 30px;
   overflow: scroll;
   overflow-x: hidden;

   .navbar-heading-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .close-navbar-icon {
         font-size: var(--font-size-heading-2);
         cursor: pointer;
      }
   }

   .navigation-items {
      display: flex;
      flex-direction: column;
      gap: 15px;
   }

   .mobile-sidebar-overlay {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100vh;
      height: 100vw;
      background-color: red;
      transition: opacity 0.3s ease-in-out;
      ${(props) => (props.$navIsOpen ? 'opacity: 100;' : 'opacity: 0;')}
   }
`;

const MobileNavOverlay = styled.div<{
   $navIsOpen: boolean;
   $navStatusWithDelay: boolean;
}>`
   position: absolute;
   left: 0;
   top: 0;
   width: 100vw;
   height: 100vh;
   background-color: var(--color-black-300);
   z-index: 11;
   transition: opacity 0.3s ease-in-out;
   cursor: pointer;
   ${(props) => (props.$navStatusWithDelay ? 'opacity: 100;' : 'opacity: 0;')}
   ${(props) =>
      props.$navIsOpen
         ? css`
              transform: translateX(0);
           `
         : css`
              transform: translateX(100vw);
           `}
`;

const ChildNavItemsContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   padding: 15px 0 0 10px;
`;

export default function DashboardLayout() {
   const [navigationList, setNavigationList] =
      useState<NavigationItemType[]>(NavigationListData);
   const [selectedNavName, setSelectedNavName] = useState<string>('dashboard');
   const [selectedSettingsChildNavName, setSelectedSettingsChildNavName] =
      useState<string>('security');
   const sidebarOverlayRef = useRef<null | HTMLDivElement>(null);

   const location = useLocation();
   const appUrlPath = location.pathname.split('/');
   appUrlPath.shift();

   const navigate = useNavigate();
   const { navStatus, navStatusWithDelay, setNavStatus } = useUiStore(
      (state) => ({
         navStatus: state.navStatus,
         navStatusWithDelay: state.navStatusWithDelay,
         setNavStatus: state.setNavStatus,
      }),
   );

   const resetNavListActiveProp = (): void => {
      setNavigationList((navList: NavigationItemType[]) =>
         navList.map((nav: NavigationItemType) => {
            nav.active = false;
            return nav;
         }),
      );
   };

   const setNavListItemToActive = (navName: string): void => {
      setNavigationList((navList: NavigationItemType[]) =>
         navList.map((nav: NavigationItemType) => {
            if (nav.name === navName) nav.active = true;
            return nav;
         }),
      );
   };

   const onNavigationItemHandler = (navItemName: string): void => {
      const currentSelectedNavIndex = navigationList.findIndex(
         (nav: NavigationItemType) => nav.active,
      );
      const newSelectedNavIndex = navigationList.findIndex(
         (nav: NavigationItemType): boolean => nav.name === navItemName,
      );

      setNavigationList((navList: NavigationItemType[]) => {
         navList[currentSelectedNavIndex].active = false;
         navList[newSelectedNavIndex].active = true;
         return navList;
      });

      if (navItemName === 'settings') {
         navigate('/dashboard/settings/security');
         setSelectedSettingsChildNavName('security');
      } else {
         navigate(navigationList[newSelectedNavIndex].link);
         setSelectedSettingsChildNavName('security');
      }
   };

   const onMenuBurgerHandler = () => {
      setNavStatus(true);
   };

   const onSettingsChildNavHandler = (
      childNavLink: string,
      childNavName: string,
   ) => {
      setSelectedSettingsChildNavName(childNavName);
      navigate(childNavLink);
   };

   // Nav name update
   useEffect((): void => {
      const selectedNavIndex = navigationList.findIndex(
         (nav: NavigationItemType) => nav.active,
      );
      setSelectedNavName(navigationList[selectedNavIndex].title);
   }, [navigationList]);

   // Update active nav based on url changes
   useEffect((): void => {
      const pathList: any = location.pathname.split('/');

      resetNavListActiveProp();

      // Check if user was on the /dashboard, set all to false and dashboard to the true
      if (!pathList[2]) {
         setNavListItemToActive(pathList[1]);
      } else {
         setNavListItemToActive(pathList[2]);
      }
   }, [location.pathname]);

   // Close mobile Navbar except settings nav item click
   useEffect(() => {
      if (
         selectedNavName !== 'settings' &&
         location.pathname[1] !== 'settings'
      ) {
         setNavStatus(false);
      }
   }, [selectedNavName, location.pathname]);

   // Adding click handler to sidebar Overlay to close sidebar on outside click
   useEffect(() => {
      if (sidebarOverlayRef.current) {
         sidebarOverlayRef.current.addEventListener('click', (): void => {
            setNavStatus(false);
         });
      }
   }, []);

   // Update selectedSettingsChildNavName on First dashboard render
   useEffect(() => {
      if (appUrlPath[1] === 'settings') {
         setSelectedSettingsChildNavName(appUrlPath[2]);
      }
   }, []);

   return (
      <LayoutContainer>
         <MobileSideBar
            $navIsOpen={navStatus}
            $navStatusWithDelay={navStatusWithDelay}
         >
            <div className={'navbar-heading-container'}>
               <Logo />
               <span
                  className={'close-navbar-icon'}
                  onClick={() => setNavStatus(false)}
               >
                  &times;
               </span>
            </div>

            <div className={'navigation-items'}>
               {navigationList.map(
                  (navItem: NavigationItemType, index: number): JSX.Element => {
                     const navItemProps: NavigationProps = {
                        iconSrc: navItem.iconSrc,
                        activeIconSrc: navItem.activeIconSrc,
                        iconAlt: navItem.name,
                        iconWidth: '20px',
                        active: navItem.active,
                        onClick: () => onNavigationItemHandler(navItem.name),
                        children: null,
                     };

                     return (
                        <div key={navItem.name + index}>
                           <NavigationItem {...navItemProps}>
                              {navItem.title}
                           </NavigationItem>
                           {navItem.childItems &&
                              selectedNavName.toLowerCase() ===
                                 navItem.name && (
                                 <ChildNavItemsContainer>
                                    {navItem.childItems.map(
                                       (
                                          childNavItem: NavigationItemType,
                                          index: number,
                                       ) => {
                                          const childNavItemProps: NavigationProps =
                                             {
                                                iconSrc: childNavItem.iconSrc,
                                                activeIconSrc:
                                                   childNavItem.activeIconSrc,
                                                iconAlt: childNavItem.name,
                                                iconWidth: '20px',
                                                onClick: () =>
                                                   onSettingsChildNavHandler(
                                                      childNavItem.link,
                                                      childNavItem.name,
                                                   ),
                                                children: null,
                                             };

                                          return (
                                             <div
                                                key={childNavItem.name + index}
                                             >
                                                <NavigationItem
                                                   {...childNavItemProps}
                                                   active={
                                                      selectedSettingsChildNavName ===
                                                      childNavItem.name
                                                   }
                                                >
                                                   {childNavItem.title}
                                                </NavigationItem>
                                             </div>
                                          );
                                       },
                                    )}
                                 </ChildNavItemsContainer>
                              )}
                        </div>
                     );
                  },
               )}
            </div>
         </MobileSideBar>

         <MobileNavOverlay
            $navIsOpen={navStatus}
            $navStatusWithDelay={navStatusWithDelay}
            ref={sidebarOverlayRef}
         ></MobileNavOverlay>

         <LayoutHeader>
            <div className={'left-col'}>
               <Icon
                  iconSrc={'menu-burger.svg'}
                  onClickHandler={onMenuBurgerHandler}
                  width={'25px'}
                  className={'menu-burger'}
                  clickable
               />
               <Heading tagName={'h5'} fontWeight={'bold'}>
                  {selectedNavName}
               </Heading>
            </div>

            <div className={'right-col'}>
               <Alert />
               <Profile />
            </div>
         </LayoutHeader>

         <LayoutSidebar>
            <Link to={'/dashboard'}>
               <Logo />
            </Link>
            <div className={'navigation-list'}>
               {navigationList.map(
                  (navItem: NavigationItemType, index: number): JSX.Element => {
                     const navItemProps: NavigationProps = {
                        iconSrc: navItem.iconSrc,
                        activeIconSrc: navItem.activeIconSrc,
                        iconAlt: navItem.name,
                        iconWidth: '20px',
                        active: navItem.active,
                        onClick: () => onNavigationItemHandler(navItem.name),
                        children: null,
                     };

                     return (
                        <div key={navItem.name + index}>
                           <NavigationItem {...navItemProps}>
                              {navItem.title}
                           </NavigationItem>
                           {navItem.childItems &&
                              selectedNavName.toLowerCase() ===
                                 navItem.name && (
                                 <ChildNavItemsContainer>
                                    {navItem.childItems.map(
                                       (
                                          childNavItem: NavigationItemType,
                                          index: number,
                                       ) => {
                                          const childNavItemProps: NavigationProps =
                                             {
                                                iconSrc: childNavItem.iconSrc,
                                                activeIconSrc:
                                                   childNavItem.activeIconSrc,
                                                iconAlt: childNavItem.name,
                                                iconWidth: '20px',
                                                onClick: () =>
                                                   onSettingsChildNavHandler(
                                                      childNavItem.link,
                                                      childNavItem.name,
                                                   ),
                                                children: null,
                                             };

                                          return (
                                             <div
                                                key={childNavItem.name + index}
                                             >
                                                <NavigationItem
                                                   {...childNavItemProps}
                                                   active={
                                                      selectedSettingsChildNavName ===
                                                      childNavItem.name
                                                   }
                                                >
                                                   {childNavItem.title}
                                                </NavigationItem>
                                             </div>
                                          );
                                       },
                                    )}
                                 </ChildNavItemsContainer>
                              )}
                        </div>
                     );
                  },
               )}
            </div>
         </LayoutSidebar>

         <LayoutMain>
            <Outlet />
         </LayoutMain>
      </LayoutContainer>
   );
}

export const loader = async () => {
   const userLoggedIn = useUserLoggedIn();
   if (!userLoggedIn) {
      return redirect('/login');
   }
   return null;
};
