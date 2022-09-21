import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  PageHeader,
  Row,
  Col,
  Button,
  DatePicker,
  Radio,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";

const StudentsNew = () => {
  const [classes, setClasses] = useState([]);
  const [xClass, setXClass] = useState([]);
  const [gname, setGname] = useState("");
  const [date, setDate] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [disability, setDisability] = useState("");
  const [submitType, setSubmitType] = useState("");
  const [visible, setVisible] = useState(false);
  const [student, setStudent] = useState({});

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const navigateToParentInfo = (student) => {
    navigate("/home/students/parents/new/", { state: student });
  };

  const navigateToStudentDetail = (student) => {
    navigate("/home/students-detail/", { state: student });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSuccess = (data) => {
    setStudent(data);
    setVisible(true);
  };

  useEffect(() => {
    axiosInstance.get("basic/classes/").then((res) => {
      setClasses(res.data);
    });
  }, []);

  const onFinishFailed = (errorInfo) => {
    return Modal.error({ title: "Incomplete Data" });
  };
  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };

  const onFinish = (values) => {
    var student_data = {
      first_name: values.first_name,
      last_name: values.last_name,
      given_name: gname,
      xklass: xClass,
      date_of_birth: date,
      gender: values.gender,
      nationality: values.nationality,
      religion: values.religion,
      is_baptised: values.is_baptised,
      has_a_disability: values.has_a_disability,
      disabilities: disability,
    };
    if (submitType === "Later") {
      navigateToParentInfo(student_data);
    }
    if (submitType === "Now") {
      const url = "students/register/";
      axiosInstance
        .post(url, student_data, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          form.resetFields();
          return handleSuccess(response.data);
        })
        .catch((error) => {
          console.log(error);
          return Modal.error({
            title: "Student Already Exists Or Service Not Currently Available",
          });
        });
    }
  };

  return (
    <>
      <div>
      <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Students"
          subTitle="Registration"
        ></PageHeader>
      </div>
      <br/>
      <div
        className="site-layout-content"
        style={{
          minHeight: "280px",
          padding: "24px",
          background: "#fff",
        }}
      >
        <Form
          form={form}
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
            wrapperCol={{ offset: 8, span: 16 }}
            style={{
              background: "cornsilk",
            }}
          >
            Register New Student
          </Form.Item>
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="given_name"
            label="Given Name"
            rules={[{ required: false }]}
          >
            <Input
              onChange={(val) => {
                setGname(val.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Select Class" rules={[{ required: true }]}>
            <Select
              placeholder="select One"
              onChange={(val) => {
                let obj = classes.find((item) => item.id === val);
                setXClass(obj);
              }}
            >
              {classes.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="date_of_birth"
            label="Date Of Birth"
            rules={[{ required: true }]}
          >
            <DatePicker onChange={onChangeDate} />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={"Male"}>Male</Radio>
              <Radio value={"Female"}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="nationality"
            label="Nationality"
            initialValue="Ugandan"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="religion"
            label="Religion"
            rules={[{ required: true }]}
          >
            <Select placeholder="select One">
              <Select.Option value="Catholic">Catholic</Select.Option>
              <Select.Option value="Protestant">Protestant</Select.Option>
              <Select.Option value="Islam">Islam</Select.Option>
              <Select.Option value="SDA">SDA</Select.Option>
              <Select.Option value="Pentecostal">Pentecostal</Select.Option>
              <Select.Option value="None Of The Above">
                None Of The Above
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="is_baptised"
            label="Is Baptised?"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="has_a_disability"
            label="Has A Disability?"
            initialValue={isDisabled}
            rules={[{ required: true }]}
            onChange={(val) => {
              setIsDisabled((preVal) => !preVal);
            }}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          {isDisabled && (
            <Form.Item
              label="Disabilities"
              rules={[
                {
                  required: false,
                  message: "Disability",
                },
              ]}
            >
              <Input.TextArea
                showCount
                maxLength={1000}
                onChange={(val) => {
                  setDisability(val.target.value);
                }}
              />
            </Form.Item>
          )}
          <Row>
            <Col span={4}></Col>
            <Col span={8}>
              <Form.Item>
                <Button
                  onClick={() => setSubmitType("Now")}
                  style={{ width: "200px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit Now
                </Button>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Button
                  onClick={() => setSubmitType("Later")}
                  htmlType="submit"
                >
                  Continue To Add Parent Data
                </Button>
              </Form.Item>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Form>
      </div>
      {visible && (
        <Modal
          // title="Success"
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
          okText="OK"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Add Another Student
            </Button>,
            <Button
              key="edit"
              type="primary"
              onClick={() => navigateToStudentDetail(student)}
            >
              View Student
            </Button>,
          ]}
        >
          <p style={{ color: "green" }}>
            {" "}
            Congs, Item was Added Successfully!
            <span>
              <CheckCircleOutlined />
            </span>
          </p>
        </Modal>
      )}
    </>
  );
};

export default StudentsNew