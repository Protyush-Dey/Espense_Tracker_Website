import api from "./api.ts";

import type { LoginPayload, SignUpPayload } from "../types/authType.ts";

// login 
export const login = (Data:LoginPayload) =>{
    return api.post("expTrack/user/logIn" , {json:Data}).json();
}

// signup
export const signup = (Data:SignUpPayload) =>{
    return api.post("expTrack/user/register" , {json:Data}).json();
}

// email send for otp in forget password
export const sendEmail = (Data:{email: string}) =>{
    return api.post("expTrack/user/forgotPassword" , {json:Data}).json();
}

// otp verify
export const otpVerify = (Data:{ email:string, otp: number }) =>{
    return api.post("expTrack/user/verifyPasswordChangeOtp" , {json:Data}).json();
}

// set new password
export const setPassword = (Data:{password:string}) =>{
    return api.post("expTrack/user/updatePassword" , {json:Data}).json();
}

//
export const me = () =>{
    return api.get("expTrack/user/me" ).json();
}