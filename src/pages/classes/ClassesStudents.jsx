import React, { useEffect, useState } from "react";
import { Table, Space, Breadcrumb } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FileAddFilled } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";

const ClassesStudents = () => {
  const [students, setStudents] = useState([]);
  const location = useLocation();
  const { state } = location;
  const class_data = state;

  const navigate = useNavigate();

  const navigateToStudentDetail = (detail,type) => {
    navigate("/home/students-detail/", { state: {detail:detail,type: type}});
  };


  useEffect(() => {
    const getStudents = () => {
        const url = `students/per-class/${class_data.id}/`;
        axiosInstance
        .get(url).then((res) => {
          const { data } = res;
        //   console.log(data)
          setStudents(data.students);
        });
      };
    getStudents();
  }, [class_data]);

  const columns = [
    {
      title: "ID",
      dataIndex: "student_id",
      key: "student_id",
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div
            onClick={() => {
              navigateToStudentDetail(record,"view");
            }}
            style={{ color: "blue" }}
          >
            View
          </div>
          <div
            onClick={() => {
              navigateToStudentDetail(record,"edit");
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
          <Breadcrumb.Item>STUDENTS</Breadcrumb.Item>
          <Breadcrumb.Item>{class_data.name}</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/students/register/" style={{ color: "blue" }}>
              Add <FileAddFilled />
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div
        style={{
          marginTop: "20px",
        }}>
            <p style={{textAlign:"center", background:"cyan",height:"30px"}} >{class_data.name} Students</p>
        <Table columns={columns} dataSource={students} />
      </div>
    </>
  );
};

export default ClassesStudents