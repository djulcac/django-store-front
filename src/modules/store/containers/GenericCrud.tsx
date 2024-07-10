import React from 'react';
import axiosUtil from '@/utils/axiosUtil';

import { Table } from 'antd';
import type { TableProps } from 'antd';

import { useState, useEffect } from 'react';
import { Button, Modal, Checkbox } from 'antd';
import { GenericField } from '../types';

import { GenericCrudCreateForm, GenericCrudEditForm } from '../components/form/GenericCrudForm';
import './GenericCrud.css';

interface Props {
  fields: GenericField[];
  endpoint: string;
}

export const GenericCrud: React.FC<Props> = (props) => {
  const axios = axiosUtil();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [currentID, setCurrentID] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    initialValues();
  }, []);

  const initialValues = async () => {
    try {
      console.log("loading...")
      const res = await axios.get(props.endpoint);
      setData(res.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error[64239]:", error);
      const apiError: Error = error as Error;
      console.error("Error[64239]:", apiError);
    }
  }

  const columns: TableProps<any>['columns'] = props.fields.map(item => {
    if (item.type === 'boolean')
      return {
        title: item.label,
        dataIndex: item.name,
        key: item.name,
        render : (value) => <Checkbox checked={value} disabled={true} ></Checkbox>
      }
    return {
      title: item.label,
      dataIndex: item.name,
      key: item.name,
    }
  });
  columns.push({
    title: 'Actions',
    key: 'actions',
    //@ts-ignore
    render: (_, record) => (
      <Button type="primary"
        //@ts-ignore
        onClick={(e) => {
          setCurrentID(record.id);
          setIsModalEditOpen(true);
        }}
      >
        Edit
      </Button>
  )}

  )

  if (isLoading) return <p>Loading...</p>
  return (<div className='GenericCrud'>
    <Button type="primary" onClick={() => setIsModalCreateOpen(true)}>
      Create
    </Button>
    <Modal title="Create" open={isModalCreateOpen}
      onOk={() => setIsModalCreateOpen(false)}
      onCancel={() => setIsModalCreateOpen(false)}
    >
      <GenericCrudCreateForm
        fields={props.fields} endpoint={props.endpoint}
      />
    </Modal>
  
    <Table columns={columns} dataSource={data} />
    <Modal title="Edit1" open={isModalEditOpen}
      onOk={() => setIsModalEditOpen(false)}
      onCancel={() => setIsModalEditOpen(false)}
    >
      <GenericCrudEditForm
        fields={props.fields} endpoint={props.endpoint}
        id={currentID}
      />
    </Modal>
    {/* {contextHolder} */}
  </div>)
};
