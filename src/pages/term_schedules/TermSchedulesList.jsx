import React, { useState, useEffect } from "react";
import { Button, PageHeader, Input, Space, Table, Modal } from "antd";
import { Form, DatePicker, Radio, Select, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";
import moment from "moment";

const TermSchedulesList = () => {
  const [terms, setTerms] = useState([]);
  const [xTerm, setXTerm] = useState({});
  const [open, setOpen] = useState(false);
  const [termName, setTermName] = useState("");
  const [acYr, setAcYr] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const onFinish = () => {
    const term_data = {
      name: termName,
      start_date: startDate,
      end_date: endDate,
      academic_year: Number(acYr),
      is_approved: isApproved,
      status: isRunning ? "Running" : "Pending",
    };
    // console.log(xTerm.id)
    // console.log(term_data);
    setIsUpdating(true);
    const url = `basic/terms-update/${xTerm.id}/`;
    axiosInstance
      .patch(url, term_data)
      .then((response) => {
        Modal.success({ title: response.statusText });
        setIsUpdating(false);
        setOpen(false);
        getTerms();
      })
      .catch((error) => {
        console.log(error);
        return Modal.error({ title: "Failed To Update Term Data" });
      });
  };

  const onChangeDate = (date, dateStrings) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  const onChangeDate2 = (date, dateString) => {
    setAcYr(dateString);
  };

  const getTerms = () => {
    axiosInstance.get("basic/terms/").then((response) => {
      return setTerms(response.data);
    });
  };

  useEffect(() => {
    getTerms();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Year",
      dataIndex: "academic_year",
      key: "academic_year",
      render: (_, record) => <div>{record.academic_year}</div>,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Is Approved?",
      dataIndex: "is_approved",
      key: "is_approved",
      render: (_, record) => {
        return record.is_approved ? (
          <Tag color="green">Yes</Tag>
        ) : (
          <Tag color="red">No</Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return record.status === "Running" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">{record.status}</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div
            onClick={() => {
              setXTerm(record);
              setTermName(record.name);
              setStartDate(record.start_date);
              setEndDate(record.end_date);
              setAcYr(record.academic_year);
              setIsApproved(record.is_approved);
              record.status === "Running"
                ? setIsRunning(true)
                : setIsRunning(false);
              return setOpen(true);
            }}
            style={{ color: "red" }}
          >
            Edit
          </div>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Schedules (Periods Of Study)"
          subTitle="List"
          extra={[
            <Input
              key="3"
              size="small"
              placeholder="search"
              prefix={<SearchOutlined />}
            />,
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
          dataSource={terms}
          scroll={{
            x: 1000,
          }}
        />
      </div>
      <Modal
        title="Edit Term"
        visible={open}
        onCancel={() => setOpen(false)}
        // onOk = {}
        // confirmLoading = {}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Return
          </Button>,
          <Button
            key="delete"
            style={{ color: "red" }}
            // type="primary"
            // loading={loading}
            // onClick={handleOk}
          >
            Delete
          </Button>,
          <Button
            key="link"
            style={{ color: "green" }}
            loading={isUpdating}
            onClick={onFinish}
            // onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        <Form
          name="control-hooks"
          autoComplete="off"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item name="term" label="Select Term" initialValue={xTerm.name}>
            <Select
              placeholder="Select One"
              onChange={(val) => {
                setTermName(val);
              }}
            >
              <Select.Option value="First Term">First Term</Select.Option>
              <Select.Option value="Second Term">Second Term</Select.Option>
              <Select.Option value="Third Term">Third Term</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            //  name="start-end"
            label="Start - End"
          >
            <DatePicker.RangePicker
              defaultValue={[
                moment(xTerm.start_date, "YYYY-MM-DD"),
                moment(xTerm.end_date, "YYYY-MM-DD"),
              ]}
              format="YYYY-MM-DD"
              onChange={onChangeDate}
            />
          </Form.Item>
          <Form.Item
            // name="year"
            label="Academic Year"
            // rules={[{ required: true }]}
          >
            <DatePicker
              defaultValue={moment(String(acYr))}
              format="YYYY"
              picker="year"
              onChange={onChangeDate2}
            />
          </Form.Item>
          <Form.Item
            name="approval_status"
            label="Approval Status"
            initialValue={isApproved}
            onChange={(val) => {
              setIsApproved((preVal) => !preVal);
            }}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="status"
            label="Is Currently Active?"
            initialValue={isRunning}
            onChange={(val) => {
              setIsRunning((preVal) => !preVal);
            }}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TermSchedulesList;
