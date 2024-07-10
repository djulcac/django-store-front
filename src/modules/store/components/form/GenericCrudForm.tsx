import React from 'react';
import { Button, Form, Input, Space } from 'antd';
// import { Select, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { Popconfirm } from 'antd';

import axiosUtil from '@/utils/axiosUtil';
import { GenericField } from '../../types';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props {
  fields: GenericField[];
  endpoint: string;
}

export const GenericCrudCreateForm: React.FC<Props> = (props) => {
  const axios = axiosUtil();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    initialValues();
  }, []);

  const initialValues = async () => {
    try {
      console.log("loading...")
    } catch (error) {
      console.error("Error[48593]:", error);
      const apiError: Error = error as Error;
      console.error("Error[48593]:", apiError);
    }
  }

  const onFinish = async (values: any) => {
    try {
      console.log("creating...")
      messageApi.open({
        type: 'loading',
        content: 'Saving..',
        duration: 1.5,
      })
      let obj:Record<string, any> = {}
      props.fields.forEach(item => {
        obj[item.name] = values[item.name]
      })
      const res = await axios.post(props.endpoint, obj);
      console.log('Response:', res)
      messageApi.open({
        type: 'success',
        content: 'Success',
      });
    } catch (error) {
      console.error("Error[22894]:", error);
      const apiError: Error = error as Error;
      messageApi.open({
        type: 'error',
        //@ts-ignore
        content: JSON.stringify(apiError.response.data),
      });
      console.error("Error[22894]:", apiError);
    }
  };

  // if (isLoading) return <p>Loading...</p>
  return (
    <Form
      {...layout}
      form={form}
      name="generic-crud"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <h2>Create</h2>
      {
        props.fields.map( item => {
          return (
            <Form.Item name={item.name} label={item.label} rules={item.rules}>
              <Input />
            </Form.Item>
          )
        })
      }
      <Form.Item
        {...tailLayout}
      >
        <Space>
          <Popconfirm
            title="Save"
            description="Are you sure to save?"
            onConfirm={() => {form.submit()}}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">
              Save
            </Button>
          </Popconfirm>
        </Space>
      </Form.Item>
      {contextHolder}
    </Form>
  );
};

interface EditProps {
  fields: GenericField[];
  endpoint: string;
  id: number;
}
export const GenericCrudEditForm: React.FC<EditProps> = (props) => {
  const axios = axiosUtil();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    initialValues();
  }, [props.id]);

  const initialValues = async () => {
    try {
      console.log("loading...")
      const res = await axios.get(`${props.endpoint}${props.id}/`);
      setData(res.data)
      setIsLoading(false)
      form.setFieldsValue(res.data)
      console.log("init->",res.data)
    } catch (error) {
      console.error("Error[74874]:", error);
      const apiError: Error = error as Error;
      console.error("Error[74874]:", apiError);
    }
  }

  const onFinish = async (values: any) => {
    try {
      console.log("updating...")
      messageApi.open({
        type: 'loading',
        content: 'Saving..',
        duration: 1.5,
      })
      let obj:Record<string, any> = {}
      props.fields.forEach(item => {
        obj[item.name] = values[item.name]
      })
      const res = await axios.patch(`${props.endpoint}${data.id}/`, obj);
      console.log('Response:', res)
      messageApi.open({
        type: 'success',
        content: 'Success',
      });
    } catch (error) {
      console.error("Error[38421]:", error);
      const apiError: Error = error as Error;
      messageApi.open({
        type: 'error',
        //@ts-ignore
        content: JSON.stringify(apiError.response.data),
      });
      console.error("Error[38421]:", apiError);
    }
  };

  if (isLoading) return <p>Loading...</p>
  return (
    <Form
      {...layout}
      form={form}
      name="generic-edit"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <h2>Edit2</h2>
      {
        props.fields.map( item => {
          return (
            <Form.Item name={item.name} label={item.label} rules={item.rules}>
              <Input />
            </Form.Item>
          )
        })
      }
      <Form.Item
        {...tailLayout}
      >
        <Space>
          <Popconfirm
            title="Save"
            description="Are you sure to save?"
            onConfirm={() => {form.submit()}}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">
              Save
            </Button>
          </Popconfirm>
        </Space>
      </Form.Item>
      {contextHolder}
    </Form>
  );
};
