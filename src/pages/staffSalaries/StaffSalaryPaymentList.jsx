import axiosInstance from "../../utils/axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, PageHeader } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";

const StaffSalaryPaymentList = () => {
  const [salaries, setSalaries] = useState([]);
  const [xStaff, setXStaff] = useState({ label: "", value: "" });

  const getSalaries = () => {
    axiosInstance
      .get("http://127.0.0.1:8000/finance/staff-salary-payment/list/")
      .then((res) => {
        console.log(res.data);
        setSalaries(res.data);
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
    getSalaries();
  }, []);

  const navigate = useNavigate();

  const navigateToSalaryDetail = (record) => {
    navigate("/home/finance/staff-salary/detail", { state: record });
  };

  const editProduct = (record) => {
    navigateToSalaryDetail(record);
  };

  const columns = [
    {
      title: "Staff ID",
      key: "staff_id",
      render: (_, record) => <div>{record.staff.staff_id}</div>,
    },
    {
      title: "First Name",
      key: "fname",
      render: (_, record) => (
        <div>
          {record.staff.first_name} {record.staff.given_name}
        </div>
      ),
    },
    {
      title: "Last Name",
      key: "lname",
      render: (_, record) => <div>{record.staff.last_name}</div>,
    },
    {
      title: "Study Period",
      key: "period",
      render: (_, record) => (
        <div>
          {record.period.term.name} {record.period.term.academic_year}
        </div>
      ),
    },
    {
      title: "Month",
      key: "month",
      render: (_, record) => <div>{record.period.month}</div>,
    },
    {
      title: "Basic Psy",
      key: "basic_amount",
      render: (_, record) => (
        <div>{Number(record.basic_amount).toLocaleString()} SHS</div>
      ),
    },
    {
      title: "Net Pay",
      key: "total",
      render: (_, record) => (
        <div>{record.net_salary.toLocaleString()} SHS</div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => <div>{record.status}</div>,
    },
    {
      title: "Date",
      key: "date",
      render: (_, record) => (
        <div>{moment(record.created).format("MMMM Do YYYY, h:mm:ss a")}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <div
            onClick={() => editProduct(record)}
            style={{ fontSize: "12px", color: "green", cursor: "pointer" }}
          >
            APPROVE
          </div>
          <div
            onClick={() => editProduct(record)}
            style={{ fontSize: "12px", color: "blue", cursor: "pointer" }}
          >
            VIEW
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
            title="Payments"
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
              <Button key="1" type="primary">
                <Link to="new">+ New</Link>
              </Button>,
            ]}
          ></PageHeader>
        </div>{" "}
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Table
            columns={columns}
            dataSource={salaries}
            scroll={{
              x: 1000,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default StaffSalaryPaymentList;
