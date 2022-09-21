import { Breadcrumb } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const ClassTimeTables = () => {
  return (
    <div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item key="home1">
            <Link to="">
              <span style={{color:"rgb(0, 21, 40)",fontSize:"15px"}}>CLASS TIMETABLES</span>
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

export default ClassTimeTables