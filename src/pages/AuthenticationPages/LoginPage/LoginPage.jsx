import { useContext, useState } from "react";
import "./LoginPage.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

export function LoginPage() {

    const { loginAuthUser } = useContext(AuthContext);

    const [userLoginData, setUserLoginData] = useState({ username: "", password: "" });

    const [showpassword, setShowpassword] = useState({ type: "password", hidden: true });

    const [formError, setFormError] = useState(false)

    const inputChangeHandler = (e) => setUserLoginData((userLoginData) => ({ ...userLoginData, [e.target.name]: e.target.value }))

    const hideHandler = () => {
        if (showpassword.hidden) {
            setShowpassword((showpassword) => ({ type: "text", hidden: false }));
        }
        else {
            setShowpassword((showpassword) => ({ type: "password", hidden: true }));
        }
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        if (userLoginData.username.length > 0 && userLoginData.password.length > 0) {
            setFormError(false)
            loginAuthUser(userLoginData);
        }
        else {
            setFormError(true);
        }
    }

    const loginAsGuestSubmit = (e) => {
        e.preventDefault();
        loginAuthUser({
            username: "adarshbalika",
            password: "adarshBalika123"
        })
    }

    return (
        <>
            <div className="login-page">
                <div className="login-container">
                    <h1 className="login-heading">
                        Login
                    </h1>
                    <form action="">
                        {formError && <p className="formError-warning-login">Please enter both the fields.</p>}
                        <div className="username-container">
                            <input type="text" className="username-input" name="username" placeholder="Username" onChange={inputChangeHandler} required />
                        </div>
                        <div className="password-container-login">
                            <input type={showpassword.type} className="password-input-login" name="password" placeholder="Password" onChange={inputChangeHandler} required />
                            <span className="show-hide" onClick={hideHandler}>{showpassword.hidden ? "Show" : "Hide"}</span>
                        </div>
                        <div className="login-btn-container">
                            <button className="login-submit-btn" type="submit" onClick={loginSubmit}>Login</button>
                        </div>
                        <div className="login-btn-container">
                            <button className="login-submit-btn" type="submit" onClick={loginAsGuestSubmit} >Login as Guest</button>
                            <p className="signup-text">Don't have an account? <NavLink to="/signup" className="signup-link">Sign Up</NavLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}