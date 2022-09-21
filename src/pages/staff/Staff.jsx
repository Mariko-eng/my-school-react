import { Breadcrumb } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Staff = () => {
  return (
    <div>
      <div>
        <Breadcrumb>
        <Breadcrumb.Item key="home1">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>NON-TEACHING STAFF</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home2">
            <Link to="roles">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>NON-TEACHING STAFF ROLES</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home1">
            <Link to="all_staff">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>ALL STAFF</span>
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

export default Staff