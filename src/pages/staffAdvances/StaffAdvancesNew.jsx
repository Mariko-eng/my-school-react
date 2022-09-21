import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Modal,
  Button,
  PageHeader,
  Card,
  Col,
  Row,
  DatePicker,
  Select,
  Radio,
  Drawer,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../utils/axios";

const StaffAdvancesNew = () => {
  const [staff, setStaff] = useState({});
  const [xStaff, setXStaff] = useState({ label: "", value: "" });

  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [terms, setTerms] = useState([]);
  const [xterm, setXTerm] = useState({ id: "" });
  const [month, setMonth] = useState(0);
  const [isIssued, setIsIssued] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);

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

  const [form] = Form.useForm();

  const onChangeDateMonth = (date, dateString) => {
    setMonth(date._d.getMonth() + 1);
  };

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  useEffect(() => {
    axiosInstance.get("http://127.0.0.1:8000/basic/terms/").then((res) => {
      setTerms(res.data);
    });
  }, []);

  const getStafftData = (val) => {
    const url = `http://localhost:8000/basic/staff-search/${val}/`;
    axiosInstance
      .get(url, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => Modal.error({ title: "Staff Search Failed" }));
  };

  const onFinish = (values) => {
    if (xterm.id === "") {
      return Modal.error({ title: "Select Term / Study Period" });
    }
    const advance_data = {
      staff_id: staff.id,
      reason: values.reason,
      requested_amount: Number(values.amount),
      repayment_period: Number(values.repayment_period),
      is_issued: isIssued,
      term_id: xterm.id,
      month: month,
    };
    console.log(advance_data);

    const url = "http://localhost:8000/finance/staff-monthly-advances/";
    axiosInstance
      .post(url, advance_data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        Modal.success({ title: response.statusText });
        setXTerm({ id: "" });
        setStaff({});
        return form.resetFields();
      })
      .catch((error) => {
        console.log(error);
        return Modal.error({
          title: "Advance Already Exists Or Service Not Currently Available",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    return Modal.error({ title: "Incomplete Data" });
  };

  return (
    <>
      <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Staff Advnaces"
          subTitle="New"
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
          ]}
        ></PageHeader>
      </div>
      <Form
        name="search"
        autoComplete="off"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          name="name"
          label="Search Staff"
          rules={[{ required: false }]}
        >
          <Input
            readOnly={true}
            prefix={<SearchOutlined />}
            onClick={showDrawer}
            placeholder="Enter Student Name OR Student ID"
          />
        </Form.Item>
      </Form>
      {staff.staff_id && (
        <div
          className="site-layout-content"
          style={{
            minHeight: "200px",
            padding: "24px",
            background: "#fff",
          }}
        >
          <Row>
            <Col span={8}>
              <Card title="Staff Details">
                <p>
                  First Name :
                  <span>
                    {staff.first_name} {staff.given_name}
                  </span>
                </p>
                <p>
                  First Name :<span>{staff.last_name}</span>
                </p>
                <p>
                  Staff ID :<span>{staff.staff_id}</span>
                </p>
              </Card>
            </Col>
            <Col span={16}>
              <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <div>
                  <Form.Item name="period" label="Term Of Study">
                    <Select
                      placeholder="select One"
                      onChange={(val) => {
                        let obj = terms.find((item) => item.id === val);
                        setXTerm(obj);
                      }}
                    >
                      {terms.map((item, index) => (
                        <Select.Option key={index} value={item.id}>
                          {item.name} - {item.academic_year}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="month"
                    label="Month"
                    rules={[{ required: true }]}
                  >
                    <DatePicker picker="month" onChange={onChangeDateMonth} />
                  </Form.Item>
                </div>
                <Form.Item
                  name="reason"
                  label="Advance Reason?"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Advance Name Or Description">
                    <Select.Option value="Emergency">Emergency</Select.Option>
                    <Select.Option value="o Fund A Goal">
                      To Fund A Goal
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="amount"
                  label="Amount"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Amount" type="number" />
                </Form.Item>
                <Form.Item
                  name="repayment_period"
                  label="Duration *(Months)"
                  initialValue={1}
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Repayment Period *(Months)"
                    type="number"
                  />
                </Form.Item>
                <Form.Item
                  name="isIssued"
                  label="Is Advance Issued?"
                  initialValue={isIssued}
                  rules={[{ required: true }]}
                  onChange={(val) => {
                    setIsIssued((preVal) => !preVal);
                  }}
                >
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Add Advance
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      )}
      <Drawer
        title="Student Search"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visibleDrawer}
        key={"right"}
      >
        <Row>
          <Col span={24}>
            <Card>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Form.Item>
                  Search By Name
                  <Input
                    prefix={<SearchOutlined />}
                    onChange={(val) => {
                      if (val.target.value.trim().length >= 1) {
                        getStafftData(val.target.value);
                      } else {
                        setSearchResults([]);
                      }
                    }}
                  />
                </Form.Item>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              style={{
                minHeight: "200px",
                overflow: "auto",
              }}
            >
              {searchResults.map((result, index) => {
                return (
                  <div
                    key={index}
                    style={{ paddingLeft: "10px", marginBottom: "10px" }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          {result.first_name} {result.given_name}{" "}
                          {result.last_name}
                        </div>
                        <div>(ID) {result.staff_id}</div>
                      </div>
                      <div
                        onClick={() => {
                          setStaff(result);
                          setSearchResults([]);
                        }}
                        style={{ color: "green", marginLeft: "20px" }}
                      >
                        Choose Staff
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default StaffAdvancesNew