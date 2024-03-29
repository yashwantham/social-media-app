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
import { NavLink, useLocation } from "react-router-dom";
import { deletePost } from "../../../../utils/postService";
import { EditTweetModal } from "../../EditTweetModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

export function PostCard({ post }) {

    // console.log({post})

    const location = useLocation();

    const authToken = localStorage.getItem("userToken");

    const { dataState, dispatchData } = useContext(DataContext);

    const { authState } = useContext(AuthContext);

    const [editmodal, setEditmodal] = useState(false); //post edit modal
    const [showeditdelete, setShoweditdelete] = useState(false); //post edit delete modal

    const getAvatar = (postUsername) => dataState?.usersList.find(({ username }) => postUsername === username)?.avatar

    const getUserId = (postUsername) => dataState?.usersList.find(({ username }) => postUsername === username)?._id

    const getCommentCount = (comments) => comments?.reduce((acc, comm) => acc + 1, 0)

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


    const deletePostHandler = () => {
        deletePost(authToken, post._id, dispatchData)
        setShoweditdelete(!showeditdelete);
    }

    const editPostHandler = () => {
        // dispatchData({type: TOGGLE_EDIT_MODAL})
        setEditmodal(true)
    }

    const isVerified = (usernameIn) => {
        return dataState.usersList.find(({ username }) => username === usernameIn).verified
    }

    // Function to copy the link to clipboard
    const copyLinkToClipboard = () => {
        const linkToCopy = `https://twitter-clone-connectverse.vercel.app/tweet/${post._id}`;
        navigator.clipboard.writeText(linkToCopy).then(
            () => {
                successToastmessage("Link copied to clipboard!");
            },
            (error) => {
                console.error("Unable to copy link: ", error);
            }
        );
    };

    return (
        <>
            {editmodal && <EditTweetModal editingPostId={post._id} setEditmodal={setEditmodal} setShoweditdelete={setShoweditdelete} />}

            <div className="postcard-container">

                <div className="avatar-container">
                    <Avatar imgSrc={getAvatar(post?.username)} userId={getUserId(post?.username)} />
                </div>

                <div className="usernpost-container">

                    <div className="userdatedeledi-container">

                        <div className="userndate-container">
                            {/* <strong>{post.name}</strong> @{post.username} · {post.createdAt} */}
                            <NavLink to={getUserId(post?.username) === authState?.userData?._id ? `/profile` : `/profile/${getUserId(post?.username)}`} className="txt-dec-none post-user-det" state={{ from: location }} >
                                <span className="name">
                                    {/* <strong>{post.name}</strong> */}
                                    {post?.name}{isVerified(post?.username) && <img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1689704875/Social-media-app-assets/t2xds3rzqt2o84x9q0do.png" alt="" className="verified-badge" />}
                                </span>
                                <span className="username">
                                    @{post?.username}
                                </span>
                            </NavLink>
                            <span className="dot">
                                ·
                            </span>
                            <span className="created-date">
                                {getPostedTime(post?.createdAt)}
                            </span>
                        </div>
                        <div className="editdelete-opener">
                            {post?.username === authState?.userData?.username && (
                                <div className="deletepostcontainer">
                                    <i class="fa-solid fa-ellipsis threedots-icon" onClick={() => setShoweditdelete(!showeditdelete)}></i>
                                </div>
                            )}
                        </div>

                    </div>

                    {showeditdelete && post?.username === authState?.userData?.username && (
                        <div className="editdelete-modal-overlay-container">
                            <div className="overlay-deleteedit-popup" onClick={() => setShoweditdelete(!showeditdelete)}></div>
                            <div className="editdelete-modal-container">
                                <div className="edit-post" onClick={editPostHandler}>
                                    Edit
                                </div>
                                <div className="delete-post" onClick={deletePostHandler}>
                                    Delete
                                </div>
                            </div>
                        </div>
                    )}

                    <NavLink to={`/tweet/${post._id}`} state={{from: location}} className="content-n-media">
                        <div className="content-container">
                            {post?.content}
                        </div>
                        <div className="media-container">
                            {post?.mediaURL && <img src={post?.mediaURL} alt="" className="post-media" />}
                        </div>
                    </NavLink>
                    <div className="likecommentbook-container">
                        <div className="like-icon action-icon-container">
                            {isPostLiked(post, authState) ? <i class="fa-solid fa-heart action-icon liked-icon" onClick={dislikeHandler}></i> : <i class="fa-regular fa-heart action-icon" onClick={likeHandler}></i>} {post?.likes.likeCount > 0 && <span className="interaction-count">{post?.likes?.likeCount}</span>}
                        </div>
                        <div className="comment-icon action-icon-container">
                            <NavLink to={`/tweet/${post._id}`} className="comment-icon-nav" state={{ from: location }}>
                                <i class="fa-regular fa-comment action-icon"></i>{getCommentCount(post?.comments) > 0 && <span className="interaction-count">{getCommentCount(post?.comments)}</span>}
                            </NavLink>
                        </div>
                        <div className="bookmark-icon action-icon-container">
                            {isPostBookmarked(post?._id, dataState) ? <i class="fa-solid fa-bookmark action-icon bookmarked-icon" onClick={removeFromBookmarkHandler}></i> : <i class="fa-regular fa-bookmark action-icon" onClick={addToBookmarkHandler}></i>}
                        </div>
                        <div className="share-icon action-icon-container" onClick={copyLinkToClipboard}>
                            <FontAwesomeIcon icon={faShareNodes} />
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </>
    )
}