import { Breadcrumb } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Students = () => {
  return (
    <div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item key="home1">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>STUDENTS</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home2">
            <Link to="parents">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>PARENTS</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home3">
            <Link to="roles">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>STUDENT-ROLES</span>
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

export default Students