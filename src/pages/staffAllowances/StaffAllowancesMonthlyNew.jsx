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
  Select,
  Drawer,
  Radio,
  DatePicker,
} from "antd";
import { SearchOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../utils/axios";

const StaffAllowancesMonthlyNew = () => {
  const [staff, setStaff] = useState({});
  const [xStaff, setXStaff] = useState({ label: "", value: "" });
  const [terms, setTerms] = useState([]);
  const [month, setMonth] = useState(0);
  const [xterm, setXTerm] = useState({ id: "" });
  const [paymentMode, setPaymentMode] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [xAllowances, setXAllowances] = useState([]);
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

  const navigate = useNavigate();

  const navigateToAllowanceDetail = (staff, record) => {
    navigate("/home/finance/staff-allowances/detail", {
      state: { staff, record },
    });
  };

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const onChangeDateMonth = (date, dateString) => {
    setMonth(date._d.getMonth() + 1);
  };

  useEffect(() => {
    axiosInstance.get("http://127.0.0.1:8000/basic/terms/").then((res) => {
      setTerms(res.data);
    });
  }, []);

  const getAllowances = () => {
    axiosInstance
      .get("http://localhost:8000/finance/staff-allowance-list/")
      .then((res) => {
        setAllowances(res.data);
      });
  };

  useEffect(() => {
    getAllowances();
  }, []);

  const getStaffData = (val) => {
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
    if (xAllowances.length === 0) {
      return Modal.error({ title: "Select At-Least One Allowance" });
    }
    let url;
    let allowance_data;

    if (paymentMode === "") {
      return Modal.error({ title: "Choose Payment Mode" });
    }

    if (paymentMode === "contract") {
      url = "http://localhost:8000/finance/staff-mandatory-allowance-add/";
      allowance_data = {
        staff_id: staff.id,
        allowances: xAllowances,
      };
    } else if (paymentMode === "month") {
      if(xterm.id ===""){
        return Modal.error({ title: "Select Study Period" });
      }
      url = "http://localhost:8000/finance/staff-optional-allowance-add/";
      allowance_data = {
        staff_id: staff.id,
        allowances: xAllowances,
        term_id: xterm.id,
        month: month,
      };
    } else {
      if(xterm.id ===""){
        return Modal.error({ title: "Select Study Period" });
      }
      url = "http://localhost:8000/finance/staff-random-allowance-add/";
      allowance_data = {
        staff_id: staff.id,
        allowances: xAllowances,
        term_id: xterm.id,
        month: month,
      };
    }

    console.log(allowance_data);

    axiosInstance
      .post(url, allowance_data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setStaff({})
        Modal.success({ title: response.statusText });
        return navigateToAllowanceDetail(staff, response.data);
      })
      .catch((error) => {
        console.log(error);
        return Modal.error({
          title: "Allowance Already Added To Staff Or Service Not Currently Available",
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
            placeholder="Enter Staff Name OR Staff ID"
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
                <Form.Item
                  label="Select Allowance"
                  rules={[{ required: false }]}
                >
                  <Select
                    mode="multiple"
                    placeholder="select One Or More"
                    onChange={(val) => {
                      let objs = [];
                      val.forEach((id) => {
                        let obj = allowances.find((item) => item.id === id);
                        objs.push(obj);
                      });
                      setXAllowances(objs);
                    }}
                  >
                    {allowances.map((item, index) => (
                      <Select.Option key={index} value={item.id}>
                        {item.name} - ({item.amount})
                      </Select.Option>
                    ))}
                  </Select>
                  <div style={{ color: "blue" }}>
                    <Link
                      to="/home/finance/allowances/new"
                      style={{ color: "blue" }}
                    >
                      Add Allowance
                    </Link>
                    <span style={{ marginLeft: "5px", color: "green" }}>
                      <FolderAddOutlined />
                    </span>
                  </div>
                </Form.Item>
                <Form.Item
                  name="payment_mode"
                  label="Select Payment Mode"
                  initialValue={paymentMode}
                  rules={[{ required: true }]}
                  onChange={(e) => {
                    setPaymentMode((preVal) => e.target.value);
                  }}
                >
                  <Radio.Group>
                    <Radio value="contract">Long-Term Contract</Radio>
                    <Radio value="month">End Of Month</Radio>
                    <Radio value="instant">Instant Pay</Radio>
                  </Radio.Group>
                </Form.Item>
                { (paymentMode === "month" ||
                  paymentMode === "instant") && (
                    <div>
                      <Form.Item name="period" label="Study Period">
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
                  )}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Assign Allowance To Staff
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      )}
      <Drawer
        title="Staff Search"
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
                        getStaffData(val.target.value);
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

export default StaffAllowancesMonthlyNew