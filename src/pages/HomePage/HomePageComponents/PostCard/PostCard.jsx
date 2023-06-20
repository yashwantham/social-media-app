import { useContext } from "react";
import "./PostCard.css";
import { DataContext } from "../../../../contexts/DataProvider";
import { Avatar } from "../../../../components/Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

export function PostCard({ post }) {

    const { dataState } = useContext(DataContext);

    const getAvatar = (postUsername) => dataState.usersList.find(({ username }) => postUsername === username).avatar

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

    return (
        <>
            <div className="postcard-container">

                <div className="avatar-container">
                    <Avatar imgSrc={getAvatar(post.username)} />
                </div>

                <div className="usernpost-container">
                    <div className="userndate-container">
                        {/* <strong>{post.name}</strong> @{post.username} · {post.createdAt} */}
                        <span className="name">
                            {/* <strong>{post.name}</strong> */}
                            {post.name}
                        </span>
                        <span className="username">
                            @{post.username}
                        </span>
                        <span className="dot">
                            ·
                        </span>
                        <span className="created-date">
                            {getPostedTime(post.createdAt)}
                        </span>
                    </div>
                    <div className="content-container">
                        <p>{post.content}</p>
                    </div>
                    <div className="media-container">
                        {post.mediaURL && <img src={post.mediaURL} alt="" className="post-media" />}
                    </div>
                    <div className="likecommentbook-container">
                        <div className="like-icon action-icon-container">
                            <i class="fa-regular fa-heart action-icon"></i>{post.likes.likeCount > 0 && <span className="interaction-count">{post.likes.likeCount}</span>}
                        </div>
                        <div className="comment-icon action-icon-container">
                            <i class="fa-regular fa-comment action-icon"></i>{getCommentCount(post.comments) > 0 && <span className="interaction-count">{getCommentCount(post.comments)}</span>}
                        </div>
                        <div className="bookmark-icon action-icon-container">
                            <i class="fa-regular fa-bookmark action-icon"></i>
                        </div>
                        <div className="share-icon action-icon-container">
                            {/* <i class="fa-sharp fa-solid fa-arrow-up-from-bracket action-icon"></i> */}
                            {/* <i class="fa-regular fa-share-nodes"></i> */}
                            <FontAwesomeIcon icon={faShareNodes} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}