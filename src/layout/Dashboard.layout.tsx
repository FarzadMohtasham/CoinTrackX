import {JSX, useEffect, useState} from 'react'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {styled} from 'styled-components'

import Heading from '@components/ui/Heading.tsx'
import Logo from '@components/ui/Logo.tsx'
import NavigationItem from '@components/ui/NavigationItem.tsx'
import Profile from '@components/ui/Profile.tsx'
import Alert from '@components/ui/Notifications.tsx'

import {NavigationListData} from '@data/NavigationList.data.ts'
import {NavigationItemType} from '@ts/type/NavigationItem.type.ts'
import useDashboardProtectRoute from '@hooks/useDashboardProtectRoute.ts'
import Icon from '@components/ui/Icon.tsx'

const LayoutContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  /*Very Small devices (landscape phones, 576px and down)*/
  @media screen and (max-width: ${(props: any) => props.theme.responsive.sm}) {
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
  @media screen and (min-width: ${(props: any) => props.theme.responsive.sm}) {
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
  @media screen and (min-width: ${(props: any) => props.theme.responsive.md}) {
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
  @media screen and (min-width: ${(props: any) => props.theme.responsive.lg}) {
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
`
const LayoutHeader = styled.div.attrs({className: 'layout-header'})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: .2rem var(--color-black-100) solid;
  padding: 0 2.4rem;

  .left-col {
    display: flex;
    align-items: center;
    gap: 2rem;

    .menu-burger {
      display: block;
    }
  }

  .right-col {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  @media screen and (min-width: ${(props: any) => props.theme.responsive.md}) {
    .left-col {
      .menu-burger {
        display: none;
      }
    }
  }
`

const LayoutSidebar = styled.aside.attrs({className: 'layout-sidebar'})`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  border-right: .2rem var(--color-black-100) solid;
  padding: 3.2rem 2.4rem;
  width: 100%;
  height: 100%;

  .navigation-list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  /*Very Small devices (landscape phones, 576px and down)*/
  @media screen and (max-width: ${(props: any) => props.theme.responsive.sm}) {
    display: none;
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media screen and (min-width: ${(props: any) => props.theme.responsive.sm}) {
    display: none;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media screen and (min-width: ${(props: any) => props.theme.responsive.md}) {
    display: flex;
  }
`
const LayoutMain = styled.div.attrs({className: 'layout-main'})`
  overflow-y: scroll;
`

export default function DashboardLayout() {
    const [navigationList, setNavigationList] = useState<NavigationItemType[]>(NavigationListData)
    const [selectedNavName, setSelectedNavName] = useState<string>('dashboard')

    const location = useLocation()
    const navigate = useNavigate()

    useDashboardProtectRoute('/login', true)

    const resetNavListActiveProp = (): void => {
        setNavigationList((navList: NavigationItemType[]) => navList.map((nav: NavigationItemType) => {
            nav.active = false
            return nav
        }))
    }

    const setNavListItemToActive = (navName: string): void => {
        setNavigationList((navList: NavigationItemType[]) => navList.map((nav: NavigationItemType) => {
            if (nav.name === navName) nav.active = true
            return nav
        }))
    }

    const onNavigationItemHandler = (navItemName: string): void => {
        const currentSelectedNavIndex = navigationList.findIndex((nav: NavigationItemType) => nav.active)
        const newSelectedNavIndex = navigationList.findIndex((nav: NavigationItemType): boolean => nav.name === navItemName)

        setNavigationList((navList: NavigationItemType[]) => {
            navList[currentSelectedNavIndex].active = false
            navList[newSelectedNavIndex].active = true
            return navList
        })

        navigate(navigationList[newSelectedNavIndex].link)
    }

    // Nav name update
    useEffect((): void => {
        const selectedNavIndex = navigationList.findIndex((nav: NavigationItemType) => nav.active)
        setSelectedNavName(navigationList[selectedNavIndex].title)
    }, [navigationList]);

    // Update active nav based on url changes
    useEffect((): void => {
        const pathList: any = location.pathname.split('/')

        resetNavListActiveProp()

        // Check if user was on the /dashboard, set all to false and dashboard to the true
        if (!pathList[2]) {
            setNavListItemToActive(pathList[1])
        } else {
            setNavListItemToActive(pathList[2])
        }
    }, [location.pathname]);

    return (
        <LayoutContainer>
            <LayoutHeader>
                <div className={'left-col'}>
                    <Icon icon_src={'menu-burger.svg'}
                          width={'25rem'}
                          class_name={'menu-burger'}/>
                    <Heading heading_type={'h5'}
                             font_weight={'bold'}>
                        {selectedNavName}
                    </Heading>
                </div>

                <div className={'right-col'}>
                    <Alert/>
                    <Profile/>
                </div>
            </LayoutHeader>

            <LayoutSidebar>
                <Link to={'/dashboard'}>
                    <Logo/>
                </Link>
                <div className={'navigation-list'}>
                    {
                        navigationList.map((navItem: NavigationItemType, index: number): JSX.Element => {
                            const navItemProps = {
                                icon_src: navItem.icon_src,
                                active_icon_src: navItem.active_icon_src,
                                icon_alt: navItem.name,
                                icon_width: '20rem',
                                active: navItem.active,
                                on_click: () => onNavigationItemHandler(navItem.name),
                            }

                            return (
                                <NavigationItem
                                    key={navItem.name + index} {...navItemProps}>{navItem.title}
                                </NavigationItem>
                            )
                        })
                    }
                </div>
            </LayoutSidebar>

            <LayoutMain>
                <Outlet/>
            </LayoutMain>
        </LayoutContainer>
    )
}