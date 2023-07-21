// Can use this everywhere except on profile page

import { NavLink, useLocation } from "react-router-dom";
import "./Avatar.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

export function Avatar({ imgSrc, userId }) {

    const location = useLocation();

    const { authState } = useContext(AuthContext);

    return (
        <>
            {authState.userData._id === userId ? (
                <NavLink to={`/profile`} state={{ from: location }} >
                    <img src={imgSrc} alt="" className="avatarimg" />
                </NavLink>
            ) : (
                <NavLink to={`/profile/${userId}`} state={{ from: location }} >
                    <img src={imgSrc} alt="" className="avatarimg" />
                </NavLink>
            )}
        </>
    )
}