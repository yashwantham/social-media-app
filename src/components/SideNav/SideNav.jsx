import { NavLink } from "react-router-dom";

import "./SideNav.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { DataContext } from "../../contexts/DataProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { Avatar } from "../Avatar/Avatar";

export function SideNav() {

    const { TOGGLE_MODAL } = ACTIONS;

    const { authState } = useContext(AuthContext);

    const { dataState, dispatchData } = useContext(DataContext);

    const activeStyle = { fontWeight: "700" }

    return (
        <>
            {/* <div className="sidenav-main-container"> */}
                <div className="sidenav-container">
                    <div className="sidenav-navigators">
                        <NavLink to="/" className="app-logo-name">
                            ConnectVerse
                        </NavLink>
                        <NavLink to="/" className="navi-container" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                            <i class="fa-solid fa-house nav-icon"></i><span>Home</span>
                        </NavLink>
                        <NavLink to="/explore" className="navi-container" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                            <i class="fa-solid fa-magnifying-glass nav-icon"></i><span>Explore</span>
                        </NavLink>
                        <NavLink to="/bookmarks" className="navi-container" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                            <i class="fa-regular fa-bookmark nav-icon"></i><span>Bookmarks</span>
                        </NavLink>
                        <NavLink to="/profile" className="navi-container" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                            <i class="fa-regular fa-user nav-icon"></i><span>Profile</span>
                        </NavLink>
                        <div className="post-btn-container" onClick={() => dispatchData({ type: TOGGLE_MODAL })}>
                            <button className="post-btn">Tweet</button>
                        </div>
                    </div>
                    {/* <NavLink to="/profile" className="profile-navi">
                        {`Profile - ${authState.userData.firstName} ${authState.userData.lastName} `}
                    </NavLink> */}
                    <div className="userdeets-sn-container">

                        <div className="avatar-sugg-container">
                            <Avatar imgSrc={authState.userData.avatar} userId={authState.userData._id} />
                        </div>

                        <div className="userclick-sn">
                            <NavLink to={`/profile`}>
                                <div className="name-username-sugg-container">
                                    <div className="name-sugg">
                                        {`${authState.userData.firstName} ${authState.userData.lastName}`}
                                    </div>
                                    <div className="username-sugg">
                                        @{authState.userData.username}
                                    </div>
                                </div>
                            </NavLink>
                            <div className="threedots-sn-container">
                                <i class="fa-solid fa-ellipsis threedots-icon"></i>
                            </div>
                        </div>

                    </div>

                </div>
            {/* </div> */}
        </>
    )
}