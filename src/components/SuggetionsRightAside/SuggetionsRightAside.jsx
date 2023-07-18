import { useContext, useState } from "react";
import "./SuggetionsRightAside.css";
import { DataContext } from "../../contexts/DataProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { Avatar } from "../Avatar/Avatar";
import { follow, isFollowing, unfollow } from "../../utils/followService";
import { successToastmessage } from "../Toastmessage/successToastmessage";
import { warningToastmessage } from "../Toastmessage/warningToastmessage";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function SuggetionsRightAside() {

    const [searchedterm, setSearchedterm] = useState("");

    const authToken = localStorage.getItem("userToken");

    const { dataState, dispatchData } = useContext(DataContext);

    const { authState, dispatchAuth } = useContext(AuthContext);

    // console.log(authState)
    // console.log(dataState.usersList)

    const suggestionsList = dataState.usersList.filter(({ username }) => username !== authState.userData.username)

    const followHandler = (id, firstName, lastName) => {
        follow(id, authToken, dispatchData, dispatchAuth);
        successToastmessage(`Followed ${firstName} ${lastName}`);
    }

    const unfollowHandler = (id, firstName, lastName) => {
        unfollow(id, authToken, dispatchData, dispatchAuth);
        warningToastmessage(`Unfollowed ${firstName} ${lastName}`);
    }

    const searchResult = dataState.usersList.filter(({ firstName, lastName, username }) => {
        if (searchedterm.length === 0) return false;
        else return (
            firstName.toLowerCase().includes(searchedterm.trim().toLowerCase()) ||
            lastName.toLowerCase().includes(searchedterm.trim().toLowerCase()) ||
            username.toLowerCase().includes(searchedterm.trim().toLowerCase())
        )
    })

    return (
        <>
            <div className="suggestionsrightaside-container-main">

                <div className="search-n-result-container">

                    <div className="search-n-close-cotainer">
                        <div className="search-container">
                            <div className="search-icon">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className="searchinput-container">
                                <input type="text" className="search-input" placeholder="Search User" onChange={(e) => setSearchedterm(e.target.value)} value={searchedterm} />
                            </div>
                        </div>
                        {searchedterm.length !== 0 && (
                            <div className="searchresult-closer" onClick={() => setSearchedterm("")}>
                                <FontAwesomeIcon icon={faXmark} className="closeicon-sugg" />
                            </div>
                        )}
                    </div>

                    {searchedterm.length !== 0 && (
                        <div className="searchresult-container">
                            {searchedterm.length !== 0 && searchResult.length === 0 && (
                                <div className="nouserfound">
                                    No user found!
                                </div>
                            )}
                            {searchResult.map(({ _id, avatar, firstName, lastName, username }) => (
                                <div className="searchresult-user-container">
                                    <div className="avatar-sugg-container" onClick={() => setSearchedterm("")}>
                                        <Avatar imgSrc={avatar} userId={_id} />
                                    </div>
                                    <div className="followbtn-name-sugg-container" onClick={() => setSearchedterm("")}>
                                        <NavLink to={_id === authState.userData._id ? `/profile` : `/profile/${_id}`}>
                                            <div className="name-username-sugg-container">
                                                <div className="name-sugg">
                                                    {`${firstName} ${lastName}`}
                                                </div>
                                                <div className="username-sugg">
                                                    @{username}
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                <div className="suggestionsrightaside-container">
                    <h2>Who to follow</h2>
                    {suggestionsList.map(({ _id, firstName, lastName, username, avatar }) => (
                        <div className="suggesteduser-container" key={_id}>

                            <div className="avatar-sugg-container">
                                <Avatar imgSrc={avatar} userId={_id} />
                            </div>

                            <div className="followbtn-name-sugg-container">
                                <NavLink to={`/profile/${_id}`} className="txt-dec-none">
                                    <div className="name-username-sugg-container">
                                        <div className="name-sugg">
                                            {`${firstName} ${lastName}`}
                                        </div>
                                        <div className="username-sugg">
                                            @{username}
                                        </div>
                                    </div>
                                </NavLink>
                                <div className="follow-btn-sugg-container">
                                    {isFollowing(_id, dataState) ? <button className="following-btn-sugg" onClick={() => unfollowHandler(_id, firstName, lastName)}>Following</button> : <button className="follow-btn-sugg" onClick={() => followHandler(_id, firstName, lastName)}>
                                        Follow
                                    </button>}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}