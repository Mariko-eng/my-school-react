import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, PageHeader } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../utils/axios";

const StaffAllowancesItemsList = () => {
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
      .get("http://localhost:8000/finance/monthly-allowances/")
      .then((res) => {
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

  const handleDelete = (record) => {
    setVisible(false);
    axiosInstance
      .delete(
        `http://localhost:8000/finance/monthly-allowances-crud/${record.key}/`
      )
      .then((res) => {
        // console.log(res.data);
        getAllowances();
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
      render: (_, record) => (
        <div
          key={record}
          onClick={() => editProduct(record)}
          style={{ color: "blue" }}
        >
          Edit
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
          title="Allowance Items"
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
            <Button
              key="del"
              style={{ color: "red" }}
              onClick={() => handleDelete(xAllowance)}
            >
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

export default StaffAllowancesItemsList