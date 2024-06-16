import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: true,
        isActivatedEmail: false,
        isEditLogin: false,
    },
    reducers: {
        isSetAuth(state, action) {
            state.isAuth = action.payload;
        },
        isSetActivatedEmail(state, action) {
            state.isActivatedEmail = action.payload;
        },
        isSetEditLogin(state, action) {
            state.isEditLogin = action.payload;
        },
    }
})

export const { isSetAuth, isSetActivatedEmail, isSetEditLogin} = authSlice.actions;
export default authSlice;