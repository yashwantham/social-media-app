import { useContext } from "react";
import "./SuggetionsRightAside.css";
import { DataContext } from "../../contexts/DataProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { Avatar } from "../Avatar/Avatar";
import { follow } from "../../utils/followService";
import { successToastmessage } from "../Toastmessage/successToastmessage";

export function SuggetionsRightAside() {

    const authToken = localStorage.getItem("userToken");

    const { dataState, dispatchData } = useContext(DataContext);

    const { authState } = useContext(AuthContext);

    // console.log(authState)
    // console.log(dataState.usersList)

    const suggestionsList = dataState.usersList.filter(({ username }) => username !== authState.userData.username)

    const followHandler = (id, firstName, lastName) => {
        follow(id, authToken, dispatchData);
        successToastmessage(`Followed ${firstName} ${lastName}`);
    }

    return (
        <>
            <div className="suggestionsrightaside-container">
                <h2>Who to follow</h2>
                {suggestionsList.map(({ _id, firstName, lastName, username, avatar }) => (
                    <div className="suggesteduser-container">

                        <div className="avatar-sugg-container">
                            <Avatar imgSrc={avatar} />
                        </div>

                        <div className="followbtn-name-sugg-container">
                            <div className="name-username-sugg-container">
                                <div className="name-sugg">
                                    {`${firstName} ${lastName}`}
                                </div>
                                <div className="username-sugg">
                                    @{username}
                                </div>
                            </div>
                            <div className="follow-btn-sugg-container">
                                <button className="follow-btn-sugg" onClick={() => followHandler(_id, firstName, lastName)}>
                                    Follow
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )
}