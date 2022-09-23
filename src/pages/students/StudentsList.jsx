import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { Table, Space, Button, PageHeader, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [xStudent, setXStudent] = useState({ label: "", value: "" });
  const [xclass, setXclass] = useState({ label: "", value: "" });

  const navigate = useNavigate();

  const navigateToStudentDetail = (detail) => {
    navigate("/home/students-detail/", { state: detail });
  };

  // const loadOptionsStudents = async (inputValue, callback) => {
  //   // perform a request
  //   const requestResults = await axiosInstance.get(
  //     `students/search/${inputValue}/`
  //   );

  //   const { data } = requestResults;
  //   const options = [];
  //   data.forEach((item) => {
  //     options.push({
  //       label: item.last_name + " " + item.first_name,
  //       value: item.id,
  //     });
  //     // console.log(item)
  //   });
  //   setStudents(data)
  //   // return requestResults
  //   return options;
  // };

  const loadOptionsClasses = async (inputValue, callback) => {
    // perform a request
    const requestResults = await axiosInstance.get("basic/classes/");

    const { data } = requestResults;
    // console.log(data)
    const options = [];
    data.forEach((item) => {
      options.push({ key: item.id, label: item.name, value: item.id });
    });
    return options;
  };

  const getStudentsSample = () => {
    const url = "students/sample/";
    axiosInstance.get(url).then((res) => {
      const { data } = res;
      setStudents(data);
    });
  };

  const searchForStudent = async (val) => {
    if (val.trim().length !== 0) {
    const requestResults = await axiosInstance.get(`students/search/${val}/`);
    const { data } = requestResults;
    setStudents(data);
  }else{
    getStudentsSample()
  }
  };

  const getStudentsForEachclass = (value) => {
      const url = `students/search-by-class/${value}/`;
      axiosInstance.get(url).then((res) => {
        const { data } = res;
        setStudents(data);
      });
  };

  useEffect(() => {
    getStudentsSample();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "student_id",
      key: "student_id",
      render: (text) => <Link to="">{text}</Link>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Class",
      dataIndex: "student_class",
      key: "student_class",
      render: (_, record) => <div>{record.student_class.name}</div>,
    },
    {
      title: "Student Names",
      dataIndex: "first_name",
      key: "first_name",
      render: (_, record) => (
        <div>
          {record.last_name} {record.first_name} {record.given_name}
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
        <Space key="record" size="middle">
          <div
            key="1"
            onClick={() => {
              navigateToStudentDetail(record, "view");
            }}
            style={{ color: "blue" }}
          >
            View
          </div>
          <div
            key="2"
            onClick={() => {
              navigateToStudentDetail(record, "edit");
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
          title="Students"
          subTitle="List"
          extra={[
            // <div key ="studnets" style={{ width: "250px" }}>
            //   <AsyncSelect
            //     placeholder="Select Student"
            //     // defaultOptions
            //     cacheOptions
            //     loadOptions={loadOptionsStudents}
            //     onChange={(opt, meta) => {
            //       console.log(opt, meta);
            //       return setXStudent(opt);
            //     }}
            //   />
            // </div>,
            <Input
              key="3"
              size="small"
              placeholder="search"
              prefix={<SearchOutlined />}
              onChange={(e) => searchForStudent(e.target.value)}
            />,
            <div key="classes" style={{ width: "200px" }}>
              <AsyncSelect
                placeholder="Select Class"
                defaultOptions
                cacheOptions
                loadOptions={loadOptionsClasses}
                onChange={(opt, meta) => {
                  // console.log(opt, meta);
                  setXclass(opt);
                  return getStudentsForEachclass(opt.label);
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
          dataSource={students}
          scroll={{
            x: 1000,
          }}
        />
      </div>
    </>
  );
};

export default StudentsList;
