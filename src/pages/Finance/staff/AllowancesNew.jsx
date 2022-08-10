import React, { useState } from "react";
import { Form, Input, Modal, Button, Breadcrumb, Col, Row } from "antd";
import axios from "axios";

const AllowancesNew = () => {
  const [name, setName] = useState("");
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let allowance_data;
    allowance_data = {
      name: values.allowance_for,
      amount: Number(values.amount),
    };
    console.log(allowance_data);

    const url = "http://localhost:8000/finance/monthly-allowances/";
    axios
      .post(url, allowance_data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        Modal.success({ title: response.statusText });
        return form.resetFields();
      })
      .catch((error) => {
        console.log(error);
        return Modal.error({
          title: "Allowance Already Exists Or Service Not Currently Available",
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
          <Breadcrumb.Item>Allowances</Breadcrumb.Item>
          <Breadcrumb.Item>Register New Allowances</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div
        className="site-layout-content"
        style={{
          minHeight: "200px",
          padding: "24px",
          background: "#fff",
        }}
      >
        <Row>
          <Col span={24}>
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
                name="allowance_for"
                label="Allowance For?"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Allowance Name Or Description"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Item>
              {name !== "" && (
                <p style={{ color: "blue", paddingLeft: "20px" }}>
                  {" "}
                  - {name.toUpperCase()} ALLOWANCE
                </p>
              )}
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true }]}
              >
                <Input placeholder="Amount" type="number" />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Add Allowance
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AllowancesNew;
