import { useContext, useState } from "react";
import ReactDOM from "react-dom";

import { Avatar } from "../../components/Avatar/Avatar";
import "./CreateTweetModal.css";
import { AuthContext } from "../../contexts/AuthProvider";
import { DataContext } from "../../contexts/DataProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { createPost } from "../../utils/postService";

export function CreateTweetModal() {

    const authToken = localStorage.getItem("userToken")

    const { TOGGLE_MODAL } = ACTIONS;

    const { authState } = useContext(AuthContext);
    const { dispatchData } = useContext(DataContext);

    const [postdata, setPostdata] = useState({content: "", postImage: ""});

    const changeHandler = (e) => setPostdata((postdata) => ({...postdata, content: e.target.value}))

    const createPostHandler = () => {
        // console.log("tweet clicked")
        createPost(authToken, postdata, authState.userData, dispatchData);
        dispatchData({type: TOGGLE_MODAL});
    }

    return ReactDOM.createPortal(
        <>
            <div className="overlay" onClick={() => dispatchData({type: TOGGLE_MODAL})}></div>
            

            <div className="createtweet-modal">
                
                <div className="whats-happening-cotainer-modal">
                    <div className="avatar-container-wh">
                        <Avatar
                            imgSrc={authState.userData.avatar}
                            userId={authState.userData._id}
                        />
                    </div>
                    <div className="input-n-post-container">
                        <div className="posttext-input-container">
                            <textarea
                                name=""
                                id=""
                                className="posttext-wh"
                                placeholder="What is happening?!"
                                onChange={(e) => changeHandler(e)}
                            ></textarea>
                            {/* <input type="text" className="posttext-wh" placeholder="What is happening?!"/> */}
                        </div>
                        <div className="media-post-btns">
                            <div className="media-input-container">
                                <label htmlFor="media-input">
                                    <i class="fa-regular fa-image img-icon"></i>
                                </label>
                                <input
                                    type="file"
                                    id="media-input"
                                    name=""
                                    className="choose-file"
                                />
                            </div>
                            <div className="post-btn-container-wh">
                                {postdata.content?.trim().length === 0 && <button className="post-btn-zerotext-wh">Tweet</button>}
                                {postdata.content?.trim().length !== 0 && <button className="post-btn-wh" onClick={createPostHandler}>Tweet</button> }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="close-modal" onClick={() => dispatchData({type: TOGGLE_MODAL})}><FontAwesomeIcon icon={faXmark} className="closeicon"/></div>
            </div>
        </>, document.getElementById("portal")
    )
}