import React, { useState } from 'react'
import { DesktopOutlined } from '@ant-design/icons';
import { Menu, Avatar,Typography, Layout } from 'antd';
import logo from '../assets/images/logo.png';
import {Link} from 'react-router-dom';

const AppSideBar = () => {
const [collapsed, setCollapsed] = useState(false);
const { Sider } = Layout;

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    <div className="logo"
    style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      padding:"20px",
      width:"100%",
     }}
    >
    <Avatar src={logo} size="large" />
    </div>
    <div className="logo"
    style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      padding:"0 20px",
      width:"100%",
     }}
    >
      <Typography.Title level={5}
      style={{
        color:"white",
      }}
      >
        Welcome
      </Typography.Title>
    </div>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key={['1']} icon={<DesktopOutlined />}>
        <Link to="/home">Dashboard</Link>
        </Menu.Item>
        <Menu.SubMenu key={['2']}  icon={<DesktopOutlined/>} title="Administration">
        <Menu.Item key={['2a']}>
        <Link to="/home/admin/departments/">
          Departments
        </Link>
        </Menu.Item>
        <Menu.Item key={['2b']}>
        <Link to="/home/admin/roles/">
          Roles
        </Link>
        </Menu.Item>
        <Menu.Item key={['2c']}>
        <Link to="/home/admin/staff/">
          Staff
        </Link>
        </Menu.Item>
        <Menu.Item key={['2d']}>
        <Link to="/home/admin/services/">
          Services
        </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key={['3']}  icon={<DesktopOutlined/>} title="Store">
        <Menu.Item key={['3a']}>
        <Link to="/home/inventory">Current Stock</Link>
        </Menu.Item>
        <Menu.Item key={['3b']}>
        <Link to="/home/inventory/new">Stock In</Link>
        </Menu.Item>
        <Menu.Item key={['3c']}>
        <Link to="/home/inventory/out/">Stock Out</Link>
        </Menu.Item>
        <Menu.Item key={['3d']}>
        <Link to="/home/inventory/requests">Requests</Link>
        </Menu.Item>
        <Menu.Item key={['3f']}>
        <Link to="/home/inventory/products/">Products</Link>
        </Menu.Item>
        <Menu.Item key={['3g']}>
        <Link to="/home/inventory/records/">Records</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key={['4']} icon={<DesktopOutlined/>} title="Procurement">
      <Menu.Item key={['4c']}>
        <Link to="/home/procurement/new/">
        create order
        </Link>
        </Menu.Item>
        <Menu.Item key={['4b']}>
        <Link to="/home/procurement/">
        List Orders
        </Link>
        </Menu.Item>
        <Menu.Item key={['4a']}>
        <Link to="/home/procurement/">
        Incoming Requests
        </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key={['5']}  icon={<DesktopOutlined/>} title="Finance">
        <Menu.Item key={['5c']}>
            <Link to="/home/finance/receipts/">
              Make Payment
            </Link>
          </Menu.Item>
          <Menu.Item key={['5d']}>
             <Link to="/home/finance/invoices/">
              Request Payment 
            </Link>
          </Menu.Item>
          <Menu.Item key={['5e']}>
             <Link to="/home/finance/receipts/notifications">
              Notifications
            </Link>
          </Menu.Item>
          </Menu.SubMenu>
      <Menu.SubMenu key={['6']}  icon={<DesktopOutlined/>} title="Authentication">
      <Menu.SubMenu key={['6a']} icon={<DesktopOutlined/>} title="Users">
        <Menu.Item key={['6a1']}>
        <Link to="/home/auth/users/">
        List
        </Link>
        </Menu.Item>
        <Menu.Item key={['6a2']}>
        <Link to="/home/auth/users/new/">
        Add
        </Link>
        </Menu.Item>
      </Menu.SubMenu>
        <Menu.SubMenu key={['6b']} icon={<DesktopOutlined/>} title="Groups">
        <Menu.Item key={['6b1']}>
        <Link to="/home/auth/groups/">
        List
        </Link>
        </Menu.Item>
        <Menu.Item key={['6b2']}>
        <Link to="/home/auth/groups/">
        Add
        </Link>
        </Menu.Item>
      </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.SubMenu key={['7']} icon={<DesktopOutlined/>} title="Activity Logs">
        <Menu.Item key={['7a']}>
        <Link to="/home/activity-logs/">
        List
        </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key={['8a']} icon={<DesktopOutlined/>} title="My Account">
        <Menu.Item key={['8b']}>
        <Link to="/home/user-profile/">
        Profile
        </Link>
        </Menu.Item>
        <Menu.Item key={['8c']}>
          Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Sider>
  )
}

export default AppSideBar