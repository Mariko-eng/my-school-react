import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDrawerOpen: false,
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        handleModal : (state) => {
            state.isDrawerOpen = !state.isDrawerOpen
        }
    }
}
);


export const { handleModal } = modalSlice.actions;

export default modalSlice.reducer