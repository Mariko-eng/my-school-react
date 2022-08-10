import React, { useState } from "react";
import { Form, Input, Modal, Button, Breadcrumb, Card, Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const SalaryNew = () => {
  const [nssfPercent, setNssfPercent] = useState(0);
  const [staff, setStaff] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  const getStafftData = (val) => {
    const url = `http://localhost:8000/basic/staff-search/${val}/`;
    axios
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
    if (nssfPercent > 100) {
      return Modal.error({ title: "Percentage Is Should Be Less Than 100 " });
    }
    var salary_data = {
      staff_id: staff.id,
      basic_amount: Number(values.basic_amount),
      nssf_percentage: Number(nssfPercent),
    };
    const url = "http://localhost:8000/finance/staff-salary-register/";
    axios
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
    <div>
      <div>
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Staff Salaries</Breadcrumb.Item>
          <Breadcrumb.Item>New</Breadcrumb.Item>
        </Breadcrumb>
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
            prefix={<SearchOutlined />}
            onChange={(val) => {
              if (val.target.value.trim().length >= 1) {
                getStafftData(val.target.value);
              } else {
                setSearchResults([]);
              }
            }}
            placeholder="Enter Staff Name OR Staff ID"
          />
        </Form.Item>
      </Form>
      {searchResults.length >= 1 && (
        <Row>
          <Col span={24}>
            {searchResults.map((result, index) => (
              <Card key={index}>
                <p>
                  (Name){result.first_name} {result.last_name} - (ID)
                  {result.staff_id} -{result.phone_number}
                  <span
                    onClick={() => {
                      setStaff(result);
                      setSearchResults([]);
                    }}
                    style={{ color: "green", marginLeft: "20px" }}
                  >
                    Choose Staff Member
                  </span>
                </p>
              </Card>
            ))}
          </Col>
        </Row>
      )}

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
                <Form.Item
                  name="basic_amount"
                  label="Basic Amount"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Basic Amount" type="number" />
                </Form.Item>
                <Form.Item
                  name="nssf_percentage"
                  label="Nssf Percentage"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Nssf Percentage"
                    type="number"
                    onChange={(e) => {
                      setNssfPercent(e.target.value);
                    }}
                  />
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
    </div>
  );
};

export default SalaryNew;
