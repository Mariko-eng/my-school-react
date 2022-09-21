import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, Breadcrumb } from "antd";
import { FileAddFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ExpenditureList = () => {
  const [expenses, setExpenses] = useState([]);
  const [xExpense, setXExpense] = useState([]);
  const [visible, setVisible] = useState(false);

  const getAdvances = () => {
    axios
    .get("http://127.0.0.1:8000/finance/expenditure-items/")
    .then((res) => {
      // console.log(res.data)
      setExpenses(res.data);
    });
  }

  useEffect(() => {
    getAdvances()
  }, []);

  const editProduct = (record) => {
    setVisible(true);
    setXExpense(record);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "Item",
      key: "item",
      fixed: 'left',
      width: 100,
      render: (_, record) => <div>{record.item}</div>,
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => <div>{record.category}</div>,
    },
    {
      title: "Term",
      key: "term",
      render: (_, record) => <div>{record.term_name}</div>,
    },
    {
      title: "Year",
      key: "year",
      render: (_, record) => <div>{record.term_year}</div>,
    },
    {
      title: "Measure",
      key: "measure",
      render: (_, record) => <div>{record.measure}</div>,
    },
    {
      title: "Units",
      key: "units",
      render: (_, record) => <div>{record.units}</div>,
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_, record) => <div>{record.quantity}</div>,
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => <div>{record.price} SHS</div>,
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => <div>{record.total} SHS</div>,
    },
    {
      title: "Status",
      key: "is_approved",
      render: (_, record) => <div>{record.is_approved ?
        <div style={{color:"green"}}>Approved</div> :
        <div style={{color:"blue"}}>Pending</div>}
        </div>,
    },
    {
      title: "Action",
      key: "action",
      fixed: 'right',
      width: 100,
      render: (_, record) =>
      <div>
          <div onClick={() => editProduct(record)} style={{ color: "green" }}>
            Update
          </div>
          <div onClick={() => editProduct(record)} style={{ color: "blue" }}>
            View
          </div>
      </div> 
    },
  ];

  return (
    <>
    <div style={{ padding: "0px", height: "50px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>Expenditures</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/finance/expenditure/new/" style={{ color: "blue" }}>
              Add <FileAddFilled />
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Table columns={columns} dataSource={expenses}
              scroll={{
                x: 1300,
              }}
          />
        </div>
      {visible && (
        <Modal
          key={xExpense.key}
          title={xExpense.name}
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
          <p>Category</p>
          <p>{xExpense.category}</p>
          <p>Study Period</p>
          <p>{xExpense.term_name} {xExpense.term_year}</p>
          <p>Measure</p>
          <p>{xExpense.measure}</p>
          <p>Quantity</p>
          <p>{xExpense.quantity}</p>
          <p>Units</p>
          <p>{xExpense.units}</p>
          <p>Price</p>
          <p>{xExpense.price}</p>
          <p>Total</p>
          <p>{xExpense.total}</p>
          <p>Is Approved</p>
          <p>{xExpense.is_approved}</p>
        </Modal>
      )}
    </>
  );
};

export default ExpenditureList