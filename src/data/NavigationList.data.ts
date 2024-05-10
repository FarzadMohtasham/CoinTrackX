import {NavigationItemType} from "../ts/type/NavigationItem.type.ts";

export const NavigationListData: NavigationItemType[] = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon_src: 'dashboard.svg',
        active_icon_src: 'active-dashboard.svg',
        active: true,
    },
    {
        name: 'Assets/Portfolio',
        link: '/dashboard/assets-portfolio',
        icon_src: 'dashboard.svg',
        active_icon_src: 'active-dashboard.svg',
        active: false,
    },
    {
        name: 'Prices',
        link: '/dashboard/prices',
        icon_src: 'dashboard.svg',
        active_icon_src: 'active-dashboard.svg',
        active: false,
    },
    {
        name: 'Buy',
        link: '/dashboard/buy',
        icon_src: 'dashboard.svg',
        active_icon_src: 'active-dashboard.svg',
        active: false,
    },
    {
        name: 'Transactions',
        link: '/dashboard/transactions',
        icon_src: 'dashboard.svg',
        active_icon_src: 'active-dashboard.svg',
        active: false,
    },
    {
        name: 'Settings',
        link: '/dashboard/settings',
        icon_src: 'dashboard.svg',
        active_icon_src: 'active-dashboard.svg',
        active: false,
    },
]