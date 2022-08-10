import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartType: '',
    receiptProductsCart : [],
    receiptServicesCart : [],
    receiptLogisticsCart : [],
    receiptStaffCart : [],
    receiptOthersCart : [],
    noOfItemsReceiptProductsCart : 0,
    noOfItemsReceiptServicesCart : 0,
    noOfItemsReceiptLogisticsCart : 0,
    noOfItemsReceiptStaffCart : 0,
    noOfItemsReceiptOthersCart : 0,
    isLoading: true,
    message : "",
}

const receiptSlice = createSlice({
    name : "receipt",
    initialState,
    reducers : {
        setCartType : (state,action) => {
            state.cartType = action.payload
        },
        clearItemsCart :(state) =>{
            if(state.cartType === "products"){
                state.receiptProductsCart = []
                state.noOfItemsReceiptProductsCart = 0
            }
        },
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            if(state.cartType === "products"){
                const existingItem = state.receiptProductsCart.find((item) => item.id === newItem.id)
            if(existingItem){
                state.receiptProductsCart = state.receiptProductsCart.filter((item) => 
                item.id !== newItem.id
                )
                state.noOfItemsReceiptProductsCart = state.noOfItemsReceiptProductsCart - 1
            }else{
                state.receiptProductsCart.push({
                    id : newItem.id,
                    name : newItem.name,
                    category : newItem.category,
                    current_qty : newItem.current_qty,
                    units : newItem.units,
                    qty : 1,
                })
                state.noOfItemsReceiptProductsCart = state.noOfItemsReceiptProductsCart + 1
            }
        }
        },

        changeQtyItemsCart : (state, action) => {
            const newItemData = action.payload;
            if(state.cartType === "products"){
             if(newItemData.qty < 1){
                state.receiptProductsCart = state.receiptProductsCart.filter((item) => 
                item.id !== newItemData.id
                )
                state.noOfItemsReceiptProductsCart = state.noOfItemsReceiptProductsCart - 1
            }else{
                const cartItem = state.receiptProductsCart.find((item) => 
                item.id === newItemData.id
                )
                cartItem.qty = newItemData.qty
            } 
        }

        },
        removeItemsCart:(state,action) => {
            const itemId = action.payload
            if(state.cartType === "products"){
            state.receiptProductsCart = state.receiptProductsCart.filter((item) => 
            item.id !== itemId
            )
            }
        },
        calculateTotalsItemsCart: (state) => {
            let itemsNo = 0;
            if(state.cartType === "products"){
            state.receiptProductsCart.forEach((item) => {
                itemsNo = item.qty;
            })
            state.noOfItemsReceiptProductsCart = itemsNo
        }
        },
    }
})

export const {
    setCartType,
    clearItemsCart,
    addItemToCart,
    changeQtyItemsCart,
    removeItemsCart,
    calculateTotalsItemsCart
} = receiptSlice.actions

export default receiptSlice.reducer