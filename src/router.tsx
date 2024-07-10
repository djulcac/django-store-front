import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootPage from '@/pages/RootPage';
import IndexPage from '@/pages/IndexPage';
const LoginPage = lazy(() => import('@/pages/accounts/LoginPage'));
const LogoutPage = lazy(() => import('@/pages/accounts/LogoutPage'));
const AccountsIndexPage = lazy(() => import('@/pages/accounts/IndexPage'));
const StoreIndexPage = lazy(() => import('@/pages/store/IndexPage'));
const ProductsCrudPage = lazy(() => import('@/pages/store/ProductsCrudPage'));

const router = createBrowserRouter([
  {
    path: '',
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'accounts',
        element: <AccountsIndexPage />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'logout',
            element: <LogoutPage />,
          },
        ]
      },
      {
        path: 'store',
        element: <StoreIndexPage />,
        children: [
          {
            path: 'products',
            element: <ProductsCrudPage />,
          },
        ]
      }
    ]
  }
]);

export default router;
