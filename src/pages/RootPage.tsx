import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/contexts/AuthStore';
import { HeaderUser } from '@/modules/nav/layouts/HeaderLayout';
import {
  LoadingOutlined,
} from '@ant-design/icons';

import axiosUtil from '@/utils/axiosUtil';
import { validateJSON } from '@/utils/apiUtil';

const App: React.FC = () => {
  const axios = axiosUtil();
  const valueAuth = useAuthStore((s) => s.value)
  const changeAuthValue = useAuthStore((s) => s.changeValue)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initialValues();
  }, []);

  const initialValues = async () => {
    console.log("Root")
    let user = {}
    let isLogin = false;
    try {
      const res = await axios.get(`/accounts/me/`);
      console.log("json:", validateJSON(res))
      user = res.data;
      isLogin = true;
    } catch (error) {
      console.error("Error[36482]:", error);
      const apiError: Error = error as Error;
      console.error("Error[36482]:", apiError);
    } finally {
      console.log("Root finally")
      changeAuthValue({
        ...valueAuth,
        _lastUpdate: new Date(),
        _seconds: 5*60,
        _forceUpdate: false,
        _isLoaded: true,
        data: {
          user: user,
          isLogin: isLogin,
        },
      });
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingOutlined />

  return (
    <div>
      <HeaderUser />
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default App;
