import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button } from "antd";
import { AppBreadcrumb } from "../../../components";

const AllowancesStaffList = () => {
  const [allowances, setAllowances] = useState([]);
  const [xAllowance, setxAllowance] = useState([]);
  const [visible, setVisible] = useState(false);

  const getAllowances = () => {
    axios
    .get("http://localhost:8000/finance/staff-monthly-allowances/list/")
    .then((res) => {
      console.log(res.data)
      setAllowances(res.data);
    });
  }

  useEffect(() => {
    getAllowances()
  }, []);

  const editProduct = (record) => {
    setVisible(true);
    setxAllowance(record);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = (record) => {
    setVisible(false);
    // axios
    // .delete(`http://localhost:8000/finance/monthly-allowances-crud/${record.key}/`)
    // .then((res) => {
    //   // console.log(res.data);
    //   getAllowances()
    // });
  };

  const columns = [
    {
      title: "First Name",
      key: "fname",
      render: (_, record) => <div>{record.staff.first_name} {record.staff.given_name}</div>,
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
      render: (_, record) => 
          <div key={record} onClick={() => editProduct(record)} style={{ color: "blue" }}>
            View
          </div>
    },
  ];

  return (
    <>
      <div>
        <AppBreadcrumb title="Staff Allowances" action1="All" />
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Table columns={columns} dataSource={allowances} />
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
          {xAllowance.monthly_allowances.map((item,index) => <div 
            key={index}>
            <p>{item.name}</p>
            <p>{item.amount} SHS</p>
          </div>) }
        </Modal>
      )}
    </>
  );
};

export default AllowancesStaffList