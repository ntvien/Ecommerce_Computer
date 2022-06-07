import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        user_id:8,
        user_name:"tuanvu",
        role_name:"admin"
    }
};
export const UserInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload;
        },
        clearUserInfo: (state) => {
            state.user = null
        }
    }
})

export const { setUserInfo, clearUserInfo } = UserInfoSlice.actions;
export default UserInfoSlice.reducer;