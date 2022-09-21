import React, { useState } from "react";
import { Form, Input, Modal, Button, PageHeader, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../utils/axios";

const StaffAllowancesItemsNew = () => {
  const [name, setName] = useState("");
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

  const [form] = Form.useForm();

  const onFinish = (values) => {
    let allowance_data;
    allowance_data = {
      name: values.allowance_for,
      amount: Number(values.amount),
    };
    console.log(allowance_data);

    const url = "http://localhost:8000/finance/staff-allowance-add/";
    axiosInstance
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
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Allowance Items"
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

export default StaffAllowancesItemsNew