import { NavLink, useParams } from "react-router-dom"
import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";

import "./SingleTweetPage.css";
import { TopNav } from "../../components/TopNav/TopNav";
import { DataContext } from "../../contexts/DataProvider";
import { Avatar } from "../../components/Avatar/Avatar";
import { AuthContext } from "../../contexts/AuthProvider";
import { deletePost } from "../../utils/postService";
import { EditTweetModal } from "../HomePage/EditTweetModal";
import { dislikePost, isPostLiked, likePost } from "../../utils/likeService";
import { addToBookmark, isPostBookmarked, removeFromBookmark } from "../../utils/bookmarkService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { successToastmessage } from "../../components/Toastmessage/successToastmessage";
import { ACTIONS } from "../../reducers/DataRedcuer";

export function SingleTweetPage() {

    const { SET_ALLPOSTS } = ACTIONS;

    const authToken = localStorage.getItem("userToken");

    const { tweetId } = useParams();

    const [editmodal, setEditmodal] = useState(false); //post edit modal
    const [showeditdelete, setShoweditdelete] = useState(false); //post edit delete modal
    const [replytext, setReplytext] = useState("");

    const { dataState, dispatchData } = useContext(DataContext);
    const { authState } = useContext(AuthContext);

    const openedTweet = dataState.allPosts.find(({ _id }) => _id === tweetId)

    const getAvatar = (postUsername) => dataState?.usersList.find(({ username }) => postUsername === username)?.avatar

    const getUserId = (postUsername) => dataState?.usersList.find(({ username }) => postUsername === username)?._id

    const addToBookmarkHandler = () => {
        addToBookmark(authToken, openedTweet._id, dispatchData);
        successToastmessage("Tweet added to your Bookmarks");
    }

    const removeFromBookmarkHandler = () => {
        removeFromBookmark(authToken, openedTweet._id, dispatchData);
        successToastmessage("Tweet removed from your Bookmarks");
    }

    const likeHandler = () => {
        likePost(authToken, openedTweet._id, dispatchData);
    }

    const dislikeHandler = () => {
        dislikePost(authToken, openedTweet._id, dispatchData);
    }

    const deletePostHandler = () => {
        deletePost(authToken, openedTweet._id, dispatchData)
        setShoweditdelete(!showeditdelete);
    }

    const editPostHandler = () => {
        // dispatchData({type: TOGGLE_EDIT_MODAL})
        setEditmodal(true)
    }

    const isVerified = (usernameIn) => {
        return dataState.usersList.find(({ username }) => username === usernameIn).verified
    }

    function getDate(dateString) {
        const date = new Date(dateString);
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const hour = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hour >= 12 ? "PM" : "AM";
        const formattedHour = (hour % 12) || 12; // Convert to 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedMonth = months[date.getMonth()];
        const formattedDay = date.getDate();
        const formattedYear = date.getFullYear();

        const formattedDate = `${formattedHour}:${formattedMinutes} ${amPm} · ${formattedMonth} ${formattedDay}, ${formattedYear}`;
        return formattedDate;
    }

    const replyHandler = () => {
        // console.log("reply clicked", replytext)
        if(replytext.trim().length === 0) return;
        const newCommentedTweet = {...openedTweet, comments: [...openedTweet.comments, {
            _id:  uuid(),
            name: `${authState.userData.firstName} ${authState.userData.lastName}`,
            username: authState.userData.username,
            text: replytext,
            votes: {
              upvotedBy: [],
              downvotedBy: [],
            },
          }]}
        const newAllposts = dataState.allPosts.map((post) => post._id === openedTweet._id ? newCommentedTweet : post)
        dispatchData({type: SET_ALLPOSTS, payload: newAllposts});
        setReplytext("");
        successToastmessage("Replied to a tweet");
    }

    const copyLinkToClipboard = () => {
        const textField = document.createElement("textarea");
        textField.innerText = `https://twitter-clone-connectverse.vercel.app/tweet/${openedTweet._id}`;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
        successToastmessage("Link copied to clipboard!");
    };

    return (
        <>
            {editmodal && <EditTweetModal editingPostId={openedTweet._id} setEditmodal={setEditmodal} setShoweditdelete={setShoweditdelete} />}

            <div className="singletweetpage-container">
                <TopNav pageName={"Tweet"} />

                <div className="openedtweetcard-container">

                    <div className="avatar-name-username-threedots">
                        <div className="avatar-container-stp">
                            <Avatar imgSrc={getAvatar(openedTweet?.username)} userId={getUserId(openedTweet?.username)} />
                        </div>
                        <div className="name-username-threedots">
                            <div className="name-username">
                                <NavLink to={getUserId(openedTweet?.username) === authState?.userData?._id ? `/profile` : `/profile/${getUserId(openedTweet?.username)}`} className="txt-dec-none post-user-det-stp">
                                    <span className="name">
                                        {/* <strong>{post.name}</strong> */}
                                        {openedTweet?.name}{isVerified(openedTweet?.username) && <img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1689704875/Social-media-app-assets/t2xds3rzqt2o84x9q0do.png" alt="" className="verified-badge" />}
                                    </span>
                                    <span className="username">
                                        @{openedTweet?.username}
                                    </span>
                                </NavLink>
                            </div>
                            {/* <div className="editdelete-opener">
                                {openedTweet?.username === authState?.userData?.username && (
                                    <div className="deletepostcontainer">
                                        <i class="fa-solid fa-ellipsis threedots-icon-stp" onClick={() => setShoweditdelete(!showeditdelete)}></i>
                                    </div>
                                )}
                            </div> */}
                            {showeditdelete && openedTweet?.username === authState?.userData?.username && (
                                <div className="editdelete-modal-overlay-container-stp">
                                    <div className="overlay-deleteedit-popup-stp" onClick={() => setShoweditdelete(!showeditdelete)}></div>
                                    <div className="editdelete-modal-container-stp">
                                        <div className="edit-post" onClick={editPostHandler}>
                                            Edit
                                        </div>
                                        <div className="delete-post" onClick={deletePostHandler}>
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="content-date-icons-stp">

                        <div className="content-container-stp">
                            <p>{openedTweet?.content}</p>
                        </div>

                        <div className="media-container-stp">
                            {openedTweet?.mediaURL && <img src={openedTweet?.mediaURL} alt="" className="post-media" />}
                        </div>

                        <div className="date-time-container-stp">
                            {getDate(openedTweet?.createdAt)}
                        </div>

                        <div className="likecommentbook-container-stp">
                            <div className="comment-icon-stp action-icon-container-stp">
                                <i class="fa-regular fa-comment action-icon-stp"></i>
                            </div>
                            <div className="like-icon-stp action-icon-container-stp">
                                {isPostLiked(openedTweet, authState) ? <i class="fa-solid fa-heart action-icon-stp liked-icon-stp" onClick={dislikeHandler}></i> : <i class="fa-regular fa-heart action-icon-stp" onClick={likeHandler}></i>}
                            </div>
                            <div className="bookmark-icon-stp action-icon-container-stp">
                                {isPostBookmarked(openedTweet?._id, dataState) ? <i class="fa-solid fa-bookmark action-icon-stp bookmarked-icon-stp" onClick={removeFromBookmarkHandler}></i> : <i class="fa-regular fa-bookmark action-icon-stp" onClick={addToBookmarkHandler}></i>}
                            </div>
                            <div className="share-icon-stp action-icon-container-stp" onClick={copyLinkToClipboard}>
                                <FontAwesomeIcon icon={faShareNodes} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tweetyourreply-container">
                    <div className="avatar-container-stp">
                        <Avatar imgSrc={authState.userData.avatar} userId={authState.userData._id} />
                    </div>
                    <div className="input-n-tweetbtn-stp">
                        <div className="input-reply-container-stp">
                            <input type="text" className="input-reply-stp" placeholder="Tweet your reply!" onChange={(e) => setReplytext(e.target.value)} value={replytext}/>
                        </div>
                        <div className="reply-btn-container-stp">
                            <button className={replytext.trim().length === 0 ? "zero-replytext" : "reply-stp"} onClick={replyHandler}>Reply</button>
                        </div>
                    </div>
                </div>

                <div className="comment-list-container">
                    {openedTweet.comments.map((comment) => (
                        <div className="comment-card">
                            <div className="avatar-n-name-cc">
                                <div className="avatar-container-stp">
                                    <Avatar imgSrc={getAvatar(comment?.username)} userId={getUserId(comment?.username)} />
                                </div>
                                <div className="name-username-reply">
                                    <NavLink to={getUserId(comment?.username) === authState?.userData?._id ? `/profile` : `/profile/${getUserId(comment?.username)}`} className="txt-dec-none post-user-det-reply">
                                        <span className="name">
                                            {comment?.name}{isVerified(comment?.username) && <img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1689704875/Social-media-app-assets/t2xds3rzqt2o84x9q0do.png" alt="" className="verified-badge" />}
                                        </span>
                                        <span className="username">
                                            @{comment?.username}
                                        </span>
                                    </NavLink>
                                    <div className="reply-container">
                                        {comment?.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}