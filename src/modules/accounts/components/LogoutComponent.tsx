import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/contexts/AuthStore';

import axiosUtil from '@/utils/axiosUtil';

const App: React.FC = () => {
  const axios = axiosUtil();
  const valueAuth = useAuthStore((s) => s.value);
  const changeAuthValue = useAuthStore((s) => s.changeValue);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    initialValues();
  }, []);

  if (isLogout) {
    return <Navigate to="/accounts/login/" />
  }

  const initialValues = async () => {
    console.log("Logout")
    try {
      console.log("loading...")
      await axios.post(`/accounts/logout/`);
      setIsLogout(true)
      changeAuthValue({
        ...valueAuth,
        _lastUpdate: new Date(),
        _seconds: 5*60,
        _forceUpdate: false,
        _isLoaded: true,
        data: {
          user: {},
          isLogin: false,
        },
      });
    } catch (error) {
      console.error("Error[63563]:", error);
      const apiError: Error = error as Error;
      console.error("Error[63563]:", apiError);
    }
  }

  
  return (
    <p></p>
  )
};

export default App;
