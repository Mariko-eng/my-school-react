import React, { useEffect, useState } from "react";
import { Table, Space, Breadcrumb } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FileAddFilled } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";

const ClassesTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const location = useLocation();
  const { state } = location;
  const class_data = state;

  const navigate = useNavigate();

  const navigateToTeacherDetail = (detail) => {
    navigate("/home/staff/teachers-detail/", { state: detail });
  };

  useEffect(() => {
    const getStaff = () => {
      const url = `staff/teachers-per-class/${class_data.id}/`;
      axiosInstance
      .get(url).then((res) => {
        const { data } = res;
        setTeachers(data.teachers);
      });
    };
    getStaff();
  }, [class_data]);

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
      <div style={{ padding: "0px", height: "50px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>Teachers</Breadcrumb.Item>
          <Breadcrumb.Item>{class_data.name}</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/staff/teachers/register/" style={{ color: "blue" }}>
              Add <FileAddFilled />
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <p style={{ textAlign: "center", background: "cyan", height: "30px" }}>
          {class_data.name} Teachers
        </p>

        <Table
          columns={columns}
          dataSource={teachers}
          scroll={{
            x: 1000,
          }}
        />
      </div>
    </>
  );
};

export default ClassesTeachers