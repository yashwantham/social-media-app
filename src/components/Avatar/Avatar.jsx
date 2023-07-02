// Can use this everywhere except on profile page

import { NavLink } from "react-router-dom";
import "./Avatar.css";

export function Avatar({ imgSrc, userId }) {
    return (
        <>
            <NavLink to={`/profile/${userId}`}>
                <img src={imgSrc} alt="" className="avatarimg" />
            </NavLink>
        </>
    )
}