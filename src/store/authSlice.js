import { createSlice } from '@reduxjs/toolkit'
import {getToken} from "../utils/Auth.js";

const initialState = {
    isLoggedIn: !!getToken(),
    token: '',
    username: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = '';
            state.username = '';
        }
    },
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions

export default authSlice.reducer
