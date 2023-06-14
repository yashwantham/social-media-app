import { createContext, useReducer } from "react"
import { ACTIONS, AuthReducer } from "../reducers/AuthRedcuer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({children}) {

    const navigate = useNavigate();

    const { SET_LOGIN_TRUE, SET_LOGIN_FALSE, SET_USER_DATA} = ACTIONS;

    const [authState, dispatchAuth] = useReducer(AuthReducer, {isLoggedin: false, userData: {}})

    const signupAuthUser = async (signupData) => {
        try {
            const response = await axios.post("/api/auth/signup", {...signupData})
            if(response.status === 201) {
                console.log(response)
                localStorage.setItem("userToken", response.data.encodedToken);
                dispatchAuth({type: SET_LOGIN_TRUE});
                dispatchAuth({ type: SET_USER_DATA, payload: response.data.createdUser });
                navigate("/");
            }
        }
        catch(error) {
            dispatchAuth({ type: SET_LOGIN_FALSE });
            console.error(error)
        }
    }

    const loginAuthUser = async (loginData) => {
        try {
            const response = await axios.post("/api/auth/login", loginData)
            if (response.status === 200) {
                console.log(response)
                localStorage.setItem("userToken", response.data.encodedToken)
                dispatchAuth({ type: SET_LOGIN_TRUE });
                dispatchAuth({ type: SET_USER_DATA, payload: response.data.foundUser });
                navigate("/");
            }
        }
        catch (error) {
            dispatchAuth({ type: SET_LOGIN_FALSE })
            console.error(error);
        }
    }

    // console.log("authState", authState)

    return (
        <>
            <AuthContext.Provider value={{authState, signupAuthUser, loginAuthUser}}>{children}</AuthContext.Provider>
        </>
    )
}