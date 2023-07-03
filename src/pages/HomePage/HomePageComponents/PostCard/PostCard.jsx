import { useContext, useState } from "react";
import "./PostCard.css";
import { DataContext } from "../../../../contexts/DataProvider";
import { Avatar } from "../../../../components/Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { addToBookmark, isPostBookmarked, removeFromBookmark } from "../../../../utils/bookmarkService";
import { ToastContainer } from "react-toastify";
import { successToastmessage } from "../../../../components/Toastmessage/successToastmessage";
import { dislikePost, isPostLiked, likePost } from "../../../../utils/likeService";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

export function PostCard({ post }) {

    const authToken = localStorage.getItem("userToken");

    const { dataState, dispatchData } = useContext(DataContext);

    const { authState } = useContext(AuthContext);

    const getAvatar = (postUsername) => dataState.usersList.find(({ username }) => postUsername === username).avatar

    const getUserId = (postUsername) => dataState.usersList.find(({ username }) => postUsername === username)._id

    const getCommentCount = (comments) => comments.reduce((acc, comm) => acc + 1, 0)

    const getPostedTime = (dateString) => {
        const date = new Date(dateString);
        const options = { month: "short", day: "numeric" };
        let formattedDate = date.toLocaleString("en-US", options);
        if (date.getFullYear() < 2023) {
            formattedDate += ", " + (date.getFullYear());
        }
        return formattedDate;
    }

    const addToBookmarkHandler = () => {
        addToBookmark(authToken, post._id, dispatchData);
        successToastmessage("Tweet added to your Bookmarks");
    }

    const removeFromBookmarkHandler = () => {
        removeFromBookmark(authToken, post._id, dispatchData);
        successToastmessage("Tweet removed from your Bookmarks");
    }

    const likeHandler = () => {
        likePost(authToken, post._id, dispatchData);
    }

    const dislikeHandler = () => {
        dislikePost(authToken, post._id, dispatchData);
    }

    const [showeditdelete, setShoweditdelete] = useState(false)

    return (
        <>
            <div className="postcard-container">

                <div className="avatar-container">
                    <Avatar imgSrc={getAvatar(post.username)} userId={getUserId(post.username)} />
                </div>

                <div className="usernpost-container">

                    <div className="userdatedeledi-container">

                        <div className="userndate-container">
                            {/* <strong>{post.name}</strong> @{post.username} · {post.createdAt} */}
                            <NavLink to={getUserId(post.username) === authState.userData._id ? `/profile` : `/profile/${getUserId(post.username)}`}>
                                <span className="name">
                                    {/* <strong>{post.name}</strong> */}
                                    {post.name}
                                </span>
                                <span className="username">
                                    @{post.username}
                                </span>
                            </NavLink>
                            <span className="dot">
                                ·
                            </span>
                            <span className="created-date">
                                {getPostedTime(post.createdAt)}
                            </span>
                        </div>
                        <div className="editdelete-opener">
                            {post.username === authState.userData.username && (
                                <div className="deletepostcontainer">
                                    <i class="fa-solid fa-ellipsis threedots-icon" onClick={() => setShoweditdelete(!showeditdelete)}></i>
                                </div>
                            )}
                        </div>

                    </div>

                    {showeditdelete && post.username === authState.userData.username && (
                        <div className="editdelete-modal-container">
                            <div className="overlay-deleteedit-popup" onClick={() => setShoweditdelete(!showeditdelete)}></div>
                            <div className="edit-post">
                                Edit
                            </div>
                            <div className="delete-post">
                                Delete
                            </div>
                        </div>
                    )}

                    <div className="content-container">
                        <p>{post.content}</p>
                    </div>
                    <div className="media-container">
                        {post.mediaURL && <img src={post.mediaURL} alt="" className="post-media" />}
                    </div>
                    <div className="likecommentbook-container">
                        <div className="like-icon action-icon-container">
                            {isPostLiked(post, authState) ? <i class="fa-solid fa-heart action-icon liked-icon" onClick={dislikeHandler}></i> : <i class="fa-regular fa-heart action-icon" onClick={likeHandler}></i>} {post.likes.likeCount > 0 && <span className="interaction-count">{post.likes.likeCount}</span>}
                        </div>
                        <div className="comment-icon action-icon-container">
                            <i class="fa-regular fa-comment action-icon"></i>{getCommentCount(post.comments) > 0 && <span className="interaction-count">{getCommentCount(post.comments)}</span>}
                        </div>
                        <div className="bookmark-icon action-icon-container">
                            {isPostBookmarked(post._id, dataState) ? <i class="fa-solid fa-bookmark action-icon bookmarked-icon" onClick={removeFromBookmarkHandler}></i> : <i class="fa-regular fa-bookmark action-icon" onClick={addToBookmarkHandler}></i>}
                        </div>
                        <div className="share-icon action-icon-container">
                            {/* <i class="fa-sharp fa-solid fa-arrow-up-from-bracket action-icon"></i> */}
                            {/* <i class="fa-regular fa-share-nodes"></i> */}
                            <FontAwesomeIcon icon={faShareNodes} />
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </>
    )
}