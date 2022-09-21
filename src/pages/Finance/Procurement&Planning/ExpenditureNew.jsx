import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, Button, Breadcrumb } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleOutlined,
} from "@ant-design/icons";

const ExpenditureNew = () => {
  const [terms, setTerms] = useState([]);
  const [xTerm, setXTerm] = useState({ id: "" });
  const [categories, setCategories] = useState([]);
  const [xCategory, setXCategory] = useState({ id: "" });
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const navigateToListItemsPage = () => {
    setVisible(false);
    return navigate("/home/finance/expenditure/");
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/basic/terms/").then((res) => {
      setTerms(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/items/categories/").then((res) => {
      // console.log(res.data)
      setCategories(res.data);
    });
  }, []);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSuccess = () => {
    setVisible(true);
  };

  const onFinish = (values) => {
    if (xCategory.id === "") {
      return Modal.error({ title: "Choose Category" });
    }
    if (xTerm.id === "") {
      return Modal.error({ title: "Choose Study Period" });
    }
    const data = {
      cat_id: xCategory.id,
      term_id: xTerm.id,
      item_name: values.name.toLowerCase(),
      measure: values.measure,
      units: values.units,
      price: Number(values.price),
      quantity: Number(values.quantity),
    };
    console.log(data);
    const url = "http://127.0.0.1:8000/finance/expenditure-items-register/";
    axios
      .post(url, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => handleSuccess())
      .catch((error) => {
        console.log(error);
        return Modal.error({
          title: "Data Already Exists Or Service Not Currently Available",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    return Modal.error({ title: "Incomplete Data" });
  };

  return (
    <>
      <div>
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Expenditure</Breadcrumb.Item>
          <Breadcrumb.Item>New</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div
        className="site-layout-content"
        style={{
          minHeight: "280px",
          padding: "24px",
          background: "#fff",
        }}
      >
        <Form
          name="control-hooks"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Form.Item
            wrapperCol={{ offset: 4, span: 20 }}
            style={{
              background: "cornsilk",
            }}
          >
            Enter Item Details
          </Form.Item>
          <Form.Item
            label="Period Of Study"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
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
            label="Select Category"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
            <Select
              placeholder="select One"
              onChange={(val) => {
                let obj = categories.find((item) => item.id === val);
                setXCategory(obj);
              }}
            >
              {categories.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
            <div style={{ color: "blue" }}>
              <Link to="#" style={{ color: "blue" }}>
                Add Category
              </Link>
              <span style={{ marginLeft: "5px", color: "green" }}>
                <FolderAddOutlined />
              </span>
            </div>
          </Form.Item>
          <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="measure"
            label="Measure"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Item Unit Price"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="units"
            label="Units"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Item Quantity"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {visible && (
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
          okText="OK"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Add Another Item
            </Button>,
            <Button key="edit" type="primary" onClick={navigateToListItemsPage}>
              Go To List Items
            </Button>,
          ]}
        >
          <p style={{color: "green" }}> Congs, Item was Added Successfully!<span><CheckCircleOutlined/></span></p>
        </Modal>
      )}
    </>
  );
};

export default ExpenditureNew;
