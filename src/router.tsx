import {createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        lazy: () => import('./pages/Home.tsx'),
    },
    {
        path: "/login",
        lazy: () => import('./pages/auth/Login.tsx'),
    },
    {
        path: "/signup",
        lazy: () => import('./pages/auth/Signup.tsx'),
    },
    {
        lazy: () => import('./layout/Dashboard.layout.tsx'),
        children: [
            {
                path: '/dashboard',
                lazy: () => import('@pages/dashboard/dashboard/Dashboard.page.tsx'),
                index: true,
            },
            {
                path: '/dashboard/assets-portfolio',
                lazy: () => import('@pages/dashboard/assets-portfolio/AssetsPortfolio.page.tsx'),
            },
            {
                path: '/dashboard/prices',
                lazy: () => import('@pages/dashboard/prices/AssetsPrice.page.tsx'),
            },
            {
                path: '/dashboard/prices/:assetName',
                lazy: () => import('@pages/dashboard/prices/AssetPrice.page.tsx'),
            },
            {
                path: '/dashboard/transactions',
                lazy: () => import('@pages/dashboard/transactions/Transactions.page.tsx'),
            },
            {
                path: '/dashboard/settings',
                lazy: () => import('@pages/dashboard/settings/Settings.page.tsx'),
            },
            {
                path: '/dashboard/settings/security',
                lazy: () => import('@pages/dashboard/settings/Security.page.tsx'),
            },
            {
                path: '/dashboard/settings/payment-methods',
                lazy: () => import('@pages/dashboard/settings/PaymentMethods.page.tsx'),
            },
            {
                path: '/dashboard/settings/profile',
                lazy: () => import('@pages/dashboard/settings/Profile.page.tsx'),
            },
            {
                path: '/dashboard/settings/preferences',
                lazy: () => import('@pages/dashboard/settings/Preferences.page.tsx'),
            },
            {
                path: '/dashboard/settings/password',
                lazy: () => import('@pages/dashboard/settings/Password.page.tsx'),
            },
        ]
    }
])

export default router
