import api from "./api.ts";

import type { LoginPayload, SignUpPayload, User } from "../types/authType.ts";
import type { ApiType } from "../types/api.ts";

// login 
export const login = (Data:LoginPayload) =>{
    return api.post("expTrack/user/logIn" , {json:Data}).json();
}

// signup
export const signup = (Data:SignUpPayload) =>{
    return api.post("expTrack/user/ragister" , {json:Data}).json();
}

// email send for otp in forget password
export const sendEmail = (Data:{email: string}) =>{
    return api.post("expTrack/user/forgotPassword" , {json:Data}).json();
}

//me
export const me = () =>{
    return api.get("expTrack/user/me" ).json<ApiType<User>>();
}

//logout
export const logout = () =>{
    return api.post("expTrack/user/logout" ).json<ApiType<User>>();
}
// otp verify
export const otpVerify = (Data:{ email:string, otp: number }) =>{
    return api.post("expTrack/user/verifyPasswordChangeOtp" , {json:Data}).json();
}

// set new password
export const setPassword = (Data:{password:string}) =>{
    return api.post("expTrack/user/updatePassword" , {json:Data}).json();
}