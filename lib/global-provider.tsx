import { createContext, ReactNode, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedin : boolean;
    user: User|null;  
    loading:boolean; 
    refetch:(newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({children} : {children:ReactNode}) => {

    const {data: user, loading, refetch} = useAppwrite({
        fn:getCurrentUser,
         
    });

    const isLoggedin = !!user;

    return (
        <GlobalContext.Provider value={{
            isLoggedin,
            user,
            loading,
            refetch,
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if(!context) {
        throw new Error('useGlobalContext must be used within GlobalProvider')
    }
    return context
}

export default GlobalProvider;

