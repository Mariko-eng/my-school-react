import React, { useState, useEffect } from 'react'
import { AppBreadcrumb } from '../../components'
import {Form, Input,Select,Drawer, Col,Row,Card,Button} from 'antd'
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getSuppliers } from '../../store/productSlice'
import { changeQtystockInCart,clearstockInCart } from '../../store/inventorySlice'
import {Link} from 'react-router-dom';
import DrawerProducts from '../../components/DrawerProducts';

const InventoryStockIn = () => {
  const dispatch = useDispatch()
  const { suppliers } = useSelector((store) => store.product)
  const { stockInCart, noOfstockInCartItems} = useSelector(store => store.inventory)
    
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
      <div style={{ background:"lightcyan", padding:"8px"}}>
        <AppBreadcrumb title="Inventory" action1="Add New Stock" />
        <div style={{ 
          display: "flex"
        }}>
          <Button  style={{ background:"blue" , color:"white"}} onClick={() => showDrawer()} >Choose Products</Button>
          {noOfstockInCartItems !== 0 &&
          <div style={{ 
            display: "flex"
          }}>
          <Button style={{ background:"red" , color:"white"}} onClick={() => dispatch(clearstockInCart())} >Clear List</Button>
          <Button>Total {noOfstockInCartItems}</Button>
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
        {stockInCart.map(item => {
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
            onChange={(e) =>{  dispatch(changeQtystockInCart({id: item.id,qty:e.target.value}))}}
            /></Col>
          </Row>
        </div>
        )  
      }
        )}
      </Card>
  
      </div>
      {noOfstockInCartItems !== 0 &&
      <div style={{ marginTop: "20px" }}>
                <Form.Item
        wrapperCol={{ offset: 8,
        span : 16}}
        style={{
          background: "lightcyan"
        }}
        >
          Additional Information
        </Form.Item>
      <Form.Item name="supplier"
       label="Select Supplier"
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
        >Add Supplier</Link>
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
        name="procurement_id"
        label="Procurement Id"
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
        name="invoice_id"
        label="Invoice Id"
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
        name="receipt_id"
        label="Receipt Id"
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
        <Button style={{ background:"blue" , color:"white"}} htmlType="submit">
        ADD NEW STOCk
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
          <DrawerProducts type ="stock_in"/>
        </Drawer>
      </>
    )
  }

export default InventoryStockIn