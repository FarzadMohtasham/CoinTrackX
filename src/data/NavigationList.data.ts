import {NavigationItemType} from "@ts/type/NavigationItem.type.ts";

export const NavigationListData: NavigationItemType[] = [
    {
        name: 'dashboard',
        title: 'Dashboard',
        link: '/dashboard',
        icon_src: 'dashboard.svg',
        active_icon_src: 'active-dashboard.svg',
        active: true,
    },
    {
        name: 'assets-portfolio',
        title: 'Assets/Portfolio',
        link: '/dashboard/assets-portfolio',
        icon_src: 'assets-portfolio.svg',
        active_icon_src: 'active-assets-portfolio.svg',
        active: false,
    },
    {
        name: 'prices',
        title: 'prices',
        link: '/dashboard/prices',
        icon_src: 'prices.svg',
        active_icon_src: 'active-prices.svg',
        active: false,
    },
    {
        name: 'buy',
        title: 'Buy',
        link: '/dashboard/buy',
        icon_src: 'buy.svg',
        active_icon_src: 'active-buy.svg',
        active: false,
    },
    {
        name: 'transactions',
        title: 'Transactions',
        link: '/dashboard/transactions',
        icon_src: 'transactions.svg',
        active_icon_src: 'active-transactions.svg',
        active: false,
    },
    {
        name: 'settings',
        title: 'Settings',
        link: '/dashboard/settings',
        icon_src: 'settings.svg',
        active_icon_src: 'active-settings.svg',
        active: false,
    },
]