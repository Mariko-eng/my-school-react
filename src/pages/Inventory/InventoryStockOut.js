import React, { useState, useEffect } from 'react'
import { AppBreadcrumb } from '../../components'
import {Form, Input,Select,Drawer, Col,Row,Card,Button} from 'antd'
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getSuppliers } from  '../../store/productSlice'
import { changeQtystockOutCart,clearstockOutCart } from '../../store/inventorySlice'
import {Link} from 'react-router-dom';
import DrawerProducts from '../../components/DrawerProducts';

const InventoryStockOut = () => {
  const dispatch = useDispatch()
  const { suppliers } = useSelector((store) => store.product)
  const { stockOutCart, noOfstockoutCartItems} = useSelector(store => store.inventory)
    
    const [visible, setVisible] = useState(false);
  
    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };
  
    useEffect(() =>{
      dispatch(getProducts())
    },[dispatch])

    useEffect(() =>{
      dispatch(getSuppliers())
    },[dispatch])
    
    return (
      <>
      <div style={{ background:"cornsilk", padding:"5px"}}>
        <AppBreadcrumb title="Inventory" action1="Issue Out Stock" />
        <div style={{ 
          display: "flex"
        }}>
          <Button  type="primary" style={{ color:"white"}} onClick={() => showDrawer()} >Choose Products</Button>
          {noOfstockoutCartItems !== 0 &&
          <div style={{ 
            display: "flex"
          }}>
          <Button style={{ background:"red" , color:"white"}} onClick={() => dispatch(clearstockOutCart())} >Clear List</Button>
          <Button>Total {noOfstockoutCartItems}</Button>
          </div>
          }
        </div>
        <br/>
        <Card>
          <Row>
            <Col span = {4} >Id</Col>
            <Col span = {4}>Name</Col>
            <Col span = {4}>Category</Col>
            <Col span = {4}>Stock</Col>
            <Col span = {4}>Units</Col>
            <Col span = {4}>Quantity</Col>
          </Row>
        </Card>

        <Card>
        {stockOutCart.map(item => {
        return (<div
            key={item.id}>
          <Row>
          <Col span={4} >{item.id}</Col>
          <Col span={4} >{item.name}</Col>
          <Col span={4} >{item.category}</Col>
          <Col span={4} >{item.current_qty}</Col>
          <Col span={4} >{item.units}</Col>
          <Col span={4} >
            <input
            style={{
              borderRadius:"20px",
              width : "100px",height:"30px"}} 
            type='number' 
            name = "q"
            placeholder="Quantity" 
            value= {item.qty}
            onChange={(e) =>{  dispatch(changeQtystockOutCart({id: item.id,qty:e.target.value}))}}
            /></Col>
          </Row>
        </div>
        )  
      }
        )}
      </Card>
  
      </div>
      {noOfstockoutCartItems !== 0 &&
      <div style={{ marginTop: "20px" }}>
                <Form.Item
        wrapperCol={{ offset: 8,
        span : 16}}
        style={{
          background: "cornsilk"
        }}
        >
          Additional Information
        </Form.Item>
      <Form.Item name="recipient"
       label="Select Recipient"
       autoComplete="off"
       labelCol={{
         span: 4,
       }}
       wrapperCol={{
         span: 20,
       }}
       >
        <Select>
          { suppliers.map((suppliers,index) => 
              <Select.Option key= {index} value={suppliers.id}>{suppliers.name} -- {suppliers.location}</Select.Option>
          ) }
        </Select>
        <div style={{color:"blue"}} >
        <Link to="/home/inventory/category/new123"
                style={{ color:"blue" }}
        >Add Recipient</Link>
          <span style={{ marginLeft : "5px",color:"green" }}><FolderAddOutlined/></span></div>
      </Form.Item>
      <Form.Item
        name="comment"
        label="Comments"
        autoComplete="off"
        labelCol={{
          span:4,
        }}
        wrapperCol={{
          span: 20,
        }}
      >
        <Input.TextArea showCount maxLength={1000} placeholder='Optional'/>
        </Form.Item>
        <Form.Item
        name="request"
        label="Request id"
        autoComplete="off"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
      >
        <Input showCount placeholder='Optional' />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        <Button type="primary" htmlType="submit">
        ISSUE OUT STOCk
        </Button>
        </Form.Item>
      </div>
      }
      <Drawer
          title="Choose Products"
          placement={"right"}
          closable={false}
          onClose={onClose}
          visible={visible}
          key={"right"}
        >
          <DrawerProducts type ="stock_out"/>
        </Drawer>
      </>
    )
  }

export default InventoryStockOut