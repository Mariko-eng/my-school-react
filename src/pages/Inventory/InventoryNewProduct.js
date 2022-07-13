import React, { useEffect, useState } from 'react'
import {Form, Input,Switch,Select,Upload,Image,Button,Breadcrumb} from 'antd'
import { InboxOutlined,FolderAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../store/productSlice'
import {Link} from 'react-router-dom';
import axios from 'axios';

const InventoryNewProduct = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((store) => store.product)
  // console.log(categories)
  const [file, setFile] = useState()
  const [filesList, setFilesList] = useState([])

  const normFile = (e) => {
    // console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
    
    let files = e?.fileList
    return files.slice(-1)
    // return e?.fileList;
  };
  const handleChange = ({event, file,fileList}) =>{
    // console.log(fileList[0])
    setFile(URL.createObjectURL(fileList[0].originFileObj))
    setFilesList(fileList)
  }

  const onFinish = (values) => {
    console.log("Success")
    // const formData = new FormData(values)
    // console.log("formData");
    console.log(values);
    if(typeof(values.image) === "undefined"){
      values.image = ""
    }else{
      values.image = filesList[0].originFileObj
    }
    if(typeof(values.is_published) === "undefined"){
      values.is_published = false
    }
    values.name = values.name.toLowerCase()
    console.log(values);


    const url = "http://localhost:8000/products/new/"
    axios.post(url , values, {
      headers: {
        "content-type" : "multipart/form-data" 
      }
    }).then(response => console.log(response)).catch(error => console.log(error))
  };

const onFinishFailed = (errorInfo) => {
  // console.log("Failure")
  //   console.log(errorInfo);
  };

  useEffect(() => {
    dispatch(getCategories())
  },[dispatch])

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
        <Link to="/home/inventory/category/new"
                style={{ color:"blue" }}
        >New Category</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
        <Link to="/home/inventory/products/new">New Product</Link>
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
          Register New Product
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
      <Form.Item name="category" label="Select Category">
        <Select>
          { categories.map((category,index) => 
              <Select.Option key= {index} value={category.catId}>{category.name}</Select.Option>
          ) }
        </Select>
        <div style={{color:"blue"}} >
        <Link to="/home/inventory/category/new"
                style={{ color:"blue" }}
        >Add Category</Link>
          <span style={{ marginLeft : "5px",color:"green" }}><FolderAddOutlined/></span></div>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description" 
        rules={[
          {
            required: true,
            message: 'Product Description',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={1000} />
        </Form.Item>
      <Form.Item name="is_published" label="Published" valuePropName="checked">
        <Switch checked = {false} />
      </Form.Item>
      <Form.Item label="Select Product Image">
        <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" beforeUpload={() => false} fileList={filesList} action="#" onChange={handleChange}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      {/* <input type="file" onChange={(e) => console.log(e.target.value)} /> */}
      { file && <Image src={file} style={{
        width: "100px",
        height: "100px"
      }
      }/> }
      <Form.Item
        name="comment"
        label="Comment"
        rules={[
          {
            required: true,
            message: 'Any Additional Comments',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
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

export default InventoryNewProduct