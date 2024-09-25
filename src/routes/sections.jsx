import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import { AuthWrapComponent } from '../components/auth-wrap';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const KolPage = lazy(() => import('src/pages/kol'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const DevPage = lazy(() => import('src/sections/backtest/view/user-view'));
export const WeeklyRankingPage = lazy(() => import('src/sections/weekly-ranking/view/weekly-ranking-view'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <AuthWrapComponent>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AuthWrapComponent>

      ),
      children: [
        { element: <KolPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'kol', element: <KolPage /> },
        { path: 'kol/:kolId/backtests', element: <DevPage /> }, // 新增这一行
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'weekly-ranking', element: <WeeklyRankingPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
