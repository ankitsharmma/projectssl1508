import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export const Authprovider =({children})=>{
    const [islogin, setIslogin] = useState(false);
    const login=()=> setIslogin(true);
    return(
        <AuthContext.Provider value={{islogin, login}}>
            {children}

            </AuthContext.Provider>
    )
}
 export const useAuth=()=> useContext(AuthContext);

