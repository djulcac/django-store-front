import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { Select, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { Popconfirm } from 'antd';

import axiosUtil from '@/utils/axiosUtil';
import { ProductsDto, CompaniesDto, CategoriesDto } from '../../types';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface OptionType {
  value: number;
  label: string;
}

interface ProductsProps {
  id: number;
}

export const ProductsCrudCreateForm: React.FC = () => {
  const axios = axiosUtil();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  // const [data, setData] = useState<ProductsDto>();
  // const [isLoading, setIsLoading] = useState(true);
  const [optionsCompany, setOptionsCompany] = useState<OptionType[]>([]);

  useEffect(() => {
    // setIsLoading(true);
    initialValues();
  }, []);

  const initialValues = async () => {
    try {
      console.log("loading...")
      // setData(res.data)
      // setIsLoading(false)
      form.setFieldsValue({
        gtin_type: 'EAN13',
      })
      getCompanies()
    } catch (error) {
      console.error("Error[92138]:", error);
      const apiError: Error = error as Error;
      console.error("Error[92138]:", apiError);
    }
  }

  const getCompanies = async () => {
    try {
      console.log("loading...")
      const res = await axios.get<ProductsDto[]>(`/store/companies/`);
      const options = res.data.map(item => ({
        value: item.id,
        label: item.business_name,
      }))
      setOptionsCompany(options)
    } catch (error) {
      console.error("Error[21436]:", error);
      const apiError: Error = error as Error;
      console.error("Error[21436]:", apiError);
    }
  }

  const onFinish = async (values: ProductsDto) => {
    try {
      console.log("creating...")
      messageApi.open({
        type: 'loading',
        content: 'Saving..',
        duration: 1.5,
      })
      const res = await axios.post(`/store/products/`, {
        company: values.company,
        business_name: values.business_name,
        registration_name: values.registration_name,
        gtin_type: values.gtin_type,
        gtin: values.gtin,
      });
      console.log('Response:', res)
      messageApi.open({
        type: 'success',
        content: 'Success',
      });
    } catch (error) {
      console.error("Error[95256]:", error);
      const apiError: Error = error as Error;
      messageApi.open({
        type: 'error',
        //@ts-ignore
        content: JSON.stringify(apiError.response.data),
      });
      console.error("Error[95256]:", apiError);
    }
  };

  // if (isLoading) return <p>Loading...</p>
  return (
    <Form
      {...layout}
      form={form}
      name="products-crud"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <h2>Create</h2>
      <Form.Item name="company" label="Company" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select ..."
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={optionsCompany}
        />
      </Form.Item>
      <Form.Item name="business_name" label="Business Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="registration_name" label="Registrarion Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gtin_type" label="GTIN Type" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select ..."
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {value: 'EAN8', label: 'EAN8'},
            {value: 'EAN13', label: 'EAN13'},
            {value: 'LOCAL', label: 'LOCAL'},
          ]}
          // defaultValue='EAN13'
        />
      </Form.Item>
      <Form.Item name="gtin" label="GTIN" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }}
          maxLength={13}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
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

