import { Breadcrumb } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const OtherExpenses = () => {
  return (
    <div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item key="home1">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>CHURCH DONATIONS</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home2">
            <Link to="parents">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>EXTERNAL SERVICES</span>
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

export default OtherExpenses