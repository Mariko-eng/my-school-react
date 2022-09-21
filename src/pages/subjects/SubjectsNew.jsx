import { Form, Input, Button, PageHeader, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const SubjectsNew = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success");

    values.name = values.name.toLowerCase();
    console.log(values);

    const url = "basic/subjects/";
    axiosInstance
      .post(url, values,)
      .then((response) => Modal.success({ title: response.statusText }))
      .catch((error) =>
        Modal.error({
          title: "Subject Already Exists Or Service Not Currently Available",
        })
      );
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
          title="Subjects"
          subTitle="Add"
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
            Register New Subject
          </Form.Item>
          <Form.Item
            name="name"
            label="Subject Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_short_form"
            label="Subject Code"
            rules={[{ required: true }]}
          >
            <Input />
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
    </div>
  );
};

export default SubjectsNew;
