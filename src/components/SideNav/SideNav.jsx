import { NavLink } from "react-router-dom";

import "./SideNav.css";

export function SideNav() {
    return (
        <>
            <div className="sidenav-container">
                <div className="sidenav-navigators">
                    <NavLink to="/" className="app-logo-name">
                        ConnectVerse
                    </NavLink>
                    <NavLink to="/" className="navi-container"> 
                        <i class="fa-solid fa-house nav-icon"></i><span>Home</span>
                    </NavLink>
                    <NavLink to="/explore" className="navi-container">
                        <i class="fa-solid fa-magnifying-glass nav-icon"></i><span>Explore</span>
                    </NavLink>
                    <NavLink to="/bookmarks" className="navi-container">
                        <i class="fa-regular fa-bookmark nav-icon"></i><span>Bookmarks</span>
                    </NavLink>
                    <div className="post-btn-container">
                        <button className="post-btn">Post</button>
                    </div>
                </div>
                <NavLink to="/profile" className="profile-navi">
                    Profile
                </NavLink>
            </div>
        </>
    )
}