import {NavigationItemType} from "@typings/type/NavigationItem.type.ts";

export const NavigationListData: NavigationItemType[] = [
    {
        name: 'dashboard',
        title: 'Dashboard',
        link: '/dashboard',
        iconSrc: 'dashboard.svg',
        activeIconSrc: 'active-dashboard.svg',
        active: true,
    },
    {
        name: 'assets-portfolio',
        title: 'Assets/Portfolio',
        link: '/dashboard/assets-portfolio',
        iconSrc: 'assets-portfolio.svg',
        activeIconSrc: 'active-assets-portfolio.svg',
        active: false,
    },
    {
        name: 'prices',
        title: 'prices',
        link: '/dashboard/prices',
        iconSrc: 'prices.svg',
        activeIconSrc: 'active-prices.svg',
        active: false,
    },
    {
        name: 'buy',
        title: 'Buy',
        link: '/dashboard/buy',
        iconSrc: 'buy.svg',
        activeIconSrc: 'active-buy.svg',
        active: false,
    },
    {
        name: 'transactions',
        title: 'Transactions',
        link: '/dashboard/transactions',
        iconSrc: 'transactions.svg',
        activeIconSrc: 'active-transactions.svg',
        active: false,
    },
    {
        name: 'settings',
        title: 'Settings',
        link: '/dashboard/settings',
        iconSrc: 'settings.svg',
        activeIconSrc: 'active-settings.svg',
        active: false,
    },
]