import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, PageHeader, Input } from "antd";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";

const ExternalServicesList = () => {
  const navigate = useNavigate();

  
  return (
    <div>
            <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Non-Teaching Staff"
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

export default ExternalServicesList