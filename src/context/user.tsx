import { createContext, useContext, useState } from "react";
import type { User, UserContextType } from "../types/authType";



const userContext = createContext<UserContextType>({
    user:null,
    setUser:()=>{},
})

export const UserProvider = ({children}:{children:React.ReactNode}) =>{
    const [user, setUser] = useState<User|null>(null);

    return(
        <userContext.Provider value={{user , setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => useContext(userContext);