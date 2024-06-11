import {createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home.tsx'
import Login from './pages/auth/Login.tsx'
import Signup from './pages/auth/Signup.tsx'
import DashboardLayout from './layout/Dashboard.layout.tsx'
import DashboardPage from '@pages/dashboard/dashboard'
import AssetsPortfolioPage from '@pages/dashboard/assets-portfolio'
import PricesPage from '@pages/dashboard/prices'
import BuyPage from '@pages/dashboard/buy'
import TransactionsPage from '@pages/dashboard/transactions'
import SettingsPage from '@pages/dashboard/settings'
import AssetPrice from "@pages/dashboard/prices/AssetPrice.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/signup",
        Component: Signup,
    },
    {
        Component: DashboardLayout,
        children: [
            {
                path: '/dashboard',
                Component: DashboardPage,
                index: true,
            },
            {
                path: '/dashboard/assets-portfolio',
                Component: AssetsPortfolioPage,
            },
            {
                path: '/dashboard/prices',
                Component: PricesPage,
            },
            {
                path: '/dashboard/prices/:assetName',
                Component: AssetPrice,
            },
            {
                path: '/dashboard/buy',
                Component: BuyPage,
            },
            {
                path: '/dashboard/transactions',
                Component: TransactionsPage,
            },
            {
                path: '/dashboard/settings',
                Component: SettingsPage,
            },
        ]
    }
])

export default router