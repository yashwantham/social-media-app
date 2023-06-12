import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"
import { Navigate } from "react-router-dom";

export function RequiresAuth({children}) {

    const {authState} = useContext(AuthContext);

    return authState.isLoggedin ? children : <Navigate to="/login" />;
    
}