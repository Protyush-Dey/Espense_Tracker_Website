export interface AllAccount {
  account_id:string
  type: "cash" | "primary" | "normal";
  account_name: string;
  balance: number;
}

export interface accountContextType {
  accounts: AllAccount[] | [];
  setAccount: (accounts: AllAccount[] | []) => void;
}
export interface AddExpensePayload {
  account: string;
  category: string;
  isGiven: boolean;
  description: string;
  amount: number;
  date: string;
}

export interface SpendWithCatagory{
  category:string,
  value:number
}