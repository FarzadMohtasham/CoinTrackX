import {createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home.tsx'
import Login from './pages/auth/Login.tsx'
import Signup from './pages/auth/Signup.tsx'
import DashboardLayout from './layout/Dashboard.layout.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import AssetsPortfolio from './pages/dashboard/AssetsPortfolio.tsx'
import Prices from './pages/dashboard/Prices.tsx'
import Buy from './pages/dashboard/Buy.tsx'
import Transactions from './pages/dashboard/Transactions.tsx'
import Settings from './pages/dashboard/Settings.tsx'

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
                Component: Dashboard,
                index: true,
            },
            {
                path: '/dashboard/assets-portfolio',
                Component: AssetsPortfolio,
            },
            {
                path: '/dashboard/prices',
                Component: Prices,
            },
            {
                path: '/dashboard/buy',
                Component: Buy,
            },
            {
                path: '/dashboard/transactions',
                Component: Transactions,
            },
            {
                path: '/dashboard/settings',
                Component: Settings,
            },
        ]
    }
])

export default router