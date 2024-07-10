import React from 'react';
import axiosUtil from '@/utils/axiosUtil';
// import { message } from 'antd';
import './ProductsList.css';

import { Table } from 'antd';
import type { TableProps } from 'antd';

import { useState, useEffect } from 'react';
import { Button, Modal, Checkbox  } from 'antd';

import { ProductsDto } from '../../types';
import { ProductsCrudEditForm, ProductsCrudCreateForm } from '../form/ProductsForm';


export const ProductsCrudList: React.FC = () => {
  const axios = axiosUtil();
  // const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<ProductsDto[]>([]);
  const [product, setProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    initialValues();
  }, []);

  const initialValues = async () => {
    try {
      console.log("loading...")
      const res = await axios.get(`/store/products/`);
      setData(res.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error[64239]:", error);
      const apiError: Error = error as Error;
      console.error("Error[64239]:", apiError);
    }
  }

  const columns: TableProps<ProductsDto>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Business Name',
      dataIndex: 'business_name',
      key: 'business_name',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Registration Name',
      dataIndex: 'registration_name',
      key: 'registration_name',
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      key: 'active',
      render : (value) => <Checkbox checked={value} disabled={true} >

    </Checkbox>
    },
    {
      title: 'Actions',
      key: 'actions',
      //@ts-ignore
      render: (_, record) => (
        <Button type="primary"
          //@ts-ignore
          onClick={(e) => {
            setProduct(record.id);
            setIsModalOpen(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Loading...</p>
  return (<div className='container'>
    <Button type="primary" onClick={() => setIsModalCreateOpen(true)}>
      Create
    </Button>
    <Modal title="Create" open={isModalCreateOpen}
      onOk={() => setIsModalCreateOpen(false)}
      onCancel={() => setIsModalCreateOpen(false)}
    >
      <ProductsCrudCreateForm />
    </Modal>
  
    <Table columns={columns} dataSource={data} />
    <Modal title="Edit" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <ProductsCrudEditForm id={product} />
    </Modal>
    {/* {contextHolder} */}
  </div>)
};
