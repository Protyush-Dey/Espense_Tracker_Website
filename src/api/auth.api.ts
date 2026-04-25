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