import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice"
import modalReducer from "./modalSlice"
import inventoryReducer from "./inventorySlice"
import invoiceReducer from "./invoiceSlice"
import receiptReducer from "./receiptSlice"
import procurementReducer from "./procurementSlice"
import appSettingsReducer from "./appSettingsSlice";

export const store = configureStore({
    reducer:{
        product: productReducer,
        inventory: inventoryReducer,
        cart: cartReducer,
        modal: modalReducer,
        invoice: invoiceReducer,
        receipt: receiptReducer,
        procurement: procurementReducer,
        appSettings : appSettingsReducer
    }
})