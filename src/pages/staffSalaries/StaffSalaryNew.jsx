import React, { useState } from "react";
import {
  Form,
  Input,
  Modal,
  Button,
  PageHeader,
  Card,
  Col,
  Row,
  Drawer,
} from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import axiosInstance from '../../utils/axios'
import AsyncSelect from "react-select/async";

const StaffSalaryNew = () => {
  const [nssfPercent, setNssfPercent] = useState(0);
  const [staff, setStaff] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState(0);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
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

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

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
    if (amount < 1000) {
      return Modal.error({ title: "Basic Amount Is Too Low " });
    }
    if (nssfPercent > 100) {
      return Modal.error({ title: "Percentage Is Should Be Less Than 100 " });
    }
    var salary_data = {
      staff_id: staff.id,
      basic_amount: amount,
      nssf_percentage: nssfPercent,
    };
    const url = "http://localhost:8000/finance/staff-salary-register/";
    axiosInstance
      .post(url, salary_data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        return Modal.success({ title: response.statusText });
        // return navigateToStudentDetail(response.data)
      })
      .catch((error) => {
        console.log(error);
        return Modal.error({
          title: "Salary Already Exists Or Service Not Currently Available",
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
            title="Basic"
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
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
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
                name="control-hooks"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
              >
                <Form.Item label="Basic Amount" rules={[{ required: false }]}>
                  <Input
                    placeholder="Basic Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                    }}
                  />
                  <div style={{ color: "green" }}>
                    - {amount.toLocaleString()} SHS
                  </div>
                </Form.Item>
                <Form.Item
                  label="Nssf Percentage"
                  rules={[{ required: false }]}
                >
                  <Input
                    placeholder="Nssf Percentage"
                    type="number"
                    value={nssfPercent}
                    onChange={(e) => {
                      setNssfPercent(Number(e.target.value));
                    }}
                  />
                  <div style={{ color: "orange" }}>
                    - {nssfPercent.toLocaleString()} %
                  </div>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Add Salary Data
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

export default StaffSalaryNew