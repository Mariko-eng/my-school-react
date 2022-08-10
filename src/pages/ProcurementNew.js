import React, { useState, useEffect } from 'react'
import { Breadcrumb, Radio, Space,Card, Row,Col,Drawer, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/productSlice'
import { setProcurementType } from '../store/procurementSlice'
import { addItemToProcurementCart,addItemToProcurementNewItemsCart } from '../store/procurementSlice'
import { changeQtyProcurementCart,changeQtyProcurementNewItemsCart } from '../store/procurementSlice'
import { clearProcurementCart,clearProcurementNewItemsCart } from '../store/procurementSlice'

const ProcurementNew = () => {
  const dispatch = useDispatch();
  const [productName ,setProductName] = useState("")
  const [productUnits ,setProductUnits] = useState("")
  const [productQty ,setProductQty] = useState(1)
  const {procurementType} = useSelector((store) => store.procurement);
  const {procurementCart, noOfProcurementCartItems} = useSelector((store) => store.procurement);
  const {procurementNewItemsCart, noOfProcurementNewCartItems} = useSelector((store) => store.procurement);

  const {products} = useSelector((store) => store.product)
  
  const [visible, setVisible] = useState(false);

  const onChange = (e) => {
    dispatch(setProcurementType(e.target.value))
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() =>{
    dispatch(getProducts())
  },[dispatch])
  
  return (
    <>
    <div>
    <div>
          <Breadcrumb
            style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>
                  Procurement
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                  New
              </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
      >
      <Card title="Choose Receipt Type"
      bordered={false} style={{ background : "lavender" }}>
      <Radio.Group onChange={onChange} value={procurementType} style={{ width : "100%"}}>
        <Row> 
          <Col span={12}><Radio value="existing">Existing Products</Radio></Col>
          <Col span={12}><Radio value="new">New Products</Radio></Col>
        </Row>
    </Radio.Group>
    </Card>
    { procurementType !== '' && procurementType === "existing" && <Card>
    <div style={{ 
          display: "flex"
        }}>
          <Button  style={{ background:"blue" , color:"white"}} onClick={() => showDrawer()} >Choose Products</Button>
          {noOfProcurementCartItems !== 0 &&
          <div style={{ 
            display: "flex"
          }}>
          <Button style={{ background:"red" , color:"white"}} onClick={() => dispatch(clearProcurementCart())} >Clear List</Button>
          <Button>Total {noOfProcurementCartItems}</Button>
          </div>
          }
        </div>
      </Card>}

      { procurementType !== '' && procurementType === "existing" &&  noOfProcurementCartItems !== 0 &&  
      <Card>
          <Row>
            <Col span = {4} >Id</Col>
            <Col span = {4}>Name</Col>
            <Col span = {4}>Category</Col>
            <Col span = {4}>Units</Col>
            <Col span = {4}>Quantity</Col>
          </Row>
        {procurementCart.map(item => {
        return (<div
            key={item.id}>
          <Row>
          <Col span={4} >{item.id}</Col>
          <Col span={4} >{item.name}</Col>
          <Col span={4} >{item.category}</Col>
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
            onChange={(e) =>{  dispatch(changeQtyProcurementCart({id: item.id,qty:e.target.value}))}}
            /></Col>
          </Row>
        </div>
        )  
      }
        )}
      </Card>
      }

      { procurementType === "new" && 
      <Card>
        <Row>
          <Col span={6}>
            <input type="text" value={productName} name='name' placeholder='Product Name'
            onChange={(e) => {
              setProductName(e.target.value)
            }}
            />
          </Col>
          <Col span={6}>
            <input type="text" value={productUnits} name='units' placeholder='Units'
            onChange={(e) => {
              setProductUnits(e.target.value)
            }}
            />
          </Col>
          <Col span={6}>
            <input type="text" value={productQty} name='number' placeholder='Quantity'
            onChange={(e) => {
              setProductQty(e.target.value)
            }}
            />
          </Col>
          <Col span={6}>
            <Button onClick={() => {
              if(productName !== "" && productUnits !== ""){
                dispatch(addItemToProcurementNewItemsCart({
                  name : productName,
                    units : productUnits,
                    qty : productQty,             
                })) 
              }
            }}>Add Item</Button>
          </Col>
        </Row>
      </Card>
      }

    { procurementType !== '' && procurementType === "new" &&  noOfProcurementNewCartItems !== 0 &&  
      <Card>
          <Row>
            <Col span = {6}>Name</Col>
            <Col span = {6}>Units</Col>
            <Col span = {6}>Quantity</Col>
          </Row>
        {procurementNewItemsCart.map(item => {
        return (<div
            key={item.name}>
          <Row>
          <Col span={6} >{item.name}</Col>
          <Col span={6} >{item.units}</Col>
          <Col span={6} >
            <input
            style={{
              borderRadius:"20px",
              width : "100px",height:"30px"}} 
            type='number' 
            name = "q"
            placeholder="Quantity" 
            value= {item.qty}
            onChange={(e) =>{  dispatch(changeQtyProcurementNewItemsCart({name: item.name,qty:e.target.value}))}}
            /></Col>
          </Row>
        </div>
        )  
      }
        )}
      </Card>
      }
    </Space>
    </div>


    <Drawer
        title="Choose Products"
        placement={"right"}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={"right"}
      >
        {products.map(item => {
        let isChecked = false;
        const item1 = procurementCart.find((obj) => 
            obj.id === item.id
            )
            if(item1){
                isChecked = true;
              }else{
                isChecked = false;
              }
        return (<div key={item.id}>
          <input type="checkbox" checked = {isChecked} value={item.name} onChange={
            (val) =>{
              dispatch(addItemToProcurementCart({
                id : item.id,
                name : item.name,
                category : item.category_name,
                current_qty : item.current_qty,
                units : item.units,              
              }))
            }
          }/>
          <p>{item.name}</p>
          </div>)
          }
           )}
      </Drawer>
    </>
  )
}

export default ProcurementNew