import { createContext, useContext, useState} from "react";
import type { AllAccount, accountContextType } from "../types/userDataType";

const AccountContext = createContext<accountContextType>({
  accounts: [],
  setAccount: () => {},
});

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accounts, setAccount] = useState<AllAccount[]>([]);

  return (
    <AccountContext.Provider value={{ accounts, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);