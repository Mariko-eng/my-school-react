import {Form, Input,Button,Breadcrumb,Modal} from 'antd'
import axios from 'axios';

const SubjectUnitNew = () => {
  const onFinish = (values) => {
    console.log("Success")

    values.name = values.name.toLowerCase()
    console.log(values);

    const url = "http://localhost:8000/administration/subjects/"
    axios.post(url , values, {
      headers: {
        "content-type" : "application/json" 
      }
    }).then(response => Modal.success({title : response.statusText}))
    .catch(error => Modal.error({title : "Subject Already Exists Or Service Not Currently Available"}))
  };

const onFinishFailed = (errorInfo) => {
  return (Modal.error({title : "Incomplete Data"}))
  };

  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Subjects</Breadcrumb.Item>
        <Breadcrumb.Item>New</Breadcrumb.Item>
        </Breadcrumb>    
       </div>
      <div className="site-layout-content"
      style={{ 
        minHeight: "280px",
        padding: "24px",
        background: "#fff"
      }}
      >
      <Form name="control-hooks"
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
        wrapperCol={{ offset: 8,
        span : 16}}
        style={{
          background: "cornsilk"
        }}
        >
          Register New Subject
        </Form.Item>
       <Form.Item name="name" label="Subject Name" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name="code_name" label="Subject Code" 
        rules={[
          { required: true,},]}>
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
  )
}

export default SubjectUnitNew