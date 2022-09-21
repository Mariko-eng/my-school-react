import React, { useState } from 'react'
import {Form, Input,Button,PageHeader,Modal} from 'antd'
import {useNavigate } from "react-router-dom";
import axios from 'axios';

const OtherStaffRolesNew = () => {
  const [role, setRole] =useState(null)
  const navigate = useNavigate();


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
          <PageHeader
            ghost={false}
            onBack={() => navigate(-1)}
            title="Non Teaching STaff Roles"
            subTitle="New"
          ></PageHeader>
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
          Add New Non-Teaching Staff Role
        </Form.Item>
       <Form.Item name="name" label="Role Name" 
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

export default OtherStaffRolesNew