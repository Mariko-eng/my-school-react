import { Breadcrumb } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  UserOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  UsergroupDeleteOutlined,
  WomanOutlined
} from "@ant-design/icons";

const Users = () => {
  return (
    <div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item key="home">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>ADMINS</span>
              <span><UserOutlined style={{color:"green"}}/></span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>TEACHERS</span>
              <span><UserSwitchOutlined style={{color:"green"}}/></span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>OTHER-STAFF</span>
              <span><UsergroupDeleteOutlined style={{color:"green"}}/></span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>STUDENTS</span>
              <span><TeamOutlined style={{color:"green"}}/></span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>PARENTS</span>
              <span><WomanOutlined style={{color:"green"}}/></span>
              </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Users;
