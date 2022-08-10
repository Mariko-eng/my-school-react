import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeMenu : true,
    sreenWidth  : null
}

const appSettingsSlice = createSlice(
    {
        name : "appSettings",
        initialState,
        reducers: {
            setSreenWidth : (state,action) =>{
                const width = action.payload
                if(width <= 800){
                    state.activeMenu = false
                }else{
                    state.activeMenu = true
                }
            },

            toggleMenu : (state,action) =>{
                state.activeMenu = !state.activeMenu
            },
        }
    }
);

export const {setSreenWidth,toggleMenu} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;