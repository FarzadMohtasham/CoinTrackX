import {NavigationItemType} from '@typings/NavigationItem.type.ts'

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
        title: 'Prices',
        link: '/dashboard/prices',
        iconSrc: 'prices.svg',
        activeIconSrc: 'active-prices.svg',
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
        childItems: [
            {
                name: 'security',
                title: 'Security',
                link: '/dashboard/settings/security',
                iconSrc: 'security-gray.svg',
                activeIconSrc: 'security-purple.svg',
                active: false,
            },
            {
                name: 'payment-methods',
                title: 'Payment Methods',
                link: '/dashboard/settings/payment-methods',
                iconSrc: 'payment-methods-gray.svg',
                activeIconSrc: 'payment-methods-purple.svg',
                active: false,
            },
            {
                name: 'profile',
                title: 'Profile',
                link: '/dashboard/settings/profile',
                iconSrc: 'profile-gray.svg',
                activeIconSrc: 'profile-purple.svg',
                active: false,
            },
            {
                name: 'preferences',
                title: 'Preferences',
                link: '/dashboard/settings/preferences',
                iconSrc: 'preferences-gray.svg',
                activeIconSrc: 'preferences-purple.svg',
                active: false,
            },
            {
                name: 'password',
                title: 'Password',
                link: '/dashboard/settings/profile',
                iconSrc: 'password-gray.svg',
                activeIconSrc: 'password-purple.svg',
                active: false,
            },
        ]
    },
]









