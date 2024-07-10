import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/contexts/AuthStore';
import './HeaderLayout.css';

const { Header } = Layout;
import {
  AppstoreAddOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

export const HeaderUser: React.FC = () => {
  const navigate = useNavigate();
  const valueAuth = useAuthStore((s) => s.value)

  let items: MenuItem[] = []

  if (valueAuth.data?.isLogin){
    items = [
      getItem({label:'Manage', key:'/inventorysales/', icon:<AppstoreAddOutlined />, children:[
        getItem({label:'Companies', key:'/inventorysales/companies/', isLogin:true}),
        getItem({label:'Producs', key:'/inventorysales/products/', isLogin:true}),
        getItem({label:'Categories', key:'/inventorysales/categories/', isLogin:true}),
      ], isLogin:true}),
      getItem({label:'Logout', key:'/accounts/logout/', icon:<LogoutOutlined /> , isLogin:true}),
      null,
    ];
  } else {
    items = [
      getItem({label:'login', key:'/accounts/login/', icon:<LoginOutlined /> , isLogin:false}),
    ]
  }

  interface GetItemParams {
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    isLogin?: boolean,
  }

  function getItem(
      { label, key, icon, children, isLogin }: GetItemParams
  ): MenuItem {
    if (isLogin) {
      if (valueAuth.data?.isLogin === true) 
        return {
          key,
          icon,
          children,
          label,
        } as MenuItem;
      return null;
    }
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e, e.key);
    navigate(e.key)
  };

  return (
    <Header
      className='HeaderUser'
      style={{
        background: colorBgContainer,
      }}>
      <Menu
        mode="horizontal"
        items={items}
        style={{
          flex: 1,
          minWidth: 0
        }}
        onClick={onClick}
      />
    </Header>
  );
}
