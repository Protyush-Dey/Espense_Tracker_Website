import api from "./api.ts";

import type {  } from "../types/authType.ts";
import type { ApiType } from "../types/api.ts";
import type { AllAccount } from "../types/userDataType.ts";

// login 
// export const login = (Data:LoginPayload) =>{
//     return api.post("expTrack/user/logIn" , {json:Data}).json();
// }

//get all account
export const getAllAccount  = () =>{
    return api.get("expTrack/account/getAllAccountDetails" ).json<ApiType<AllAccount[]>>();
}