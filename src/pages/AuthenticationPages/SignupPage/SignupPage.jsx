import { useContext, useState } from "react";
import "./SignupPage.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

export function SignupPage() {

    const { signupAuthUser } = useContext(AuthContext);

    const [userSignupData, setUserSignupData] = useState({ firstName: "", lastName: "", email: "", username: "", password: "", confirmPassword: "" })
    const [showpassword, setShowpassword] = useState({ type: "password", hidden: true });
    const [formError, setFormError] = useState(false)

    const inputChangeHandler = (e) => {
        setUserSignupData((userSignupData) => ({ ...userSignupData, [e.target.name]: e.target.value }))
    }

    // console.log(userSignupData);

    const hideHandler = () => {
        if (showpassword.hidden) {
            setShowpassword((showpassword) => ({ type: "text", hidden: false }));
        }
        else {
            setShowpassword((showpassword) => ({ type: "password", hidden: true }));
        }
    }

    const signupSubmit = (e) => {
        e.preventDefault();
        if(userSignupData.password === userSignupData.confirmPassword) {
            setFormError(false);
            signupAuthUser(userSignupData);
        }
        else {
            setFormError(true);
        }
    }

    return (
        <>
            <div className="signup-container">
                <h1 className="signup-heading">
                    Sign Up
                </h1>
                {formError && <p className="formError-warning">All fields are mandatory, and the password and confirm password should match.</p>}
                <form action="" onSubmit={signupSubmit}>
                    <div className="first-name-container">
                        <p>First Name</p>
                        <input type="text" name="firstName" required className="first-name-input" placeholder="Enter First Name" onChange={inputChangeHandler} />
                    </div>
                    <div className="last-name-container">
                        <p>Last Name</p>
                        <input type="text" name="lastName" required className="last-name-input" placeholder="Enter Last Name" onChange={inputChangeHandler} />
                    </div>
                    <div className="email-container">
                        <p>Email</p>
                        <input type="text" name="email" required className="email-input" placeholder="Enter Email" onChange={inputChangeHandler} />
                    </div>
                    <div className="username-container-signup">
                        <p>Username</p>
                        <input type="text" name="username" required className="username-input-signup" placeholder="Enter Username" onChange={inputChangeHandler} />
                    </div>
                    <div className="password-container">
                        <p>Password</p>
                        <input type={showpassword.type} name="password" required className="password-input" placeholder="Enter Password" onChange={inputChangeHandler} />
                        <span className="show-hide-signup" onClick={hideHandler}>{showpassword.hidden ? "Show" : "Hide"}</span>
                    </div>
                    <div className="confirm-password-container">
                        <p>Confirm Password</p>
                        <input type="password" name="confirmPassword" required className="confirm-password-input" placeholder="Enter Password" onChange={inputChangeHandler} />
                    </div>
                    <div className="signup-btn-container">
                        <button className="signup-submit-btn" type="submit" >Sign Up</button>
                        <p className="login-text">Already have an account? <NavLink to="/login" className="login-link">Login</NavLink> </p>
                    </div>
                </form>
            </div>
        </>
    )
}