import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    procurementType : '',
    procurementCart : [],
    procurementNewItemsCart : [],
    noOfProcurementCartItems : 0,
    noOfProcurementNewCartItems : 0,
    isLoading: true,
    message : "",
}

const procurementSlice = createSlice({
    name : "procurement",
    initialState,
    reducers: {
        setProcurementType : (state,action) => {
            state.procurementType = action.payload
        },
        clearProcurementCart :(state) =>{
            state.procurementCart = []
            state.noOfProcurementCartItems = 0
        },
        addItemToProcurementCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.procurementCart.find((item) => item.id === newItem.id)
            if(existingItem){
                state.procurementCart = state.procurementCart.filter((item) => 
                item.id !== newItem.id
                )
                state.noOfProcurementCartItems = state.noOfProcurementCartItems - 1
            }else{
                state.procurementCart.push({
                    id : newItem.id,
                    name : newItem.name,
                    category : newItem.category,
                    current_qty : newItem.current_qty,
                    units : newItem.units,
                    qty : 1,
                })
                state.noOfProcurementCartItems = state.noOfProcurementCartItems + 1
            }
        },
        changeQtyProcurementCart : (state, action) => {
            const newItemData = action.payload;
            if(newItemData.qty < 1){
                state.procurementCart = state.procurementCart.filter((item) => 
                item.id !== newItemData.id
                )
                state.noOfProcurementCartItems = state.noOfProcurementCartItems - 1
            }else{
                const cartItem = state.procurementCart.find((item) => 
                item.id === newItemData.id
                )
                cartItem.qty = newItemData.qty
            }

        },
        removeItemProcurementCart:(state,action) => {
            const itemId = action.payload
            state.procurementCart = state.procurementCart.filter((item) => 
            item.id !== itemId
            )
        },
        calculateTotalsProcurementCart: (state) => {
            let itemsNo = 0;
            state.procurementCart.forEach((item) => {
                itemsNo = item.qty;
            })
            state.noOfProcurementCartItems = itemsNo
        },

        clearProcurementNewItemsCart :(state) =>{
            state.procurementNewItemsCart = []
            state.noOfProcurementNewCartItems = 0
        },
        addItemToProcurementNewItemsCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.procurementNewItemsCart.find((item) => item.name === newItem.name)
            if(existingItem){
                state.procurementNewItemsCart = state.procurementNewItemsCart.filter((item) => 
                item.name !== newItem.name
                )
                state.noOfProcurementNewCartItems = state.noOfProcurementNewCartItems - 1
            }else{
                state.procurementNewItemsCart.push({
                    name : newItem.name,
                    units : newItem.units,
                    qty : newItem.qty,
                })
                state.noOfProcurementNewCartItems = state.noOfProcurementNewCartItems + 1
            }
        },
        changeQtyProcurementNewItemsCart : (state, action) => {
            const newItemData = action.payload;
            if(newItemData.qty < 1){
                state.procurementNewItemsCart = state.procurementNewItemsCart.filter((item) => 
                item.name !== newItemData.name
                )
                state.noOfProcurementNewCartItems = state.noOfProcurementNewCartItems - 1
            }else{
                const cartItem = state.procurementNewItemsCart.find((item) => 
                item.name === newItemData.name
                )
                cartItem.qty = newItemData.qty
            }

        },
        removeItemProcurementNewItemsCart:(state,action) => {
            const itemName = action.payload
            state.procurementNewItemsCart = state.procurementNewItemsCart.filter((item) => 
            item.name !== itemName
            )
        },
        calculateTotalsProcurementNewItemsCart: (state) => {
            let itemsNo = 0;
            state.procurementNewItemsCart.forEach((item) => {
                itemsNo = item.qty;
            })
            state.noOfProcurementNewCartItems = itemsNo
        },
    }
})

export const {
    setProcurementType,clearProcurementCart,
    addItemToProcurementCart,changeQtyProcurementCart,
    removeItemProcurementCart,calculateTotalsProcurementCart,
    clearProcurementNewItemsCart,addItemToProcurementNewItemsCart,
    changeQtyProcurementNewItemsCart,removeItemProcurementNewItemsCart,
    calculateTotalsProcurementNewItemsCart,
} = procurementSlice.actions;

export default procurementSlice.reducer;