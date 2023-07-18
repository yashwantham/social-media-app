import { useParams } from "react-router-dom"
import "./OthersProfilePage.css"
import { TopNav } from "../../components/TopNav/TopNav";
import { useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { PostCard } from "../HomePage/HomePageComponents/PostCard/PostCard";
import { follow, isFollowing, unfollow } from "../../utils/followService";
import { AuthContext } from "../../contexts/AuthProvider";
import { successToastmessage } from "../../components/Toastmessage/successToastmessage";
import { ToastContainer } from "react-toastify";
import { warningToastmessage } from "../../components/Toastmessage/warningToastmessage";

export function OthersProfilePage() {


    const authToken = localStorage.getItem("userToken");

    const { SET_TWEETS_PP_TRUE, SET_MEDIA_PP_TRUE, SET_LIKES_PP_TRUE } = ACTIONS;

    const {userId} = useParams();
    // console.log("userId", userId)

    const {dataState, dispatchData} = useContext(DataContext);
    const { authState, dispatchAuth } = useContext(AuthContext);

    const visitedProfile = dataState.usersList.find(({_id}) => _id === userId )
    // console.log(visitedProfile);


    let postsToDisplay = [...dataState.allPosts];

    if (dataState.profilePageShow.tweets) {
        postsToDisplay = postsToDisplay.filter(({ username }) => username === visitedProfile.username)
    }
    else if (dataState.profilePageShow.media) {
        postsToDisplay = postsToDisplay.filter(({ mediaURL, username }) => mediaURL.length !== 0 && username === visitedProfile.username)
    }
    else if (dataState.profilePageShow.likes) {
        postsToDisplay = postsToDisplay.filter(({ likes }) => likes.likedBy.find(({ username }) => username === visitedProfile.username))
    }

    const getJoinDate = (dt) => {
        const date = new Date(dt);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    }

    const showTweets = () => dispatchData({ type: SET_TWEETS_PP_TRUE })

    const showMedia = () => dispatchData({ type: SET_MEDIA_PP_TRUE })

    const showLikes = () => dispatchData({ type: SET_LIKES_PP_TRUE })

    useEffect(() => {
        dispatchData({ type: SET_TWEETS_PP_TRUE });
    }, [userId])

    const followHandler = (id, firstName, lastName) => {
        follow(id, authToken, dispatchData, dispatchAuth);
        successToastmessage(`Followed ${firstName} ${lastName}`);
    }

    const unfollowHandler = (id, firstName, lastName) => {
        unfollow(id, authToken, dispatchData, dispatchAuth);
        warningToastmessage(`Unfollowed ${firstName} ${lastName}`);
    }

    return (
        <>
           <div className="othersprofile-page-container" style={{overflowY: dataState.modal ? "hidden" : "visible", maxHeight: dataState.modal ? "100vh" : "none"}}>
            <TopNav pageName="OthersProfile" userId={userId}/>
            
            <div className="header-profiledetails-container">

                    <div className="header-container">
                        {visitedProfile?.header?.length !== 0 && <img src={visitedProfile?.header} alt="" className="header" />}
                    </div>

                    <div className="profiledetails-avatar-editbtn-container">

                        <div className="avatar-editbtn-container">
                            <div className="avatar-pp-container">
                                <img src={visitedProfile?.avatar} alt="" className="avatart-pp" />
                            </div>
                            <div className="follow-btn-ppcontainer">
                                {isFollowing(visitedProfile?._id, dataState) ? <button className="following-btn-pp" onClick={() => unfollowHandler(visitedProfile?._id, visitedProfile?.firstName, visitedProfile?.lastName)}>
                                    Following
                                </button> : <button className="follow-btn-pp" onClick={() => followHandler(visitedProfile?._id, visitedProfile?.firstName, visitedProfile?.lastName)}>
                                    Follow
                                </button>}
                            </div>
                        </div>
                        <div className="name-n-username-pp-container">
                            <div className="name-pp">
                                {`${visitedProfile?.firstName} ${visitedProfile?.lastName}`}
                            </div>
                            <div className="username-pp">
                                @{visitedProfile?.username}
                            </div>
                        </div>

                        <div className="bio-pp">
                            {visitedProfile?.bio}
                        </div>

                        <div className="website-pp">
                            <i class="fa-solid fa-link"></i><a href={visitedProfile?.website} target="_blank" rel="noreferrer" className="txt-dec-none web-link">{visitedProfile?.website}</a>
                        </div>

                        <div className="location-createdat-container">
                            <div className="location-pp">
                                <FontAwesomeIcon icon={faLocationDot} className="location-icon" /> {visitedProfile?.location}
                            </div>
                            <div className="createdat">
                                <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon" /> Joined {getJoinDate(visitedProfile?.createdAt)}
                            </div>
                        </div>

                        <div className="followers-following-pp-container">
                            <div className="following-pp">
                                <span className="fnumber">{visitedProfile?.following?.length}</span> Following
                            </div>
                            <div className="followers-pp">
                                <span className="fnumber">{visitedProfile?.followers?.length}</span> Followers
                            </div>
                        </div>


                    </div>
                </div>

                <div className="tweets-media-likes-container">

                    <div className="tweets-pp" style={{ borderBottom: dataState?.profilePageShow?.tweets ? "4px solid var(--primary-color)" : "none" }} onClick={showTweets}>
                        Tweets
                    </div>
                    <div className="media-pp" style={{ borderBottom: dataState?.profilePageShow?.media ? "4px solid var(--primary-color)" : "none" }} onClick={showMedia}>
                        Media
                    </div>
                    <div className="likes-pp" style={{ borderBottom: dataState?.profilePageShow?.likes ? "4px solid var(--primary-color)" : "none" }} onClick={showLikes}>
                        Likes
                    </div>
                </div>

                <div className="poststodisplay-pp">
                    {postsToDisplay.map((post) => <PostCard post={post} />)}
                </div>

           </div>

           <ToastContainer/>
        </>
    )
}