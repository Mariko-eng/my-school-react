import axiosInstance from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, PageHeader } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";

const StaffSalaryRegisteredList = () => {
  const [salaries, setSalaries] = useState([]);
  const [xStaff, setXStaff] = useState({ label: "", value: "" });

  const getSalaries = () => {
    axiosInstance
      .get("http://127.0.0.1:8000/finance/staff-salary-overall/list/")
      .then((res) => {
        // console.log(res.data);
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
    navigate("/home/finance/staff-salary-overall/detail", { state: record });
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
      title: "Basic Amount",
      key: "basic_amount",
      render: (_, record) => (
        <div>{Number(record.basic_amount).toLocaleString()} SHS</div>
      ),
    },
    {
      title: "Nssf Percent",
      key: "nssf_percent",
      render: (_, record) => <div>{record.nssf_percentage} %</div>,
    },
    {
      title: "NSSF Amount",
      key: "nssf",
      render: (_, record) => (
        <div>{record.get_nssf_amount.toLocaleString()} SHS</div>
      ),
    },
    {
      title: "Allowances",
      key: "allowances",
      render: (_, record) => (
        <div>{record.staff_allowances_total.toLocaleString()} SHS</div>
      ),
    },
    {
      title: "Advances",
      key: "advance",
      render: (_, record) => (
        <div>{record.get_total_running_advances.toLocaleString()} SHS</div>
      ),
    },
    {
      title: "Net Pay",
      key: "total",
      render: (_, record) => (
        <div style={{ color: "green" }}>
          {(
            Number(record.basic_amount) +
            record.staff_allowances_total -
            (record.get_nssf_amount + record.get_total_running_advances)
          ).toLocaleString()}{" "}
          SHS
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div
          onClick={() => editProduct(record)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          View Detail
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
            title="Registered Salaries (Monthly)"
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

export default StaffSalaryRegisteredList;
