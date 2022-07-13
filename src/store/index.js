import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice"
import modalReducer from "./modalSlice"
import inventoryReducer from "./inventorySlice";

export const store = configureStore({
    reducer:{
        product: productReducer,
        inventory: inventoryReducer,
        cart: cartReducer,
        modal: modalReducer

    }
})