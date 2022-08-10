import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Modal,
  Button,
  Breadcrumb,
  Card,
  Col,
  Row,
  Select,
} from "antd";
import { SearchOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllowancesStaffNew = () => {
  const [staff, setStaff] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [xAllowances, setXAllowances] = useState([]);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const navigateToAllowanceDetail = (staff, record) => {
    navigate("/home/finance/staff-allowances/detail", {
      state: {staff,record},
    });
  };

  const getAllowances = () => {
    axios
      .get("http://localhost:8000/finance/monthly-allowances/")
      .then((res) => {
        setAllowances(res.data);
      });
  };

  useEffect(() => {
    getAllowances();
  }, []);

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
    if (xAllowances.length === 0) {
      return Modal.error({ title: "Select At-Least One Allowance" });
    }
    let allowance_data;
    allowance_data = {
      staff_id: staff.id,
      allowances: xAllowances,
    };
    // console.log(allowance_data);

    const url = "http://localhost:8000/finance/staff-monthly-allowances/";
    axios
      .post(url, allowance_data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        Modal.success({ title: response.statusText });
        return navigateToAllowanceDetail(staff, response.data);
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
          <Breadcrumb.Item>Staff Allowances</Breadcrumb.Item>
          <Breadcrumb.Item>Assign</Breadcrumb.Item>
        </Breadcrumb>
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
            prefix={<SearchOutlined />}
            placeholder="Enter Staff Name OR Staff ID"
            onChange={(val) => {
              if (val.target.value.trim().length >= 1) {
                getStafftData(val.target.value);
              } else {
                setSearchResults([]);
              }
            }}
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
                  {result.staff_id} - {result.phone_number}
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
    </div>
  );
};

export default AllowancesStaffNew;
