import React from 'react'
import {Form, Input,Button,Breadcrumb,Modal} from 'antd'
import {Link} from 'react-router-dom';
import axios from 'axios';

const InventoryNewCategory = () => {

  const onFinish = (values) => {
    values.name = values.name.toLowerCase()
    const url = "http://localhost:8000/products/categories/new/"
    axios.post(url , values, {
      headers: {
        "content-type" : "application/json" 
      }
    }).then(response => {
      console.log(response)
      Modal.success({
        title : values.name + " Category added Successfully" 
      })
    })
      .catch(error => {console.log(error)
      Modal.error({
        title : "Failed To Add Category -> " +  values.name 
      }
      )
      })
  };

const onFinishFailed = (errorInfo) => {
  // console.log("Failure")
  //   console.log(errorInfo);
  };

  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Inventory</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
        <Breadcrumb.Item>
        <Link to="/home/inventory/products/"
                style={{ color:"blue" }}
        >List</Link>
        </Breadcrumb.Item>
       </Breadcrumb>      </div>
      <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>
        <Link to="/home/inventory/products/new"
        style={{ color:"blue" }}
        >New Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
        <Link to="/home/inventory/category/new">New Category</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
        <Link to="/home/inventory/category/"
                style={{ color:"blue" }}
        >Category List</Link>
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
          Register New Category
        </Form.Item>
       <Form.Item
        name="name"
        label="Name" 
        rules={[
          {
            required: true,
          },
        ]}
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
  )
}

export default InventoryNewCategory