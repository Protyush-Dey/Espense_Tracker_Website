import api from "./api.ts";

import type {  } from "../types/authType.ts";
import type { ApiType } from "../types/api.ts";
import type { AddExpensePayload, AllAccount, SpendWithCatagory } from "../types/userDataType.ts";



export const getAllAccount  = () =>{
    return api.get("expTrack/account/getAllAccountDetails" ).json<ApiType<AllAccount[]>>();
}

export const createExpense = (Data:AddExpensePayload) =>{
    return api.post("expTrack/expense/createExpense" , {json:Data}).json();
}

export const getSpendWithCatagory  = () =>{
    return api.get("expTrack/expense/getSpendWithCatagory" ).json<ApiType<SpendWithCatagory[]>>();
}