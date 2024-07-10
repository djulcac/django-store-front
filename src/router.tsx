import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootPage from '@/pages/RootPage';
import IndexPage from '@/pages/IndexPage';
const LoginPage = lazy(() => import('@/pages/accounts/LoginPage'));
const LogoutPage = lazy(() => import('@/pages/accounts/LogoutPage'));
const AccountsIndexPage = lazy(() => import('@/pages/accounts/IndexPage'));

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
    ],
  },
]);

export default router;
