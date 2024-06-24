import {createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home.tsx'
import Login from './pages/auth/Login.tsx'
import Signup from './pages/auth/Signup.tsx'
import DashboardLayout from './layout/Dashboard.layout.tsx'
import DashboardPage from '@pages/dashboard/dashboard/Dashboard.page.tsx'
import AssetsPortfolioPage from '@pages/dashboard/assets-portfolio/AssetsPortfolio.page.tsx'
import PricesPage from '@pages/dashboard/prices/AssetsPrice.page.tsx'
import TransactionsPage from '@pages/dashboard/transactions/Transactions.page.tsx'
import SettingsPage from '@pages/dashboard/settings/Settings.page.tsx'
import AssetPricePage from "@pages/dashboard/prices/AssetPrice.page.tsx";
import SecurityPage from "@pages/dashboard/settings/Security.page.tsx";
import PaymentMethodsPage from "@pages/dashboard/settings/PaymentMethods.page.tsx";
import ProfilePage from "@pages/dashboard/settings/Profile.page.tsx";
import PreferencesPage from "@pages/dashboard/settings/Preferences.page.tsx";
import PasswordPage from "@pages/dashboard/settings/Password.page.tsx";

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
                Component: AssetPricePage,
            },
            {
                path: '/dashboard/transactions',
                Component: TransactionsPage,
            },
            {
                path: '/dashboard/settings',
                Component: SettingsPage,
            },
            {
                path: '/dashboard/settings/security',
                Component: SecurityPage,
            },
            {
                path: '/dashboard/settings/payment-methods',
                Component: PaymentMethodsPage,
            },
            {
                path: '/dashboard/settings/profile',
                Component: ProfilePage,
            },
            {
                path: '/dashboard/settings/preferences',
                Component: PreferencesPage,
            },
            {
                path: '/dashboard/settings/password',
                Component: PasswordPage,
            },
        ]
    }
])

export default router