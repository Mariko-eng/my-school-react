import { Breadcrumb } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const StaffSalary = () => {
  return (
    <div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item key="home1">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>BASIC</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home2">
            <Link to="payment">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>PAYMENTS</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home3">
            <Link to="registered">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>REGISTERED SALARIES</span>
              </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default StaffSalary