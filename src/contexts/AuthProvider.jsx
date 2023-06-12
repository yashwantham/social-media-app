import { createContext, useReducer } from "react"
import { AuthReducer } from "../reducers/AuthRedcuer";

export const AuthContext = createContext();

export function AuthProvider({children}) {

    const [authState, dispatchAuth] = useReducer(AuthReducer, {isLoggedin: false, userData: {}})

    return (
        <>
            <AuthContext.Provider value={{authState}}>{children}</AuthContext.Provider>
        </>
    )
}