import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, PageHeader } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../utils/axios";

const StaffAdvancesList = () => {
  const [advances, setAdvaances] = useState([]);
  const [xAdvance, setxAdvance] = useState([]);
  const [visible, setVisible] = useState(false);
  const [xStaff, setXStaff] = useState({ label: "", value: "" });

  const navigate = useNavigate();

  const getAdvances = () => {
    axiosInstance
      .get("http://localhost:8000/finance/staff-monthly-advances/list/")
      .then((res) => {
        // console.log(res.data)
        setAdvaances(res.data);
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
    getAdvances();
  }, []);

  const editProduct = (record) => {
    setVisible(true);
    setxAdvance(record);
  };

  const handleCancel = () => {
    setVisible(false);
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
      title: "Amount",
      key: "amount",
      render: (_, record) => <div>{record.requested_amount} SHS</div>,
    },
    {
      title: "Repayment Period",
      key: "repayment_period",
      render: (_, record) => <div>{record.repayment_period} (Months)</div>,
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => <div>{record.status}</div>,
    },
    {
      title: "Date",
      key: "created",
      render: (_, record) => (
        <div>{moment(record.created).format("MMMM Do YYYY, h:mm:ss a")}</div>
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
            title="Staff Advances"
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
            dataSource={advances}
            scroll={{
              x: 1000,
            }}
          />
        </div>
      </div>
      {visible && (
        <Modal
          key={xAdvance.key}
          title={xAdvance.reason}
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
          <p>Amount</p>
          <p>{xAdvance.requested_amount} SHS</p>
          <p>Repayment Period</p>
          <p>{xAdvance.repayment_period} (Months)</p>
          <p>Status</p>
          <p>{xAdvance.status}</p>
        </Modal>
      )}
    </>
  );
};

export default StaffAdvancesList;
