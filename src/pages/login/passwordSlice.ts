import { createSlice } from "@reduxjs/toolkit";
const passwordResetToken = createSlice({

    name: "passwordResetToken",
    initialState:"",
    reducers: {
        tokenReqPending: (state:any) => {
            state.isLoading = "true"
        },
        tokenReqSuccess: (state:any, {payload}:any) => {
            state.isLoading = false;
            state.state = "success";
            state.message =  payload;
        },
        tokenReqFail: (state:any, {payload}:any) => {
            state.isLoading = false;
            state.state = "error";
            state.message =  payload;
        },
    },
});
const {reducer, action}:any = passwordResetToken

export const {tokenReqPending, tokenReqSuccess, tokenReqFail} = action;

export default reducer; 


