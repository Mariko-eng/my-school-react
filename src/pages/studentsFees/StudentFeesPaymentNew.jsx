import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  Input,
  Modal,
  Button,
  PageHeader,
  Card,
  Col,
  Row,
  Drawer,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../utils/axios";

const StudentFeesPaymentNew = () => {
  const [terms, setTerms] = useState([]);
  const [xterm, setXTerm] = useState({});
  const [student, setStudent] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [xStudent, setXStudent] = useState({ label: "", value: "" });
  const [xclass, setXclass] = useState({ label: "", value: "" });

  const loadOptionsStudents = async (inputValue, callback) => {
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

  const loadOptionsClasses = async (inputValue, callback) => {
    // perform a request
    const requestResults = await axiosInstance.get("basic/classes/");

    const { data } = requestResults;
    const options = [];
    data.forEach((item) => {
      options.push({ label: item.name, value: item.id });
      // console.log(item)
    });

    // return requestResults
    return options;
  };

  const navigate = useNavigate();

  const navigateToPaymentDetail = (student) => {
    navigate("/home/finance/fees-term-payment-detail", { state: student });
  };

  useEffect(() => {
    axiosInstance.get("basic/terms/").then((res) => {
      setTerms(res.data);
    });
  }, []);

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const onFinish = (values) => {
    if (!xterm.name) {
      return Modal.error({ title: "Incomplete Data" });
    }
    const payment_data = {
      xstudent: student,
      xterm: xterm,
      amount_paid: values.amount,
      paid_by_name: values.paid_by_name,
      paid_by_phone: values.paid_by_phone,
    };
    console.log(payment_data);
    const url = "http://localhost:8000/finance/fees-term-payment/";
    axiosInstance
      .post(url, payment_data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        Modal.success({ title: response.statusText });
        return navigateToPaymentDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
        return Modal.error({ title: "Failed To Make Payment, Try Again" });
      });
  };

  const onFinishFailed = (errorInfo) => {
    return Modal.error({ title: "Incomplete Data" });
  };

  const getStudentData = (val) => {
    const url = `http://localhost:8000/basic/students-search/${val}/`;
    axiosInstance
      .get(url, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setSearchResults(response.data);
        //   return Modal.success({title : response.statusText}
        //     )
      })
      .catch((error) => Modal.error({ title: "Student Search Failed" }));
  };

  return (
    <>
      <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Fees Payment"
          subTitle="Add New"
          extra={[
            <div style={{ width: "250px" }}>
            <AsyncSelect
              placeholder="Select Student"
              defaultOptions
              cacheOptions
              loadOptions={loadOptionsStudents}
              onChange={(opt, meta) => {
                console.log(opt, meta);
                return setXStudent(opt);
              }}
            />
          </div>,
          <div style={{ width: "200px" }}>
            <AsyncSelect
              placeholder="Select Class"
              defaultOptions
              cacheOptions
              loadOptions={loadOptionsClasses}
              onChange={(opt, meta) => {
                console.log(opt, meta);
                return setXStudent(opt);
              }}
            />
          </div>,
          ]}
        ></PageHeader>
      </div>

      <div>
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
            label="Search For Student"
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
      </div>
      {student.student_id && (
        <div>
          <Row>
            <Col span={8}>
              <Card title="Student Details">
                <p>
                  First Name :
                  <span>
                    {student.first_name} {student.given_name}
                  </span>
                </p>
                <p>
                  First Name :<span>{student.last_name}</span>
                </p>
                <p>
                  Student ID :<span>{student.student_id}</span>
                </p>
                <p>
                  Class :<span>{student.student_class.name}</span>
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
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="period"
                      label="Study Period"
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
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="amount"
                      label="Amount Paid"
                      rules={[{ required: true }]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="paid_by_name"
                      label="Paid By?"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="paid_by_phone"
                      label="Contact"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Phone Number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col offset={8}>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          setStudent({});
                        }}
                      >
                        Reset
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col offset={4}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit Payment
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
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
                        getStudentData(val.target.value);
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
                        <div>(ID) {result.student_id}</div>
                        <div>(Class) {result.student_class.name}</div>
                      </div>
                      <div
                        onClick={() => {
                          setStudent(result);
                          setSearchResults([]);
                        }}
                        style={{ color: "green", marginLeft: "20px" }}
                      >
                        Choose Student
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

export default StudentFeesPaymentNew;
