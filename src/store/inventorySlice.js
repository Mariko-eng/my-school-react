import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stockInCart : [],
    stockOutCart : [],
    requestCart:[],
    noOfstockInCartItems : 0,
    noOfstockoutCartItems : 0,
    noOfrequestCartItems : 0,
    isLoading: true,
    message : "",
}

const inventorySlice = createSlice({
    name : "inventory",
    initialState,
    reducers :{
        clearstockInCart :(state) =>{
            state.stockInCart = [] // Mutate State directly
            //return {} returns completely new state with empty object
            state.noOfstockInCartItems = 0
        },
        addItemTostockInCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.stockInCart.find((item) => item.id === newItem.id)
            if(existingItem){
                state.stockInCart = state.stockInCart.filter((item) => 
                item.id !== newItem.id
                )
                state.noOfstockInCartItems = state.noOfstockInCartItems - 1
            }else{
                state.stockInCart.push({
                    id : newItem.id,
                    name : newItem.name,
                    category : newItem.category,
                    current_qty : newItem.current_qty,
                    units : newItem.units,
                    qty : 1,
                })
                state.noOfstockInCartItems = state.noOfstockInCartItems + 1
            }
        },
        changeQtystockInCart : (state, action) => {
            const newItemData = action.payload;
            if(newItemData.qty < 1){
                state.stockInCart = state.stockInCart.filter((item) => 
                item.id !== newItemData.id
                )
                state.noOfstockInCartItems = state.noOfstockInCartItems - 1
            }else{
                const cartItem = state.stockInCart.find((item) => 
                item.id === newItemData.id
                )
                cartItem.qty = newItemData.qty
            }

        },
        removeItemstockInCart:(state,action) => {
            const itemId = action.payload
            state.stockInCart = state.stockInCart.filter((item) => 
            item.id !== itemId
            )
        },
        calculateTotalsstockInCart: (state) => {
            let itemsNo = 0;
            // let total = 0;
            state.stockInCart.forEach((item) => {
                itemsNo = item.qty;
                // total += item.qty * item.price
            })
            state.noOfstockInCartItems = itemsNo
        },

        clearstockOutCart :(state) =>{
            state.stockOutCart = [] // Mutate State directly
            //return {} returns completely new state with empty object
            state.noOfstockoutCartItems = 0
        },
        addItemTostockOutCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.stockOutCart.find((item) => item.id === newItem.id)
            if(existingItem){
                state.stockOutCart = state.stockOutCart.filter((item) => 
                item.id !== newItem.id
                )
                state.noOfstockoutCartItems = state.noOfstockoutCartItems - 1
            }else{
                state.stockOutCart.push({
                    id : newItem.id,
                    name : newItem.name,
                    category : newItem.category,
                    current_qty : newItem.current_qty,
                    units : newItem.units,
                    qty : 1,
                })
                state.noOfstockoutCartItems = state.noOfstockoutCartItems + 1
            }
        },
        changeQtystockOutCart : (state, action) => {
            const newItemData = action.payload;
            if(newItemData.qty < 1){
                state.stockOutCart = state.stockOutCart.filter((item) => 
                item.id !== newItemData.id
                )
                state.noOfstockoutCartItems = state.noOfstockoutCartItems - 1
            }else{
                const cartItem = state.stockOutCart.find((item) => 
                item.id === newItemData.id
                )
                cartItem.qty = newItemData.qty
            }

        },

        removeItemstockOutCart:(state,action) => {
            const itemId = action.payload
            state.stockOutCart = state.stockOutCart.filter((item) => 
            item.id !== itemId
            )
        },
        
        calculateTotalsstockOutCart: (state) => {
            let itemsNo = 0;
            // let total = 0;
            state.stockOutCart.forEach((item) => {
                itemsNo = item.qty;
                // total += item.qty * item.price
            })
            state.noOfstockoutCartItems = itemsNo
        },
        clearCartrequestCart :(state) =>{
            state.requestCart = [] // Mutate State directly
            //return {} returns completely new state with empty object
            state.noOfrequestCartItems = 0
        },
        addItemToCartrequestCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.requestCart.find((item) => item.id === newItem.id)
            if(existingItem){
                state.requestCart = state.requestCart.filter((item) => 
                item.id !== newItem.id
                )
                state.noOfrequestCartItems = state.noOfrequestCartItems - 1
            }else{
                state.requestCart.push({
                    id : newItem.id,
                    name : newItem.name,
                    category : newItem.category,
                    current_qty : newItem.current_qty,
                    units : newItem.units,
                    qty : 1,
                })
                state.noOfrequestCartItems = state.noOfrequestCartItems + 1
            }
        },
        changeQtyrequestCart : (state, action) => {
            const newItemData = action.payload;
            if(newItemData.qty < 1){
                state.requestCart = state.requestCart.filter((item) => 
                item.id !== newItemData.id
                )
                state.noOfrequestCartItems = state.noOfrequestCartItems - 1
            }else{
                const cartItem = state.requestCart.find((item) => 
                item.id === newItemData.id
                )
                cartItem.qty = newItemData.qty
            }

        },

        removeItemrequestCart:(state,action) => {
            const itemId = action.payload
            state.requestCart = state.requestCart.filter((item) => 
            item.id !== itemId
            )
        },
        
        calculateTotalsrequestCart: (state) => {
            let itemsNo = 0;
            // let total = 0;
            state.requestCart.forEach((item) => {
                itemsNo = item.qty;
                // total += item.qty * item.price
            })
            state.noOfrequestCartItems = itemsNo
        }
    }
}
);


export const {
    addItemTostockInCart,addItemTostockOutCart,addItemToCartrequestCart,
    changeQtystockInCart,changeQtystockOutCart,changeQtyrequestCart,
    clearstockInCart,clearstockOutCart,clearCartrequestCart,
    removeItemstockInCart,removeItemstockOutCart,removeItemrequestCart,
    calculateTotalsstockInCart,calculateTotalsstockOutCart,calculateTotalsrequestCart
} = inventorySlice.actions;

export default inventorySlice.reducer;