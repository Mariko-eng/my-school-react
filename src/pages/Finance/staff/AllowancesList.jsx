import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button } from "antd";
import { AppBreadcrumb } from "../../../components";

const AllowancesList = () => {
  const [allowances, setAllowances] = useState([]);
  const [xAllowance, setxAllowance] = useState([]);
  const [visible, setVisible] = useState(false);

  const getAllowances = () => {
    axios
    .get("http://localhost:8000/finance/monthly-allowances/")
    .then((res) => {
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
    axios
    .delete(`http://localhost:8000/finance/monthly-allowances-crud/${record.key}/`)
    .then((res) => {
      // console.log(res.data);
      getAllowances()
    });
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => <div>{record.name}</div>,
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record) => <div>{record.amount} SHS</div>,
    },
    {
      title: "Status",
      dataIndex: "is_approved",
      key: "status",
      render: (_, record) => (
        <div> {record.is_approved ? <div>True</div> : <div>False</div>}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => 
          <div key={record} onClick={() => editProduct(record)} style={{ color: "blue" }}>
            Edit
          </div>
    },
  ];

  return (
    <>
      <div>
        <AppBreadcrumb title="Available Allowances" action1="All" />
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
            <Button key="del" style={{ color: "red" }} onClick={() => handleDelete(xAllowance)}>
              Delete
            </Button>,
          ]}
        >
          <p>Amount</p>
          <p>{xAllowance.amount} SHS</p>
        </Modal>
      )}
    </>
  );
};

export default AllowancesList;
