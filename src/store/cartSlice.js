import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    noOfItems : 0,
    isLoading: true,
    message : "",
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers :{
        clearCart :(state) =>{
            state.cartItems = [] // Mutate State directly
            //return {} returns completely new state with empty object
            state.noOfItems = 0
        },
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id)
            if(existingItem){
                state.cartItems = state.cartItems.filter((item) => 
                item.id !== newItem.id
                )
                state.noOfItems = state.noOfItems - 1
            }else{
                state.cartItems.push({
                    id : newItem.id,
                    name : newItem.name,
                    category : newItem.category,
                    current_qty : newItem.current_qty,
                    units : newItem.units,
                    qty : 1,
                })
                state.noOfItems = state.noOfItems + 1
            }
        },
        changeQty : (state, action) => {
            const newItemData = action.payload;
            if(newItemData.qty < 1){
                state.cartItems = state.cartItems.filter((item) => 
                item.id !== newItemData.id
                )
                state.noOfItems = state.noOfItems - 1
            }else{
                const cartItem = state.cartItems.find((item) => 
                item.id === newItemData.id
                )
                cartItem.qty = newItemData.qty
            }

        },

        removeItem:(state,action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => 
            item.id !== itemId
            )
        },
        increase:(state,{payload}) => {
            //here, we get the cartItem in state and mutate directly
            const cartItem = state.cartItems.find((item) => 
            item.id === payload.id
            )
            cartItem.qty = cartItem.qty + 1
        },
        decrease:(state,{payload}) => {
            //here, we get the cartItem in state and mutate directly
            const cartItem = state.cartItems.find((item) => 
            item.id === payload.id
            )
            cartItem.qty = cartItem.qty - 1
        },
        calculateTotals: (state) => {
            let itemsNo = 0;
            // let total = 0;
            state.cartItems.forEach((item) => {
                itemsNo = item.qty;
                // total += item.qty * item.price
            })
            state.noOfItems = itemsNo
        }
    }
}
);

//console.log(cartSlice)

export const {addItemToCart,changeQty, clearCart, removeItem,increase,decrease,calculateTotals} = cartSlice.actions;

export default cartSlice.reducer;