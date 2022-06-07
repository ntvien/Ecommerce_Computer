import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggleMenu:false,
};
export const triggerElementSlice = createSlice({
    name: "triggerElement",
    initialState,
    reducers: {
        setToggleMenu:(state)=>{
            state.toggleMenu = !state.toggleMenu;
        }
    }
})

export const {setToggleMenu } = triggerElementSlice.actions;
export default triggerElementSlice.reducer;