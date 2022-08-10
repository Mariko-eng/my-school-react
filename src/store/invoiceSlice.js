import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    invoiceType: '',
    cartType: '',
    invoiceProductsCart : [],
    invoiceServicesCart : [],
    invoiceLogisticsCart : [],
    invoiceStaffCart : [],
    invoiceOthersCart : [],
    noOfItemsInvoiceProductsCart : 0,
    noOfItemsInvoiceServicesCart : 0,
    noOfItemsInvoiceLogisticsCart : 0,
    noOfItemsInvoiceStaffCart : 0,
    noOfItemsInvoiceOthersCart : 0,
    isLoading: true,
    message : "",
}

const invoiceSlice = createSlice({
    name : "invoice",
    initialState,
    reducers : {
        setInvoiceType : (state,action) => {
            state.invoiceType = action.payload
        },
        setCartType : (state,action) => {
            state.cartType = action.payload
        },
        clearItemsCart :(state) =>{
            if(state.cartType === "products"){
                state.invoiceProductsCart = []
                state.noOfItemsInvoiceProductsCart = 0
            }
        },
        addItemToItemsCart: (state, action) => {
            const newItem = action.payload;
            if(state.cartType === "products"){
                const existingItem = state.invoiceProductsCart.find((item) => item.id === newItem.id)
            if(existingItem){
                state.invoiceProductsCart = state.invoiceProductsCart.filter((item) => 
                item.id !== newItem.id
                )
                state.noOfItemsInvoiceProductsCart = state.noOfItemsInvoiceProductsCart - 1
            }else{
                state.invoiceProductsCart.push({
                    id : newItem.id,
                    name : newItem.name,
                    category : newItem.category,
                    current_qty : newItem.current_qty,
                    units : newItem.units,
                    qty : 1,
                })
                state.noOfItemsInvoiceProductsCart = state.noOfItemsInvoiceProductsCart + 1
            }
        }
        },

        changeQtyItemsCart : (state, action) => {
            const newItemData = action.payload;
            if(state.cartType === "products"){
             if(newItemData.qty < 1){
                state.invoiceProductsCart = state.invoiceProductsCart.filter((item) => 
                item.id !== newItemData.id
                )
                state.noOfItemsInvoiceProductsCart = state.noOfItemsInvoiceProductsCart - 1
            }else{
                const cartItem = state.invoiceProductsCart.find((item) => 
                item.id === newItemData.id
                )
                cartItem.qty = newItemData.qty
            } 
        }

        },
        removeItemsCart:(state,action) => {
            const itemId = action.payload
            if(state.cartType === "products"){
            state.invoiceProductsCart = state.invoiceProductsCart.filter((item) => 
            item.id !== itemId
            )
            }
        },
        calculateTotalsItemsCart: (state) => {
            let itemsNo = 0;
            if(state.cartType === "products"){
            state.invoiceProductsCart.forEach((item) => {
                itemsNo = item.qty;
            })
            state.noOfItemsInvoiceProductsCart = itemsNo
        }
        },
    }
})

export const {
    setInvoiceType,
    setCartType,
    clearItemsCart,
    addItemToItemsCart,
    changeQtyItemsCart,
    removeItemsCart,
    calculateTotalsItemsCart
} = invoiceSlice.actions

export default invoiceSlice.reducer