import { createBrowserRouter } from 'react-router-dom';
import { lazy, ReactNode, Suspense } from 'react';

import LazyRouteFallbackLoading from '@components/fallbacks/LazyRouteFallbackLoading.tsx';

// Loaders
import { loader as loginPageLoader } from '@pages/auth/LoginPage.tsx';
import { loader as signupPageLoader } from '@pages/auth/SignupPage.tsx';
import { loader as DashboardLayoutLoader } from '@layouts/Dashboard.layout.tsx';

// Lazy-loaded components
const HomePage = lazy(() => import('@pages/Home.tsx'));
const LoginPage = lazy(() => import('@pages/auth/LoginPage.tsx'));
const SignupPage = lazy(() => import('@pages/auth/SignupPage.tsx'));
const DashboardLayout = lazy(() => import('@layouts/Dashboard.layout.tsx'));
const DashboardPage = lazy(
   () => import('@pages/dashboard/dashboard/DashboardPage.tsx'),
);
const AssetsPortfolioPage = lazy(
   () => import('@pages/dashboard/assetsPortfolio/AssetsPortfolioPage.tsx'),
);
const AssetsPricePage = lazy(
   () => import('@pages/dashboard/prices/AssetsPricePage.tsx'),
);
const AssetPricePage = lazy(
   () => import('@pages/dashboard/prices/AssetPricePage.tsx'),
);
const TransactionsPage = lazy(
   () => import('@pages/dashboard/transactions/TransactionsPage.tsx'),
);
const SettingsPage = lazy(
   () => import('@pages/dashboard/settings/SettingsPage.tsx'),
);
const SecurityPage = lazy(
   () => import('@pages/dashboard/settings/SecurityPage.tsx'),
);
const PaymentMethodsPage = lazy(
   () => import('@pages/dashboard/settings/PaymentMethodsPage.tsx'),
);
const ProfilePage = lazy(
   () => import('@pages/dashboard/settings/ProfilePage.tsx'),
);
const PreferencesPage = lazy(
   () => import('@pages/dashboard/settings/PreferencesPage.tsx'),
);
const PasswordPage = lazy(
   () => import('@pages/dashboard/settings/PasswordPage.tsx'),
);

const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
   <Suspense fallback={<LazyRouteFallbackLoading />}>{children}</Suspense>
);

const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <SuspenseWrapper>
            <HomePage />
         </SuspenseWrapper>
      ),
   },
   {
      path: 'login',
      element: (
         <SuspenseWrapper>
            <LoginPage />
         </SuspenseWrapper>
      ),
      loader: loginPageLoader,
   },
   {
      path: 'signup',
      element: (
         <SuspenseWrapper>
            <SignupPage />
         </SuspenseWrapper>
      ),
      loader: signupPageLoader,
   },
   {
      path: 'dashboard',
      id: 'dashboardPage',
      element: (
         <SuspenseWrapper>
            <DashboardLayout />
         </SuspenseWrapper>
      ),
      loader: DashboardLayoutLoader,
      children: [
         {
            index: true,
            element: (
               <SuspenseWrapper>
                  <DashboardPage />
               </SuspenseWrapper>
            ),
         },
         {
            path: 'assets-portfolio',
            element: (
               <SuspenseWrapper>
                  <AssetsPortfolioPage />
               </SuspenseWrapper>
            ),
         },
         {
            path: 'prices',
            element: (
               <SuspenseWrapper>
                  <AssetsPricePage />
               </SuspenseWrapper>
            ),
         },
         {
            path: 'prices/:assetName',
            element: (
               <SuspenseWrapper>
                  <AssetPricePage />
               </SuspenseWrapper>
            ),
         },
         {
            path: 'transactions',
            element: (
               <SuspenseWrapper>
                  <TransactionsPage />
               </SuspenseWrapper>
            ),
         },
         {
            id: 'settings',
            path: 'settings',
            element: (
               <SuspenseWrapper>
                  <SettingsPage />
               </SuspenseWrapper>
            ),
            children: [
               {
                  path: 'security',
                  element: (
                     <SuspenseWrapper>
                        <SecurityPage />
                     </SuspenseWrapper>
                  ),
                  index: true,
               },
               {
                  path: 'payment-methods',
                  element: (
                     <SuspenseWrapper>
                        <PaymentMethodsPage />
                     </SuspenseWrapper>
                  ),
               },
               {
                  path: 'profile',
                  element: (
                     <SuspenseWrapper>
                        <ProfilePage />
                     </SuspenseWrapper>
                  ),
               },
               {
                  path: 'preferences',
                  element: (
                     <SuspenseWrapper>
                        <PreferencesPage />
                     </SuspenseWrapper>
                  ),
               },
               {
                  path: 'password',
                  element: (
                     <SuspenseWrapper>
                        <PasswordPage />
                     </SuspenseWrapper>
                  ),
               },
            ],
         },
      ],
   },
]);

export default router;
