import React, { useState, useEffect } from 'react'
import { Button, PageHeader, Input,Space,Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";
import axiosInstance from '../../utils/axios';

const TermSchedulesList = () => {
  const [terms, setTerms] = useState([]);

  const navigate = useNavigate();

  useEffect(() =>{
    axiosInstance.get('basic/terms/').then(response =>{
      // console.log(response)
      return setTerms(response.data)
    })
  },[])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Year",
      dataIndex: "academic_year",
      key: "academic_year",
      render: (_, record) => (
        <div>
          {record.academic_year}
        </div>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to="" style={{ color: "blue" }}>
            View
          </Link>
          <div
            style={{ color: "red" }}
          >
            Edit
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div>
          <div>
      <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Schedules"
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
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Table
          columns={columns}
          dataSource={terms}
          scroll={{
            x: 1000,
          }}
        />
      </div>
    </div>
  )
}

export default TermSchedulesList