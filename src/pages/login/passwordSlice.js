import { createSlice } from "@reduxjs/toolkit";

const initemailTokenState = {
    isLoading: "false",
    status: "",
    message: ""
}
const passwordResetToken = createSlice({

    name: "passwordResetToken",
    initialState,
    reducers: {
        tokenReqPending: (state) => {
            state.isLoading = "true"
        },
        tokenReqSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.state = "success";
            state.message =  payload;
        },
        tokenReqFail: (state, {payload}) => {
            state.isLoading = false;
            state.state = "error";
            state.message =  payload;
        },
    },
});
const {reducer, action} = passwordResetToken

export const {tokenReqPending, tokenReqSuccess, tokenReqFail} = actions;

export default reducer; 


