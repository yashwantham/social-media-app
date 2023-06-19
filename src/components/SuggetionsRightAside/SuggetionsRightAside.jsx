import { useContext } from "react";
import "./SuggetionsRightAside.css";
import { DataContext } from "../../contexts/DataProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { Avatar } from "../Avatar/Avatar";

export function SuggetionsRightAside() {

    const {dataState} = useContext(DataContext);

    const {authState} = useContext(AuthContext);

    // console.log(authState)
    // console.log(dataState.usersList)

    const suggestionsList = dataState.usersList.filter(({username}) => username !== authState.userData.username)

    return (
        <>
            <div className="suggestionsrightaside-container">
                <h1>Who to follow</h1>
                {suggestionsList.map(({firstName, lastName, avatar}) => (
                    <div>
                        <Avatar imgSrc={avatar}/>
                        <p>{firstName} {lastName}</p>
                    </div>
                ))}
            </div>
        </>
    )
}