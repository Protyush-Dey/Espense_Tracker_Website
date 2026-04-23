import api from "./api.ts";

import type { LoginPayload } from "../types/authType.ts";

// login 
export const login = (Data:LoginPayload) =>{
    return api.post("expTrack/user/logIn" , {json:Data}).json();
}