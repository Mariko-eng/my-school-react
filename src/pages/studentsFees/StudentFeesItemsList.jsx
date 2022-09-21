import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, PageHeader, Button, Input, Space, Modal } from "antd";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";

const StudentFeesItemsList = () => {
  const navigate = useNavigate();

  return (
    <div>
        <div>
          <PageHeader
            ghost={false}
            onBack={() => navigate(-1)}
            title="School Structure Items"
            subTitle="List"
            extra={[
              <Input
                key="3"
                size="small"
                placeholder="search"
                prefix={<SearchOutlined />}
              />,
              <PrinterOutlined key="2" color="blue" />,
              <Button key="1" type="primary">
                <Link to="new">+ New</Link>
              </Button>,
            ]}
          ></PageHeader>
        </div>
    </div>
  )
}

export default StudentFeesItemsList