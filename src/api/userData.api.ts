import api from "./api.ts";

import type { ApiType } from "../types/api.ts";
import type { AddExpensePayload, AllAccount, SpendWithCatagory } from "../types/userDataType.ts";

export const getAllAccount = async () => {
    const response = await api.get<ApiType<AllAccount[]>>("/expTrack/account/getAllAccountDetails");
    return response.data;
};

export const createExpense = async (Data: AddExpensePayload) => {
    const response = await api.post("/expTrack/expense/createExpense", Data);
    return response.data;
};

export const getSpendWithCatagory = async () => {
    const response = await api.get<ApiType<SpendWithCatagory[]>>("/expTrack/expense/getSpendWithCatagory");
    return response.data;
};