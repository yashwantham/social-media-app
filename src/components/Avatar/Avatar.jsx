// Can use this everywhere except on profile page

import { NavLink } from "react-router-dom";
import "./Avatar.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

export function Avatar({ imgSrc, userId }) {

    const { authState } = useContext(AuthContext);

    return (
        <>
            {authState.userData._id === userId ? (
                <NavLink to={`/profile`}>
                <img src={imgSrc} alt="" className="avatarimg" />
            </NavLink>
            ) : (
                <NavLink to={`/profile/${userId}`}>
                    <img src={imgSrc} alt="" className="avatarimg" />
                </NavLink>
            )}
        </>
    )
}