import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { Table, Modal, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";

const StaffAllowancesMonthlyList = () => {
  const [allowances, setAllowances] = useState([]);
  const [xAllowance, setxAllowance] = useState([]);
  const [visible, setVisible] = useState(false);
  const [xStaff, setXStaff] = useState({ label: "", value: "" });

  const navigate = useNavigate();

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

  const getAllowances = () => {
    axiosInstance
      .get("http://localhost:8000/finance/staff-monthly-allowances/list/")
      .then((res) => {
        // console.log(res.data)
        setAllowances(res.data);
      });
  };

  useEffect(() => {
    getAllowances();
  }, []);

  const editProduct = (record) => {
    setVisible(true);
    setxAllowance(record);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // const handleDelete = (record) => {
  //   setVisible(false);
  //   // axios
  //   // .delete(`http://localhost:8000/finance/monthly-allowances-crud/${record.key}/`)
  //   // .then((res) => {
  //   //   // console.log(res.data);
  //   //   getAllowances()
  //   // });
  // };

  const columns = [
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
      title: "Total Allowance",
      key: "total_allowance",
      render: (_, record) => <div>{record.get_total_allowances} SHS</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div
          key={record}
          onClick={() => editProduct(record)}
          style={{ color: "blue" }}
        >
          View
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
            title="Monthly Allowances"
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
        </div>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Table
            columns={columns}
            dataSource={allowances}
            scroll={{
              x: 1000,
            }}
          />
        </div>
      </div>
      {visible && (
        <Modal
          key={xAllowance.key}
          title={xAllowance.name}
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
          okText="OK"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="edit" type="primary" onClick={handleCancel}>
              Edit
            </Button>,
          ]}
        >
          {xAllowance.monthly_allowances.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>{item.amount} SHS</p>
            </div>
          ))}
        </Modal>
      )}
    </>
  );
};

export default StaffAllowancesMonthlyList;
