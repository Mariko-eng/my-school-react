import {Form, Input,Select,
  Button,Breadcrumb,Modal
} from 'antd'
import axios from 'axios';

const SchoolClassesNew = () => {

  const onFinish = (values) => {
    console.log("Success")

    values.name = values.name.toLowerCase()
    console.log(values);

    const url = "http://localhost:8000/basic/classes/"
    axios.post(url , values, {
      headers: {
        "content-type" : "application/json" 
      }
    }).then(response => Modal.success({title : response.statusText}))
    .catch(error => Modal.error({title : "Class Already Exists Or Service Not Currently Available"}))
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
        <Breadcrumb.Item>Classes</Breadcrumb.Item>
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
          Add New Class
        </Form.Item>
       <Form.Item name="name" label="Class Name" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name="level" label="Level"
      rules={[
        { required: true,},]}>
        <Select>
        <Select.Option value= "Lower" >Lower</Select.Option>
        <Select.Option value= "Middle" >Middle</Select.Option>
        <Select.Option value= "Higher" >Higher</Select.Option>
        </Select>
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

export default SchoolClassesNew