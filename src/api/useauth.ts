import { useMutation } from "react-query";
import authService from "../services/auth/authService";


export const useLoginMutation = () => {
    return useMutation(async (data) => (await authService.login(data))?.data);
};

export const useSignUpMutation = () => {
    return useMutation(async (data) => (await authService.signup(data))?.data);
};