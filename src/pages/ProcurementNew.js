import React, { useState, useEffect } from 'react'
import { AppBreadcrumb } from '../components'
import { Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/productSlice'
import { addItemToCart,changeQty, clearCart } from '../store/cartSlice'

const ProcurementNew = () => {
  const dispatch = useDispatch();
  const {cartItems, noOfItems} = useSelector((store) => store.cart);
  const {products} = useSelector((store) => store.product)
  
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
  
  return (
    <>
    <div>
      <AppBreadcrumb title="Procurement" action1="New" />
      <br/>
      <p>Number Of Cart Items = {noOfItems}</p>
      <br/>
      <button onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>
      <br/>
      <button onClick={() => showDrawer()}>
        Choose Products
      </button>
      <br/>
      <br/>
      {cartItems.map(item => {
      return (<div style={{
        display:"flex"
      }} key={item.id}>
        <div style={{height:"50px", width:"80px"}} >{item.name}</div>
        <div style={{height:"50px", width:"80px"}} >{item.category}</div>
        <div style={{height:"50px", width:"80px"}} >
          <input type='number' name = "q"
           placeholder="Quantity" value= {item.qty}
          onChange={(e) =>{
            dispatch(changeQty({id: item.id,qty:e.target.value}))
          }}
          /></div>
      </div>
      )  
    }
      )}

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
        const item1 = cartItems.find((obj) => 
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
              dispatch(addItemToCart({
                id : item.id,
                name : item.name,
                category : item.category_name,                
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