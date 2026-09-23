import api from "./api.ts";

import type { LoginPayload, SignUpPayload, User } from "../types/authType.ts";
import type { ApiType } from "../types/api.ts";

// login 
export const login = async (Data: LoginPayload) => {
    const response = await api.post<ApiType<any>>("/expTrack/user/logIn", Data);
    return response.data;
};

// signup

export const signup = async (Data: SignUpPayload) => {
    const response = await api.post<ApiType<any>>("/expTrack/user/ragister", Data);
    return response.data;
};

// email send for otp in forget password
export const sendEmail = async (Data: { email: string }) => {
    const response = await api.post<ApiType<{ otp: number }>>("/expTrack/user/forgotPassword", Data);
    return response.data;
};

// me
export const me = async () => {
    const response = await api.get<ApiType<User>>("/expTrack/user/me");
    return response.data;
};

// logout
export const logout = async () => {
    const response = await api.post<ApiType<User>>("/expTrack/user/logout");
    return response.data;
};

// otp verify
export const otpVerify = async (Data: { email: string; otp: number }) => {
    const response = await api.post<ApiType<any>>("/expTrack/user/verifyPasswordChangeOtp", Data);
    return response.data;
};

// set new password
export const setPassword = async (Data: { password: string }) => {
    const response = await api.post<ApiType<any>>("/expTrack/user/updatePassword", Data);
    return response.data;
};

