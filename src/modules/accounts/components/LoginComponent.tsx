import React from 'react';
import { useEffect } from 'react';

import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/contexts/AuthStore';
import axiosUtil from '@/utils/axiosUtil';
import { setCookie } from '@/utils/authUtil';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface ErrorData {
  error: string
}

interface ErrorResponse {
  status: number;
  message: string;
  data: ErrorData;
  errors?: Array<{ field: string; message: string }>;
}

interface APIError extends Error {
  response?: ErrorResponse;
}

const App: React.FC = () => {
  const axios = axiosUtil();
  const [messageApi, contextHolder] = message.useMessage();
  const changeAuthValue = useAuthStore((s) => s.changeValue);
  const navigate = useNavigate();
  const location = useLocation();
  const fromUrl = location.state?.from?.pathname || '/';

  useEffect(() => {
    validateLogin();
  }, []);

  const validateLogin = () => {
    console.log("Validar")
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      messageApi.open({
        type: 'loading',
        content: 'Login..',
        duration: 1.5,
      })
      const res = await axios.post(`/accounts/login/`, {
        identifier: values?.username,
        password: values?.password,
      });
      setCookie("token", res.data.token,60*60*24)
      changeAuthValue({
        _lastUpdate: new Date(),
        _seconds: 5*60,
        _forceUpdate: false,
        _isLoaded: true,
        data: {
          user: res.data,
          isLogin: true,
        },
      });
      navigate(fromUrl, { replace: true });
      messageApi.open({
        type: 'success',
        content: 'Success',
      });
  
    } catch (error) {
      console.error("Error[98462]:", error);
      const apiError: APIError = error as APIError;
      console.error("Error[98462]:", apiError);
      if (apiError.message == "Network Error"){
        messageApi.open({
          type: 'error',
          content: 'Network Error',
        });
      } else if (apiError.response && apiError.response.status == 401){
        messageApi.open({
          type: 'error',
          content: apiError.response.data.error,
        });
      } else {
        messageApi.open({
          type: 'error',
          content: apiError.message,
        });
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
    {contextHolder}
  </Form>
  )
};

export default App;
