import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, PageHeader, Button, Space, Modal } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";
import AsyncSelect from "react-select/async";

const StudentFeesClassList = () => {
  const navigate = useNavigate();

  const [classfees, setClassFees] = useState([]);
  const [classData, setClassData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [xStudent, setXStudent] = useState({ label: "", value: "" });
  const [xclass, setXclass] = useState({ label: "", value: "" });

  useEffect(() => {
    axiosInstance
      .get("http://127.0.0.1:8000/finance/class-fees/")
      .then((res) => {
        setClassFees(res.data);
      });
  }, []);

  const loadOptionsStudents = async (inputValue, callback) => {
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

  const editProduct = (record) => {
    setVisible(true);
    setClassData(record);
  };

  const columns = [
    {
      title: "Class",
      key: "class_name",
      render: (_, record) => <div>{record.class_name}</div>,
    },
    {
      title: "Study Period",
      key: "term_name",
      render: (_, record) => <div>{record.term_name}</div>,
    },
    {
      title: "Academic Year",
      key: "term_year",
      render: (_, record) => <div>{record.term_year}</div>,
    },
    {
      title: "Start Date",
      key: "term_start_date",
      render: (_, record) => <div>{record.term_start_date}</div>,
    },
    {
      title: "End Date",
      key: "term_end_date",
      render: (_, record) => <div>{record.term_end_date}</div>,
    },
    {
      title: "Total Fees",
      key: "total_fees",
      render: (_, record) => <div>{record.total_fees} SHS</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div onClick={() => editProduct(record)} style={{ color: "blue" }}>
            Edit
          </div>
          <div onClick={() => editProduct(record)} style={{ color: "red" }}>
            Delete
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
            title="Class Fees"
            subTitle="List"
            extra={[
            <div style={{ width: "200px" }}>
              <AsyncSelect
                placeholder="Select Class"
                defaultOptions
                cacheOptions
                loadOptions={loadOptionsClasses}
                onChange={(opt, meta) => {
                  console.log(opt, meta);
                  return setXStudent(opt);
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
            dataSource={classfees}
            scroll={{
              x: 500,
            }}
          />
        </div>
      </div>
      {visible && (
        <Modal
          title={classData.class_name}
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
          okText="OK"
        >
          <p>Fees</p>
          {classData.fees.map((item, index) => (
            <p key={index}>
              <span>{item.name}</span> <span>{item.amount}</span>
            </p>
          ))}
          <br />
          <p>
            <span>Total</span> <span>{classData.total_fees}</span>SHS
          </p>
        </Modal>
      )}
    </>
  );
};

export default StudentFeesClassList;