export const ProductsCrudEditForm: React.FC<ProductsProps> = (props) => {
  const axios = axiosUtil();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [data, setData] = useState<ProductsDto>();
  const [isLoading, setIsLoading] = useState(true);
  const [optionsCompany, setOptionsCompany] = useState<OptionType[]>([]);
  const [optionsCategories, setOptionsCategories] = useState<OptionType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    initialValues();
  }, [props.id]);

  const initialValues = async () => {
    try {
      console.log("loading...", props.id)
      const res = await axios.get(`/store/products/${props.id}/`);
      setData(res.data)
      setIsLoading(false)
      form.setFieldsValue(res.data)
      getCompanies();
      getCategories();
    } catch (error) {
      console.error("Error[83629]:", error);
      const apiError: Error = error as Error;
      console.error("Error[83629]:", apiError);
    }
  }

  const getCompanies = async () => {
    try {
      console.log("loading...", props.id)
      const res = await axios.get<CompaniesDto[]>(`/store/companies/`);
      const options = res.data.map(item => ({
        value: item.id,
        label: item.business_name,
      }))
      setOptionsCompany(options)
    } catch (error) {
      console.error("Error[21436]:", error);
      const apiError: Error = error as Error;
      console.error("Error[21436]:", apiError);
    }
  }

  const getCategories = async () => {
    try {
      console.log("loading...", props.id)
      const res = await axios.get<CategoriesDto[]>(`/store/categories/`);
      const options = res.data.map(item => ({
        value: item.id,
        label: item.name,
      }))
      setOptionsCategories(options)
    } catch (error) {
      console.error("Error[65464]:", error);
      const apiError: Error = error as Error;
      console.error("Error[65464]:", apiError);
    }
  }

  const onFinish = async (values: ProductsDto) => {
    try {
      console.log("updating...", data?.id)
      messageApi.open({
        type: 'loading',
        content: 'Saving..',
        duration: 1.5,
      })
      const res = await axios.patch(`/store/products/${data?.id}/`, {
        company: values.company,
        business_name: values.business_name,
        registration_name: values.registration_name,
        gtin_type: values.gtin_type,
        gtin: values.gtin,
        categories: values.categories,
      });
      console.log('Response:', res)
      messageApi.open({
        type: 'success',
        content: 'Success',
      });
    } catch (error) {
      console.error("Error[54298]:", error);
      const apiError: Error = error as Error;
      messageApi.open({
        type: 'error',
        //@ts-ignore
        content: JSON.stringify(apiError.response.data),
      });
      console.error("Error[54298]:", apiError);
    }
  };

  if (isLoading) return <p>Loading1...</p>
  return (
    <Form
      {...layout}
      form={form}
      name="products-crud"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <h2>Products {props.id}</h2>
      <Form.Item name="company" label="Company" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select ..."
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={optionsCompany}
        />
      </Form.Item>
      <Form.Item name="categories" label="Categories" rules={[]}>
        <Select
          mode="multiple"
          allowClear
          showSearch
          placeholder="Select ..."
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={optionsCategories}
        />
      </Form.Item>
      <Form.Item name="business_name" label="Business Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="registration_name" label="Registrarion Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gtin_type" label="GTIN Type" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select ..."
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {value: 'EAN8', label: 'EAN8'},
            {value: 'EAN13', label: 'EAN13'},
            {value: 'LOCAL', label: 'LOCAL'},
          ]}
          defaultValue='EAN13'
        />
      </Form.Item>
      <Form.Item name="gtin" label="GTIN" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }}
          maxLength={13}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
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

export const ProductsForm: React.FC<ProductsProps> = (props) => {
  const axios = axiosUtil();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [data, setData] = useState<ProductsDto>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    initialValues();
  }, [props.id]);

  const initialValues = async () => {
    try {
      console.log("loading...", props.id)
      const res = await axios.get(`/store/products/${props.id}/`);
      setData(res.data)
      setIsLoading(false)
      form.setFieldsValue(res.data)
    } catch (error) {
      console.error("Error[83629]:", error);
      const apiError: Error = error as Error;
      console.error("Error[83629]:", apiError);
    }
  }

  const onFinish = async (values: any) => {
    try {
      console.log("updating...", data?.id)
      messageApi.open({
        type: 'loading',
        content: 'Saving..',
        duration: 1.5,
      })
      const res = await axios.patch(`/store/products/${data?.id}/`, {
        business_name: values?.business_name,
      });
      console.log('Response:', res)
      messageApi.open({
        type: 'success',
        content: 'Success',
      });
    } catch (error) {
      console.error("Error[54298]:", error);
      const apiError: Error = error as Error;
      messageApi.open({
        type: 'error',
        //@ts-ignore
        content: JSON.stringify(apiError.response.data),
      });
      console.error("Error[54298]:", apiError);
    }
  };

  if (isLoading) return <p>Loading...</p>
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <h2>Products {props.id}</h2>
      <Form.Item name="business_name" label="Business Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
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
