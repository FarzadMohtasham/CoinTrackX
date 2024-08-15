import { createBrowserRouter } from 'react-router-dom';
import { lazy, ReactNode, Suspense } from 'react';

import LazyRouteFallbackLoading from '@components/fallbacks/LazyRouteFallbackLoading.tsx';

// Loaders
import { loader as loginPageLoader } from '@pages/auth/LoginPage.tsx';
import { loader as signupPageLoader } from '@pages/auth/SignupPage.tsx';
import { loader as DashboardLayoutLoader } from '@layouts/Dashboard.layout.tsx';
import { PageTransition } from '@/animations/PageTransition';

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
const PasswordPage = lazy(
   () => import('@pages/dashboard/settings/PasswordPage.tsx'),
);
const LogoutPage = lazy(
   () => import('@pages/dashboard/logout/Logout.page.tsx'),
);

const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
   <Suspense fallback={<LazyRouteFallbackLoading />}>{children}</Suspense>
);

const router: any = createBrowserRouter([
   {
      path: '/',
      element: (
         <SuspenseWrapper>
            <PageTransition>
               <HomePage />
            </PageTransition>
         </SuspenseWrapper>
      ),
   },
   {
      path: 'login',
      element: (
         <SuspenseWrapper>
            <PageTransition>
               <LoginPage />
            </PageTransition>
         </SuspenseWrapper>
      ),
      loader: loginPageLoader,
   },
   {
      path: 'signup',
      element: (
         <SuspenseWrapper>
            <PageTransition>
               <SignupPage />
            </PageTransition>
         </SuspenseWrapper>
      ),
      loader: signupPageLoader,
   },
   {
      path: 'dashboard',
      id: 'dashboardPage',
      element: (
         <SuspenseWrapper>
            <PageTransition>
               <DashboardLayout />
            </PageTransition>
         </SuspenseWrapper>
      ),
      loader: DashboardLayoutLoader,
      children: [
         {
            index: true,
            element: (
               <SuspenseWrapper>
                  <PageTransition>
                     <DashboardPage />
                  </PageTransition>
               </SuspenseWrapper>
            ),
         },
         {
            path: 'assets-portfolio',
            element: (
               <SuspenseWrapper>
                  <PageTransition>
                     <AssetsPortfolioPage />
                  </PageTransition>
               </SuspenseWrapper>
            ),
         },
         {
            path: 'prices',
            element: (
               <SuspenseWrapper>
                  <PageTransition>
                     <AssetsPricePage />
                  </PageTransition>
               </SuspenseWrapper>
            ),
         },
         {
            path: 'prices/:assetName',
            element: (
               <SuspenseWrapper>
                  <PageTransition>
                     <AssetPricePage />
                  </PageTransition>
               </SuspenseWrapper>
            ),
         },
         {
            path: 'transactions',
            element: (
               <SuspenseWrapper>
                  <PageTransition>
                     <TransactionsPage />
                  </PageTransition>
               </SuspenseWrapper>
            ),
         },
         {
            id: 'settings',
            path: 'settings',
            element: (
               <SuspenseWrapper>
                  <PageTransition>
                     <SettingsPage />
                  </PageTransition>
               </SuspenseWrapper>
            ),
            children: [
               {
                  path: 'security',
                  element: (
                     <SuspenseWrapper>
                        <PageTransition>
                           <SecurityPage />
                        </PageTransition>
                     </SuspenseWrapper>
                  ),
                  index: true,
               },
               {
                  path: 'payment-methods',
                  element: (
                     <SuspenseWrapper>
                        <PageTransition>
                           <PaymentMethodsPage />
                        </PageTransition>
                     </SuspenseWrapper>
                  ),
               },
               {
                  path: 'profile',
                  element: (
                     <SuspenseWrapper>
                        <PageTransition>
                           <ProfilePage />
                        </PageTransition>
                     </SuspenseWrapper>
                  ),
               },
               {
                  path: 'password',
                  element: (
                     <SuspenseWrapper>
                        <PageTransition>
                           <PasswordPage />
                        </PageTransition>
                     </SuspenseWrapper>
                  ),
               },
            ],
         },
         {
            path: 'logout',
            element: (
               <SuspenseWrapper>
                  <PageTransition>
                     <LogoutPage />
                  </PageTransition>
               </SuspenseWrapper>
            ),
         },
      ],
   },
]);

export default router;
