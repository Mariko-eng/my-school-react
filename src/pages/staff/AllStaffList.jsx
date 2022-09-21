import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { Table, Space, PageHeader,Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";

const AllStaffList = () => {
  const [staff, setStaff] = useState([]);
  const [xStaff, setXStaff] = useState({ label: "", value: "" });
  const navigate = useNavigate();

  const navigateToTeacherDetail = (detail) => {
    navigate("/home/staff/non-teaching-staff-detail/", { state: detail });
  };

  const getStaff = () => {
    const url = "http://127.0.0.1:8000/basic/staff/";
    axiosInstance.get(url).then((res) => {
      const { data } = res;
      setStaff(data);
    });
  };

  const loadOptionsStaff = async (inputValue, callback) => {
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
        <Space key={record.id} size="middle">
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
      <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="All Staff"
          subTitle="List"
          extra={[
          <div style={{ width: "250px" }}>
              <AsyncSelect
                placeholder="Select Staff"
                defaultOptions
                cacheOptions
                loadOptions={loadOptionsStaff}
                onChange={(opt, meta) => {
                  console.log(opt, meta);
                  return setXStaff(opt);
                }}
              />
            </div>,
            <PrinterOutlined key="2" color="blue" />,
          ]}
        ></PageHeader>
      </div>
        <br />{" "}
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Table columns={columns} dataSource={staff} />
        </div>
      </div>
    </>
  );
};

export default AllStaffList;
