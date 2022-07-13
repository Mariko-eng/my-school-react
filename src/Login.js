import React from 'react'
import { Image, Button, Checkbox, Form, Input, Col, Row, Typography } from 'antd';
import './assets/css/login.css';
import logo from './assets/images/logo.png'

const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className="myStyle"
        >
          <Row align="start"
          >
            <Col xs ={24} md={8} xl={8}
            style={{
              display:"flex",
              flexDirection:"column",
              background:"white",
              height:"100vh",
              alignItems:"center",
              justifyContent:"center",
              backgroundColor: "rgb(231,232,237)",
            }}
            >
              <Image 
              width={100}
              src={logo} preview={false}
              />
            <Typography.Title level={3}
            >
              Welcome To Proxy
            </Typography.Title>
            <div 
            className="colStyle"
            >
            <Typography.Title level={4}>
              Login
            </Typography.Title>
            <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
              <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
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
            </Col>
          </Row>
        </div>
      );
}

export default Login