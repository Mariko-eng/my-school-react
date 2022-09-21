import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Space, Button, PageHeader, Input } from "antd";
import axiosInstance from "../../utils/axios";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";

const TeachersList = () => {
  const [staff, setStaff] = useState([]);
  const [xStaff, setXStaff] = useState({ label: "", value: "" });
  const [xclass, setXclass] = useState({ label: "", value: "" });

  const navigate = useNavigate();

  const navigateToTeacherDetail = (detail) => {
    navigate("/home/staff/teachers-detail/", { state: detail });
  };

  const loadOptionsTeachers = async (inputValue, callback) => {
    // perform a request
    const requestResults = await axiosInstance.get(
      `students/search/${inputValue}/`
    );

    const { data } = requestResults;
    const options = [];
    data.forEach((item) => {
      options.push({
        label: item.last_name + " " + item.first_name,
        value: item.id,
      });
      // console.log(item)
    });

    // return requestResults
    return options;
  };

  const loadOptionsClasses = async (inputValue, callback) => {
    // perform a request
    const requestResults = await axiosInstance.get("basic/classes/");

    const { data } = requestResults;
    const options = [];
    data.forEach((item) => {
      options.push({ label: item.name, value: item.id });
      // console.log(item)
    });

    // return requestResults
    return options;
  };

  const getStaff = () => {
    const url = "staff/teaching-staff/";
    axiosInstance.get(url).then((res) => {
      const { data } = res;
      setStaff(data);
    });
  };
  useEffect(() => {
    getStaff();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "staff_id",
      key: "staff_id",
      render: (text) => <Link to="">{text}</Link>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (_, record) => (
        <div>
          {record.first_name} {record.given_name}
        </div>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
    },

    {
      title: "Religion",
      key: "religion",
      dataIndex: "religion",
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
            onClick={() => {
              navigateToTeacherDetail(record);
            }}
            style={{ color: "red" }}
          >
            Edit
          </div>
        </Space>
      ),
    },
  ];
  return (
    <>
    <div>
      <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Teachers"
          subTitle="List"
          extra={[
          <div style={{ width: "250px" }}>
              <AsyncSelect
                placeholder="Select Teacher"
                defaultOptions
                cacheOptions
                loadOptions={loadOptionsTeachers}
                onChange={(opt, meta) => {
                  console.log(opt, meta);
                  return setXStaff(opt);
                }}
              />
            </div>,
            <div style={{ width: "200px" }}>
              <AsyncSelect
                placeholder="Select Class"
                defaultOptions
                cacheOptions
                loadOptions={loadOptionsClasses}
                onChange={(opt, meta) => {
                  console.log(opt, meta);
                  return setXStaff(opt);
                }}
              />
            </div>,       
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
          dataSource={staff}
          scroll={{
            x: 1000,
          }}
        />
      </div>
    </>
  );
};


export default TeachersList