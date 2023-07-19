import { NavLink } from "react-router-dom";

import "./SideNav.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { DataContext } from "../../contexts/DataProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { Avatar } from "../Avatar/Avatar";

export function SideNav() {

    const [showlogout, setShowlogout] = useState(false);

    const { TOGGLE_MODAL, TOGGLE_VERIFIEDMODAL } = ACTIONS;

    const { dataState } = useContext(DataContext);
    const { authState, logoutAuthUser } = useContext(AuthContext);

    const { dispatchData } = useContext(DataContext);

    const activeStyle = { fontWeight: "700" }

    const logoutHandler = () => {
        logoutAuthUser();
    }

    return (
        <>
            {/* <div className="sidenav-main-container"> */}
            <div className="sidenav-container">
                <div className="sidenav-navigators">
                    <NavLink to="/" className="app-logo-name txt-dec-none">
                        ConnectVerse
                    </NavLink>
                    <NavLink to="/" className="navi-container txt-dec-none" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <i class="fa-solid fa-house nav-icon"></i><span>Home</span>
                    </NavLink>
                    <NavLink to="/explore" className="navi-container txt-dec-none" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <i class="fa-solid fa-magnifying-glass nav-icon"></i><span>Explore</span>
                    </NavLink>
                    <NavLink to="/bookmarks" className="navi-container txt-dec-none" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <i class="fa-regular fa-bookmark nav-icon"></i><span>Bookmarks</span>
                    </NavLink>
                    <div to="" className="navi-container txt-dec-none" onClick={() => dispatchData({ type: TOGGLE_VERIFIEDMODAL })} style={dataState.verifiedModal ? activeStyle : undefined}>
                        <i class="fa-regular fa-circle-check nav-icon"></i><span>Verified</span>
                    </div>
                    <NavLink to="/profile" className="navi-container txt-dec-none" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        <i class="fa-regular fa-user nav-icon"></i><span>Profile</span>
                    </NavLink>
                    <div className="post-btn-container" onClick={() => dispatchData({ type: TOGGLE_MODAL })}>
                        <button className="post-btn">Tweet</button>

                        <div className="post-btn-tablet">
                            <i class="fa-solid fa-plus plus-icon"></i>
                            <i class="fa-solid fa-feather"></i>
                        </div>
                    </div>
                </div>
                {/* <NavLink to="/profile" className="profile-navi">
                        {`Profile - ${authState.userData.firstName} ${authState.userData.lastName} `}
                    </NavLink> */}

                <div className="userdeets-n-logout">

                    {showlogout && <div className="logout-option" onClick={logoutHandler}>
                        Log out {`@${authState.userData.username}`}
                    </div>}
                    {showlogout && <div className="logout-option-mobile" onClick={logoutHandler}>
                        Log out
                    </div>}

                    <div className="userdeets-sn-container">

                        <div className="avatar-sugg-container">
                            <Avatar imgSrc={authState.userData.avatar} userId={authState.userData._id} />
                        </div>

                        <div className="userclick-sn">
                            <NavLink to={`/profile`} className="txt-dec-none">
                                <div className="name-username-sugg-container">
                                    <div className="name-sugg">
                                        {`${authState.userData.firstName} ${authState.userData.lastName}`}{authState.userData.verified && <img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1689704875/Social-media-app-assets/t2xds3rzqt2o84x9q0do.png" alt="" className="verified-badge" />}
                                    </div>
                                    <div className="username-sugg">
                                        @{authState.userData.username}
                                    </div>
                                </div>
                            </NavLink>
                            <div className="threedots-sn-container" onClick={() => setShowlogout(!showlogout)}>
                                <i class="fa-solid fa-ellipsis threedots-icon"></i>
                            </div>
                        </div>

                    </div>

                    <div className="user-sn-mobile-container">
                        <div className="avatar-sugg-container" onClick={() => setShowlogout(!showlogout)}>
                            <Avatar imgSrc={authState.userData.avatar} userId={authState.userData._id} />
                        </div>
                    </div>
                </div>

            </div>
            {/* </div> */}
        </>
    )
}