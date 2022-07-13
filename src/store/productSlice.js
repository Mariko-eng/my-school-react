import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    suppliers: [],
    categories: [],
    products: [],
    isLoading: true,
    isLoadingCategories : true,
    isLoadingSuppliers: true,
    error: "",
    total: 0,
}

export const getSuppliers = createAsyncThunk(
    'products/suppliers',
    async (anyParam, thunkAPI) => {
        try{
            const url = 'http://127.0.0.1:8000/products/suppliers/';
            const resp = await axios.get(url);
            return resp.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }

);

export const getCategories = createAsyncThunk(
    'products/getCategories',
    async (anyParam, thunkAPI) => {
        try{
            const url = 'http://127.0.0.1:8000/products/categories/';
            const resp = await axios.get(url);
            return resp.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }

);

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (anyParam, thunkAPI) => {
        try{
            const url = 'http://127.0.0.1:8000/products/';
            //console.log(anyParam)
            //console.log(thunkAPI)
            //console.log(thunkAPI.getState()) //gets all state from entire app
            //thunkAPI.dispatch(actionFromAnotherSlice()) // dispatch actions from other slices
            const resp = await axios.get(url);
            return resp.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers : {

    },
    extraReducers:{
        [getProducts.pending] : (state) =>{
            state.isLoading = true;
        },
        [getProducts.fulfilled] : (state,action) =>{
            state.isLoading = false;
            const data = action.payload;
            let cats = []
            let products = []
            data.forEach(item =>{
                if(item.products.length >= 1){
                    cats.push({catId : item.id,name: item.name,type:item.type})
                    products.push(...item.products)
                }
            })
            state.categories = cats;
            state.products = products;
            // console.log(products)
        },
        [getProducts.rejected] : (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getCategories.pending] : (state) =>{
            state.isLoadingCategories = true;
        },
        [getCategories.fulfilled] : (state,action) =>{
            state.isLoadingCategories = false;
            const items = action.payload;
            let cats = []
            if(items.length >= 1){
                items.forEach(item => {
                    cats.push({catId : item.id,name: item.name, products_total: item.products_total})
                })
            }
            state.categories = cats;
            // console.log(products)
        },
        [getCategories.rejected] : (state,action) => {
            state.isLoadingCategories = false;
            state.error = action.payload;
        },
        [getSuppliers.pending] : (state) =>{
            state.isLoadingSuppliers = true;
        },
        [getSuppliers.fulfilled] : (state,action) =>{
            state.isLoadingSuppliers = false;
            const items = action.payload;
            state.suppliers = items;
            // console.log(products)
        },
        [getSuppliers.rejected] : (state,action) => {
            state.isLoadingSuppliers = false;
            state.error = action.payload;
        }
    }
})

export default productSlice.reducer;