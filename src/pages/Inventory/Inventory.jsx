import { Breadcrumb } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Inventory = () => {
  return (
    <div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item key="home1">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>STATIONERY</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home2">
            <Link to="parents">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>KITCHEN</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home3">
            <Link to="roles">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>MEDICATION</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home3">
            <Link to="roles">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>SANITATION</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home3">
            <Link to="roles">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>CO CURRICULAR</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="home3">
            <Link to="roles">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>MISCELLANEOUS</span>
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

export default Inventory