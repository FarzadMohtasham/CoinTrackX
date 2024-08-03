import { createBrowserRouter } from 'react-router-dom';
import { lazy, ReactNode, Suspense } from 'react';
import LazyRouteFallbackLoading from '@Components/Fallbacks/LazyRouteFallbackLoading';
// Loaders
import { loader as loginPageLoader } from '@Pages/Auth/LoginPage';
import { loader as signupPageLoader } from '@Pages/Auth/SignupPage';
import { loader as DashboardLayoutLoader } from '@Layouts/Dashboard.layout';

// Lazy-loaded components
const HomePage = lazy(() => import('@Pages/Home'));
const LoginPage = lazy(() => import('@Pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('@Pages/Auth/SignupPage'));
const DashboardLayout = lazy(() => import('@Layouts/Dashboard.layout'));
const DashboardPage = lazy(
   () => import('@Pages/Dashboard/Dashboard/DashboardPage'),
);
const AssetsPortfolioPage = lazy(
   () => import('@Pages/Dashboard/AssetsPortfolio/AssetsPortfolioPage'),
);
const AssetsPricePage = lazy(
   () => import('@Pages/Dashboard/Prices/AssetsPricePage'),
);
const AssetPricePage = lazy(
   () => import('@Pages/Dashboard/Prices/AssetPricePage'),
);
const TransactionsPage = lazy(
   () => import('@Pages/Dashboard/Transactions/TransactionsPage'),
);
const SettingsPage = lazy(
   () => import('@Pages/Dashboard/Settings/SettingsPage'),
);
const SecurityPage = lazy(
   () => import('@Pages/Dashboard/Settings/SecurityPage'),
);
const PaymentMethodsPage = lazy(
   () => import('@Pages/Dashboard/Settings/PaymentMethodsPage'),
);
const ProfilePage = lazy(() => import('@Pages/Dashboard/Settings/ProfilePage'));
const PreferencesPage = lazy(
   () => import('@Pages/Dashboard/Settings/PreferencesPage'),
);
const PasswordPage = lazy(
   () => import('@Pages/Dashboard/Settings/PasswordPage'),
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
