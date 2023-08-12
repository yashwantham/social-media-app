import { createContext, useReducer } from "react"
import { ACTIONS, AuthReducer } from "../reducers/AuthRedcuer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { successToastmessage } from "../components/Toastmessage/successToastmessage";
import { warningToastmessage } from "../components/Toastmessage/warningToastmessage";


export const AuthContext = createContext();

export function AuthProvider({children}) {

    const navigate = useNavigate(); 

    const { SET_LOGIN_TRUE, SET_LOGIN_FALSE, SET_USER_DATA, RESET_AUTH} = ACTIONS;

    const initialAuthState = localStorage.getItem("authState") ? JSON.parse(localStorage.getItem("authState")) : {isLoggedin: false, userData: {}};

    const [authState, dispatchAuth] = useReducer(AuthReducer, initialAuthState)

    const signupAuthUser = async (signupData) => {
        try {
            const response = await axios.post("/api/auth/signup", {...signupData})
            if(response.status === 201) {
                // console.log(response)
                localStorage.setItem("userToken", response.data.encodedToken);
                dispatchAuth({type: SET_LOGIN_TRUE});
                dispatchAuth({ type: SET_USER_DATA, payload: {...response.data.createdUser, verified: false, avatar: "https://res.cloudinary.com/ddqytua2y/image/upload/v1688150690/Social-media-app-assets/default_profile_400x400_fvaubd.png", bio: "Add your bio here", website: "Add your website here",location: "Add your location here", header: ""} });
                localStorage.setItem("authState", JSON.stringify({isLoggedin: true, userData: {...response.data.createdUser, verified: false, avatar: "https://res.cloudinary.com/ddqytua2y/image/upload/v1688150690/Social-media-app-assets/default_profile_400x400_fvaubd.png", bio: "Add your bio here", website: "Add your website here",location: "Add your location here", header: ""}}))
                successToastmessage("Logged in successfully!");
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
                // console.log(response)
                localStorage.setItem("userToken", response.data.encodedToken)
                dispatchAuth({ type: SET_LOGIN_TRUE });
                dispatchAuth({ type: SET_USER_DATA, payload: response.data.foundUser });
                localStorage.setItem("authState", JSON.stringify({isLoggedin: true, userData: {...response.data.foundUser}}))
                successToastmessage("Logged in successfully!");
                navigate("/");
            }
        }
        catch (error) {
            dispatchAuth({ type: SET_LOGIN_FALSE })
            console.error(error);
        }
    }

    const logoutAuthUser = () => {
        localStorage.removeItem("userToken");
        dispatchAuth({type: RESET_AUTH});
        warningToastmessage("Logged out successfully!");
    }

    // console.log("authState", authState)

    return (
        <>
            <AuthContext.Provider value={{authState, dispatchAuth, signupAuthUser, loginAuthUser, logoutAuthUser}}>{children}</AuthContext.Provider>
            <ToastContainer/>
        </>
    )
}