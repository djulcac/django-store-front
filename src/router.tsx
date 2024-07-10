import { createBrowserRouter } from 'react-router-dom';

import RootPage from '@/pages/RootPage';
import IndexPage from '@/pages/IndexPage';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootPage />,
    children: [
        {
          index: true,
          element: <IndexPage />,
        },
    ],
  },
]);

export default router;
