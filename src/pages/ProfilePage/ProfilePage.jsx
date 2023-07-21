import { useContext, useEffect, useState } from "react";
import { TopNav } from "../../components/TopNav/TopNav";
import { AuthContext } from "../../contexts/AuthProvider";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../contexts/DataProvider";
import { PostCard } from "../HomePage/HomePageComponents/PostCard/PostCard";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { EditProfileDetailsModal } from "./EditProfileDetailsModal";
import { useLocation } from "react-router-dom";

export function ProfilePage() {

    // const location = useLocation();
    // console.log("Locaiton from Profile Page",location);

    const { SET_TWEETS_PP_TRUE, SET_MEDIA_PP_TRUE, SET_LIKES_PP_TRUE } = ACTIONS;

    const { authState } = useContext(AuthContext);
    const { dataState, dispatchData } = useContext(DataContext);

    let postsToDisplay = [...dataState.allPosts];

    if (dataState.profilePageShow.tweets) {
        postsToDisplay = postsToDisplay.filter(({ username }) => username === authState.userData.username)
    }
    else if (dataState.profilePageShow.media) {
        postsToDisplay = postsToDisplay.filter(({ mediaURL, username }) => mediaURL?.length !== 0 && username === authState.userData.username)
    }
    else if (dataState.profilePageShow.likes) {
        postsToDisplay = postsToDisplay.filter(({ likes }) => likes.likedBy.find(({ username }) => username === authState.userData.username))
    }

    postsToDisplay = postsToDisplay.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const getJoinDate = (dt) => {
        const date = new Date(dt);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    }

    const showTweets = () => dispatchData({ type: SET_TWEETS_PP_TRUE })

    const showMedia = () => dispatchData({ type: SET_MEDIA_PP_TRUE })

    const showLikes = () => dispatchData({ type: SET_LIKES_PP_TRUE })

    // const getPostsOfThisUser = async () => {
    //     try {
    //         const response = await axios.get(`/api/posts/user/${authState.userData.username}`)
    //         if(response.status === 200) {
                
    //         }
    //         console.log({response})
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        dispatchData({ type: SET_TWEETS_PP_TRUE });
        // getPostsOfThisUser();
    }, [])

    const [editprofdmodal, setEditprofdmodal] = useState(false);

    return (
        <>
            {editprofdmodal && <EditProfileDetailsModal setEditprofdmodal={setEditprofdmodal}/>}
            <div className="profile-page-container" style={{overflowY: dataState.modal ? "hidden" : "visible", maxHeight: dataState.modal ? "100vh" : "none"}}>
                <TopNav pageName="Profile" editprofdmodal={editprofdmodal}/>

                <div className="header-profiledetails-container">

                    <div className="header-container">
                        {authState.userData?.header?.length !== 0 && <img src={authState.userData.header} alt="" className="header" />}
                    </div>

                    <div className="profiledetails-avatar-editbtn-container">

                        <div className="avatar-editbtn-container">
                            <div className="avatar-pp-container">
                                <img src={authState.userData.avatar} alt="" className="avatart-pp" />
                            </div>
                            <div className="editprofile-btn-container">
                                <button className="editprofile-btn" onClick={() => setEditprofdmodal(true)}>
                                    Edit profile
                                </button>
                            </div>
                        </div>
                        <div className="name-n-username-pp-container">
                            <div className="name-pp">
                                {`${authState.userData.firstName} ${authState.userData.lastName}`}{authState.userData.verified && <img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1689704875/Social-media-app-assets/t2xds3rzqt2o84x9q0do.png" alt="" className="verified-badge-pp"/>}
                            </div>
                            <div className="username-pp">
                                @{authState.userData.username}
                            </div>
                        </div>

                        <div className="bio-pp">
                            {authState.userData.bio}
                        </div>

                        <div className="website-pp">
                            <i class="fa-solid fa-link"></i><a href={authState.userData.website} target="_blank" rel="noreferrer" className="txt-dec-none web-link">{authState.userData.website.substring(0, 40)}...</a>
                        </div>

                        <div className="location-createdat-container">
                            <div className="location-pp">
                                <FontAwesomeIcon icon={faLocationDot} className="location-icon" /> {authState.userData.location}
                            </div>
                            <div className="createdat">
                                <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon" /> Joined {getJoinDate(authState.userData.createdAt)}
                            </div>
                        </div>

                        <div className="followers-following-pp-container">
                            <div className="following-pp">
                                <span className="fnumber">{authState.userData.following.length}</span> Following
                            </div>
                            <div className="followers-pp">
                                <span className="fnumber">{authState.userData.followers.length}</span> Followers
                            </div>
                        </div>


                    </div>
                </div>

                <div className="tweets-media-likes-container">

                    <div className="tweets-pp" style={{ borderBottom: dataState.profilePageShow.tweets ? "4px solid var(--primary-color)" : "none" }} onClick={showTweets}>
                        Tweets
                    </div>
                    <div className="media-pp" style={{ borderBottom: dataState.profilePageShow.media ? "4px solid var(--primary-color)" : "none" }} onClick={showMedia}>
                        Media
                    </div>
                    <div className="likes-pp" style={{ borderBottom: dataState.profilePageShow.likes ? "4px solid var(--primary-color)" : "none" }} onClick={showLikes}>
                        Likes
                    </div>
                </div>

                <div className="poststodisplay-pp">
                    {postsToDisplay.length === 0 ? <p className="zero-posts-msg">Oops no posts to show here!</p> : postsToDisplay.map((post) => <PostCard post={post} />)}
                </div>

            </div>
        </>
    )
}