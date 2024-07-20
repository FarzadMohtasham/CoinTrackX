import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('./pages/Home.tsx')
  },
  {
    path: 'login',
    lazy: () => import('./pages/auth/Login.tsx')
  },
  {
    path: 'signup',
    lazy: () => import('./pages/auth/Signup.tsx')
  },
  {
    path: 'dashboard',
    lazy: () => import('./layout/Dashboard.layout.tsx'),
    children: [
      {
        index: true,
        lazy: () => import('@pages/dashboard/dashboard/Dashboard.page.tsx')
      },
      {
        path: 'assets-portfolio',
        lazy: () =>
          import('@pages/dashboard/assets-portfolio/AssetsPortfolio.page.tsx')
      },
      {
        path: 'prices',
        lazy: () => import('@pages/dashboard/prices/AssetsPrice.page.tsx')
      },
      {
        path: 'prices/:assetName',
        lazy: () => import('@pages/dashboard/prices/AssetPrice.page.tsx')
      },
      {
        path: 'transactions',
        lazy: () =>
          import('@pages/dashboard/transactions/Transactions.page.tsx')
      },
      {
        path: 'settings',
        lazy: () => import('@pages/dashboard/settings/Settings.page.tsx')
      },
      {
        path: 'settings/security',
        lazy: () => import('@pages/dashboard/settings/Security.page.tsx')
      },
      {
        path: 'settings/payment-methods',
        lazy: () => import('@pages/dashboard/settings/PaymentMethods.page.tsx')
      },
      {
        path: 'settings/profile',
        lazy: () => import('@pages/dashboard/settings/Profile.page.tsx')
      },
      {
        path: 'settings/preferences',
        lazy: () => import('@pages/dashboard/settings/Preferences.page.tsx')
      },
      {
        path: 'settings/password',
        lazy: () => import('@pages/dashboard/settings/Password.page.tsx')
      }
    ]
  }
]);

export default router;
