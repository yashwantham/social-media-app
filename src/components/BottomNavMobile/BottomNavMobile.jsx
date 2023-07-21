import { NavLink, useLocation } from "react-router-dom";
import "./BottomNavMobile.css";
import { useContext, useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import { AuthContext } from "../../contexts/AuthProvider";

export function BottomNavMobile() {

    const location = useLocation();

    const activeStyle = { fontWeight: "700" }

    const [showlogout, setShowlogout] = useState(false);

    const { authState, logoutAuthUser } = useContext(AuthContext);

    const logoutHandler = () => {
        logoutAuthUser();
    }

    return (
        <>
            <div className="bottomnavmobile-container">
                <div>
                    <NavLink to="/" className="navi-container-mobile txt-dec-none" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <i class="fa-solid fa-house nav-icon-mobile"></i>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/explore" className="navi-container-mobile txt-dec-none" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <i class="fa-solid fa-magnifying-glass nav-icon-mobile"></i>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/bookmarks" className="navi-container-mobile txt-dec-none" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <i class="fa-regular fa-bookmark nav-icon-mobile"></i>
                    </NavLink>
                </div>
                {/* <div to="" className="navi-container-mobile txt-dec-none" onClick={() => dispatchData({ type: TOGGLE_VERIFIEDMODAL })} style={dataState.verifiedModal ? activeStyle : undefined}>
                    <i class="fa-regular fa-circle-check nav-icon-mobile"></i>
                </div> */}
                <div>
                    <NavLink to="/profile" className="navi-container-mobile txt-dec-none" style={({ isActive }) => (isActive ? activeStyle : undefined)} state={{from: location}}>
                        <i class="fa-regular fa-user nav-icon-mobile"></i>
                    </NavLink>
                </div>
                <div className="user-bn-mobile-container">
                    {showlogout && <div className="logout-option-mobile-bn" onClick={logoutHandler}>
                        Log out
                    </div>}
                    <div className="avatar-sugg-container-bn" onClick={() => setShowlogout(!showlogout)}>
                        <NavLink to={`/profile`} state={{from: location}}>
                            <img src={authState.userData.avatar} alt="" className="avatarimg-bn" />
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}