import React, {useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
// import { addItemToCart,  } from '../store/cartSlice'
import { addItemTostockInCart,addItemTostockOutCart,addItemToCartrequestCart } from '../store/inventorySlice'
import { getProducts } from '../store/productSlice'


const DrawerProducts = ({ type }) => {
    const dispatch = useDispatch()
    const {stockInCart} = useSelector((store) => store.inventory);
    const {stockOutCart} = useSelector((store) => store.inventory);
    const {requestCart} = useSelector((store) => store.inventory);

    const [cartItems, setCartItems] = useState([]);


    // const {cartItems} = useSelector((store) => store.cart);
    const { products} = useSelector((store) => store.product)

      useEffect(() =>{
        dispatch(getProducts())
      },[dispatch])

      useEffect(() =>{
        if(type === "stock_in"){
          setCartItems(stockInCart)
        }else if(type === "stock_out"){
          setCartItems(stockOutCart)
        }else{
          setCartItems(requestCart)
        }
      },[stockInCart,stockOutCart,requestCart,type])

  return (
    <>
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
          if(type === "stock_in"){
            dispatch(addItemTostockInCart({
              id : item.id,
              name : item.name,
              category : item.category_name,
              current_qty : item.current_qty,
              units : item.units,                
            }))

          }else if(type === "stock_out"){
            dispatch(addItemTostockOutCart({
              id : item.id,
              name : item.name,
              category : item.category_name,
              current_qty : item.current_qty,
              units : item.units,                
            }))

          }else{
            dispatch(addItemToCartrequestCart({
              id : item.id,
              name : item.name,
              category : item.category_name,
              current_qty : item.current_qty,
              units : item.units,                
            }))

          }
        }
      }/>
      <p>{item.name}</p>
      </div>)
      }
       )}
  </>
)
}

export default DrawerProducts