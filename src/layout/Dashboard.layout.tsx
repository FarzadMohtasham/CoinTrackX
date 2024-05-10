import {styled} from "styled-components";
import {Outlet, useNavigate} from 'react-router-dom'
import Heading from "../components/ui/Heading.tsx";
import Logo from "../components/ui/Logo.tsx";
import NavigationItem from "../components/ui/NavigationItem.tsx";
import {NavigationListData} from "../data/NavigationList.data.ts";
import {NavigationItemType} from "../ts/type/NavigationItem.type.ts";
import {useState} from "react";

const LayoutContainer = styled.div`
  display: grid;
  height: 100vh;

  /*Very Small devices (landscape phones, 576px and down)*/
  @media (max-width: 57.6rem) {
    grid-template-areas: 
    'layout-header layout-header layout-header layout-header layout-header layout-header layout-header layout-header'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main';
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media (min-width: 57.6rem) {
    grid-template-areas: 
    'layout-header layout-header layout-header layout-header layout-header layout-header layout-header layout-header'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-main layout-main layout-main layout-main layout-main layout-main layout-main layout-main';
  }

  /*Medium devices (tablets, 768px and up)*/
  @media (min-width: 76.8rem) {
    grid-template-areas: 
    'layout-sidebar layout-header layout-header layout-header layout-header layout-header layout-header layout-header'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main';
  }

  /*Large devices (desktops, 992px and up)*/
  @media (min-width: 99.2rem) {
    grid-template-areas: 
    'layout-sidebar layout-header layout-header layout-header layout-header layout-header layout-header layout-header'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main'
    'layout-sidebar layout-main layout-main layout-main layout-main layout-main layout-main layout-main';
  }
`

const LayoutHeader = styled.div`
  grid-area: layout-header;
  border-bottom: .2rem var(--color-black-100) solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3.2rem;
`
const LayoutSidebar = styled.div`
  flex-direction: column;
  gap: 4.8rem;
  grid-area: layout-sidebar;
  border-right: .2rem var(--color-black-100) solid;
  padding: 3.2rem 2.4rem;

  .navigation-list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  /*Very Small devices (landscape phones, 576px and down)*/
  @media (max-width: 57.6rem) {
    display: none;
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media (min-width: 57.6rem) {
    display: none;
  }

  /*Medium devices (tablets, 768px and up)*/
  @media (min-width: 76.8rem) {
    display: flex;
  }
`

const LayoutMain = styled.div`
  grid-area: layout-main;
  overflow-y: scroll;
`

export default function DashboardLayout() {
    const [navigationList, setNavigationList] = useState<NavigationItemType[]>(NavigationListData)

    const navigate = useNavigate()

    const onNavigationItemHandler = (navItemName: string): void => {
        const currentSelectedNavIndex = navigationList.findIndex(nav => nav.active)
        const newSelectedNavIndex = navigationList.findIndex(nav => nav.name === navItemName)

        setNavigationList((navList) => {
            navList[currentSelectedNavIndex].active = false
            navList[newSelectedNavIndex].active = true
            return navList
        })

        navigate(navigationList[newSelectedNavIndex].link)
    }

    return (
        <LayoutContainer>
            <LayoutHeader>
                <Heading heading_type={'h6'}>LayoutHeader</Heading>

                <div>
                    sadfdsfd
                </div>
            </LayoutHeader>

            <LayoutSidebar>
                <Logo/>
                <div className={'navigation-list'}>
                    {
                        navigationList.map((navItem: NavigationItemType, index: number): JSX.Element => {
                            return (
                                <NavigationItem key={navItem.name + index}
                                                icon_src={navItem.icon_src}
                                                active_icon_src={navItem.active_icon_src}
                                                icon_alt={navItem.name}
                                                icon_width={'20rem'}
                                                active={navItem.active}
                                                on_click={() => onNavigationItemHandler(navItem.name)}
                                >
                                    {navItem.name}
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