import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import moment from "moment";
import { Table, PageHeader, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";

const StudentFeesPaymentList = () => {
  const [feesData, setFeesData] = useState([]);
  const [xStudent, setXStudent] = useState({ label: "", value: "" });
  const [xclass, setXclass] = useState({ label: "", value: "" });
  // const [feeData , setfeeData] = useState(null)
  // const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const navigateToPaymentDetail = (student) => {
    navigate("/home/finance/fees-term-payment-receipt", { state: student });
  };

  useEffect(() => {
    axiosInstance
      .get("http://127.0.0.1:8000/finance/fees-term-payment-list/")
      .then((res) => {
        setFeesData(res.data);
      });
  }, []);

  const editProduct = (record) => {
    // setVisible(true);
    // setfeeData(record);
  };

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

  const columns = [
    {
      title: "Student ID",
      key: "Student_id",
      width: "200px",
      render: (_, record) => <div>{record.student.student_id}</div>,
    },
    {
      title: "Student",
      key: "Student",
      render: (_, record) => <div>{record.student.first_name}</div>,
    },
    {
      title: "Class",
      key: "class",
      width: "200px",
      render: (_, record) => <div>{record.class_name}</div>,
    },
    {
      title: "Study Period",
      key: "term_name",
      render: (_, record) => <div>{record.term.name}</div>,
    },
    {
      title: "Academic Year",
      key: "term_year",
      render: (_, record) => <div>{record.term.academic_year}</div>,
    },
    {
      title: "Term Fees",
      key: "term_class_fees_total",
      width: "200px",
      render: (_, record) => <div>{record.term_class_fees_total} SHS</div>,
    },
    {
      title: "Amount Paid",
      key: "amount_paid",
      width: "200px",
      render: (_, record) => <div>{record.amount_paid} SHS</div>,
    },
    {
      title: "Balance",
      key: "balance",
      width: "200px",
      render: (_, record) => (
        <div>{record.term_class_fees_total - record.amount_paid} SHS</div>
      ),
    },
    {
      title: "Date",
      key: "created",
      render: (_, record) => {
        return (
          <div>{moment(record.created).format("MMMM Do YYYY, h:mm:ss a")}</div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <div
            onClick={() => navigateToPaymentDetail(record)}
            style={{ color: "blue" }}
          >
            Generate Receipt
          </div>
          <div onClick={() => editProduct(record)} style={{ color: "red" }}>
            Delete Record
          </div>
        </div>
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
            title="Fees Payment"
            subTitle="List"
            extra={[
              <div style={{ width: "250px" }}>
              <AsyncSelect
                placeholder="Select Student"
                defaultOptions
                cacheOptions
                loadOptions={loadOptionsStudents}
                onChange={(opt, meta) => {
                  console.log(opt, meta);
                  return setXStudent(opt);
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
            dataSource={feesData}
            scroll={{
              x: 1000,
            }}
          />
        </div>
      </div>
      {/* { visible &&
         <Modal 
            title= {classData.class_name} 
            visible={visible} 
            onCancel={() => setVisible(false)} 
            onOk={() => setVisible(false)} 
            okText="OK" 
            >
              <p>Fees</p>
              {classData.fees.map((item,index) => 
              <p key={index}><span>{item.name}</span> <span>{item.amount}</span></p>)}
              <br/>
              <p><span>Total</span> <span>{classData.total_fees}</span>SHS</p>
          </Modal>
          } */}
    </>
  );
};

export default StudentFeesPaymentList;
