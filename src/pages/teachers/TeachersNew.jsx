import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Modal,
  Button,
  PageHeader,
  DatePicker,
  Radio,
} from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const TeachersNew = () => {
  const [classes, setClasses] = useState([]);
  const [xClasses, setXClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [xSubjects, setXSubjects] = useState([]);
  const [gname, setGname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [kin_name, setKinName] = useState("");
  const [kin_phone, setKinPhone] = useState("");
  const [visible, setVisible] = useState(false);
  const [teacher, setTeacher] = useState({});

  const navigate = useNavigate();

  const navigateToTeacherDetail = (student) => {
    navigate("/home/staff/teachers-detail/", { state: student });
  };

  const [form] = Form.useForm();

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSuccess = (data) => {
    setTeacher(data);
    setVisible(true);
  };

  useEffect(() => {
    axiosInstance.get("basic/subjects/").then((res) => {
      setSubjects(res.data);
    });
  }, []);

  useEffect(() => {
    axiosInstance.get("basic/classes/").then((res) => {
      setClasses(res.data);
    });
  }, []);

  const onFinish = (values) => {
    var teacher_data = {
      first_name: values.first_name,
      last_name: values.last_name,
      given_name: gname,
      phone_number: values.phone_number,
      email: email,
      date_of_birth: date,
      gender: values.gender,
      nationality: values.nationality,
      national_id: nationalId,
      religion: values.religion,
      profession: "Teacher",
      home_address_district: values.home_address_district,
      home_address_village: values.home_address_village,
      next_of_kin_names: kin_name,
      next_of_kin_phone: kin_phone,
      is_teacher: true,
      subjects: xSubjects,
      classes: xClasses,
    };

    const url = "staff/teaching-staff/";
    axiosInstance
      .post(url, teacher_data, {
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
          title: "Teacher Already Exists Or Service Not Currently Available",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    return Modal.error({ title: "Incomplete Data" });
  };
  const onChangeDate = (date, dateString) => {
    // console.log(dateString)
    // console.log(date)
    setDate(dateString);
  };

  return (
    <>
      <div>
      <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Teachers"
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
            Register New Teacher
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
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input
              onChange={(val) => {
                setEmail(val.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Select Subjects" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              placeholder="select One Or More"
              onChange={(val) => {
                let objs = [];
                val.forEach((id) => {
                  let obj = subjects.find((item) => item.id === id);
                  objs.push(obj);
                });
                setXSubjects(objs);
              }}
            >
              {subjects.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.name}
                </Select.Option>
              ))} 
            </Select>
            <div style={{ color: "blue" }}>
              <Link to="/home/subjects/new/" style={{ color: "blue" }}>
                Add Subject
              </Link>
              <span style={{ marginLeft: "5px", color: "green" }}>
                <FolderAddOutlined />
              </span>
            </div>
          </Form.Item>

          <Form.Item label="Select Classes" rules={[{ required: false }]}>
            <Select
              mode="multiple"
              placeholder="select One Or More"
              onChange={(val) => {
                let objs = [];
                val.forEach((id) => {
                  let obj = classes.find((item) => item.id === id);
                  objs.push(obj);
                });
                setXClasses(objs);
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
            name="national_id"
            label="National ID"
            rules={[{ required: false }]}
          >
            <Input
              onChange={(val) => {
                setNationalId(val.target.value);
              }}
            />
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
            name="home_address_district"
            label="Home District"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="home_address_village"
            label="Home Village"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Next Of Kin (Full Names)"
            name="next_of_kin_names"
            rules={[
              {
                required: true,
                message: "Next Of Kin",
              },
            ]}
          >
            <Input
              onChange={(val) => {
                setKinName(val.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Next Of Kin (Pnone Number)"
            name="next_of_kin_number"
            rules={[
              {
                required: true,
                message: "Next Of Kin (Pnone Number)",
              },
            ]}
          >
            <Input
              onChange={(val) => {
                setKinPhone(val.target.value);
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
              Submit
            </Button>
          </Form.Item>
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
              Add Another Teacher
            </Button>,
            <Button
              key="edit"
              type="primary"
              onClick={() => navigateToTeacherDetail(teacher)}
            >
              View Teacher
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

export default TeachersNew