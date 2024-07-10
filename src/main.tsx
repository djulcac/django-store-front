import React from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import './index.css';

import router from './router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#1E90FF',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '#F0F4F8',
      },
    }}
  >
    <React.StrictMode>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>,
  </ConfigProvider>
)
