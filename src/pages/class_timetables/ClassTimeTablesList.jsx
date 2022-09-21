import React from 'react'
import { Button, PageHeader, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";

const ClassTimeTablesList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
      <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Timetables"
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
              + New
            </Button>,
          ]}
        ></PageHeader>
      </div>
    </div>
  )
}

export default ClassTimeTablesList