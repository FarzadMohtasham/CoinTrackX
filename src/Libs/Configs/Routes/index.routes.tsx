import { createBrowserRouter } from 'react-router-dom';
import { lazy, ReactNode, Suspense } from 'react';

import LazyRouteFallbackLoading from '@Components/Fallbacks/LazyRouteFallbackLoading.tsx';

// Loaders
import { loader as loginPageLoader } from '@Pages/Auth/LoginPage.tsx';
import { loader as signupPageLoader } from '@Pages/Auth/SignupPage.tsx';
import { loader as DashboardLayoutLoader } from '@Layouts/Dashboard.layout.tsx';

// Lazy-loaded components
const HomePage = lazy(() => import('@Pages/Home.tsx'));
const LoginPage = lazy(() => import('@Pages/Auth/LoginPage.tsx'));
const SignupPage = lazy(() => import('@Pages/Auth/SignupPage.tsx'));
const DashboardLayout = lazy(() => import('@Layouts/Dashboard.layout.tsx'));
const DashboardPage = lazy(
   () => import('@Pages/Dashboard/Dashboard/DashboardPage.tsx'),
);
const AssetsPortfolioPage = lazy(
   () => import('@Pages/Dashboard/AssetsPortfolio/AssetsPortfolioPage.tsx'),
);
const AssetsPricePage = lazy(
   () => import('@Pages/Dashboard/Prices/AssetsPricePage.tsx'),
);
const AssetPricePage = lazy(
   () => import('@Pages/Dashboard/Prices/AssetPricePage.tsx'),
);
const TransactionsPage = lazy(
   () => import('@Pages/Dashboard/Transactions/TransactionsPage.tsx'),
);
const SettingsPage = lazy(
   () => import('@Pages/Dashboard/Settings/SettingsPage.tsx'),
);
const SecurityPage = lazy(
   () => import('@Pages/Dashboard/Settings/SecurityPage.tsx'),
);
const PaymentMethodsPage = lazy(
   () => import('@Pages/Dashboard/Settings/PaymentMethodsPage.tsx'),
);
const ProfilePage = lazy(
   () => import('@Pages/Dashboard/Settings/ProfilePage.tsx'),
);
const PreferencesPage = lazy(
   () => import('@Pages/Dashboard/Settings/PreferencesPage.tsx'),
);
const PasswordPage = lazy(
   () => import('@Pages/Dashboard/Settings/PasswordPage.tsx'),
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
            path: 'settings',
            element: (
               <SuspenseWrapper>
                  <SettingsPage />
               </SuspenseWrapper>
            ),
         },
         {
            path: 'settings/security',
            element: (
               <SuspenseWrapper>
                  <SecurityPage />
               </SuspenseWrapper>
            ),
         },
         {
            path: 'settings/payment-methods',
            element: (
               <SuspenseWrapper>
                  <PaymentMethodsPage />
               </SuspenseWrapper>
            ),
         },
         {
            path: 'settings/profile',
            element: (
               <SuspenseWrapper>
                  <ProfilePage />
               </SuspenseWrapper>
            ),
         },
         {
            path: 'settings/preferences',
            element: (
               <SuspenseWrapper>
                  <PreferencesPage />
               </SuspenseWrapper>
            ),
         },
         {
            path: 'settings/password',
            element: (
               <SuspenseWrapper>
                  <PasswordPage />
               </SuspenseWrapper>
            ),
         },
      ],
   },
]);

export default router;
