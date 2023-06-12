import { useState } from "react";
import "./LoginPage.css";
import { NavLink } from "react-router-dom";

export function LoginPage() {

    const [userLoginData, setUserLoginData] = useState({ username: "", password: "" });

    const [showpassword, setShowpassword] = useState({ type: "password", hidden: true });

    const inputChangeHandler = (e) => setUserLoginData((userLoginData) => ({ ...userLoginData, [e.target.name]: e.target.value }))

    const hideHandler = () => {
        if (showpassword.hidden) {
            setShowpassword((showpassword) => ({ type: "text", hidden: false }));
        }
        else {
            setShowpassword((showpassword) => ({ type: "password", hidden: true }));
        }
    }

    return (
        <>
            <div className="login-page">
                <div className="login-container">
                    <h1 className="login-heading">
                        Login
                    </h1>
                    <form action="">
                        {/* {formError && <p className="formError-warning-login">Please enter both the fields.</p>} */}
                        <div className="username-container">
                            <input type="text" className="username-input" name="username" placeholder="Username" onChange={inputChangeHandler} />
                        </div>
                        <div className="password-container-login">
                            <input type={showpassword.type} className="password-input-login" name="password" placeholder="Password" onChange={inputChangeHandler} />
                            <span className="show-hide" onClick={hideHandler}>{showpassword.hidden ? "Show" : "Hide"}</span>
                        </div>
                        <div className="login-btn-container">
                            <button className="login-submit-btn" type="submit" >Login</button>
                        </div>
                        <div className="login-btn-container">
                            <button className="login-submit-btn" type="submit" >Login as Guest</button>
                            <p className="signup-text">Don't have an account? <NavLink to="/signup" className="signup-link">Sign Up</NavLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}