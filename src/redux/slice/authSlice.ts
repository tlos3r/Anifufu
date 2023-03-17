import { createSlice } from "@reduxjs/toolkit";
import User from "../../models/User";

const initialState: User = {
    isLoggedIn: false,
    userName: "",
    email: "",
    userId: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER(state, action) {
            const { email, userName, userId } = action.payload;
            state.isLoggedIn = true;
            state.userName = userName;
            state.userId = userId;
            state.email = email;
        },
        REMOVE_ACTIVE_USER(state) {
            state.isLoggedIn = false;
            state.email = "";
            state.userId = "";
            state.userName = "";
        },
    },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state: { auth: { isLoggedIn: boolean } }) => state.auth.isLoggedIn;
export const selectUserName = (state: { auth: { userName: string } }) => state.auth.userName;
export const selectEmail = (state: { auth: { email: string } }) => state.auth.email;
export const selectUserId = (state: { auth: { userId: string } }) => state.auth.userId;

export default authSlice.reducer;
