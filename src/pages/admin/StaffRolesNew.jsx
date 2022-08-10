import React, { useState } from 'react'
import {Form, Input,Button,Breadcrumb,Modal} from 'antd'
import axios from 'axios';

const StaffRolesNew = () => {
  const [role, setRole] =useState(null)


  const onFinish = (values) => {

    values.name = values.name.toUpperCase()

    const url = "http://localhost:8000/administration/staff-roles/"
    axios.post(url , values, {
      headers: {
        "content-type" : "application/json" 
      }
    }).then(response => {
      setRole(response.data)
      return Modal.success({title : response.statusText}
        )})
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
        <Breadcrumb.Item>Staff Roles</Breadcrumb.Item>
        <Breadcrumb.Item>
        NEW
        </Breadcrumb.Item>
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
          Add New Staff Role
        </Form.Item>
       <Form.Item name="name" label="Role Name" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item
          name="descriptiomn" label="Short Description" 
          rules={[{
            required: false, message: '(*Optional)',},]}>
          <Input.TextArea showCount maxLength={1000} />
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
      <br/>
      {role !== null ? 
      <div style={{background : "green",color:"white"}}> 
        {role.id} - {role.name} -- {role.role_id}
      </div> 
      : <div></div>
      }
    </div>
  )
}

export default StaffRolesNew