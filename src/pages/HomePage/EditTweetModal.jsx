import "./EditTweetModal.css";

import { useContext, useState } from "react";
import ReactDOM from "react-dom";

import { Avatar } from "../../components/Avatar/Avatar";
import { AuthContext } from "../../contexts/AuthProvider";
import { DataContext } from "../../contexts/DataProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { createPost, editPost, uploadImageHandle } from "../../utils/postService";

export function EditTweetModal({editingPostId, setEditmodal, setShoweditdelete}) {

    // console.log({editingPostId})

    const authToken = localStorage.getItem("userToken")

    const { TOGGLE_EDIT_MODAL } = ACTIONS;

    const { authState } = useContext(AuthContext);
    const { dataState, dispatchData } = useContext(DataContext);

    const editingPost = dataState.allPosts.find(({_id}) => _id === editingPostId)

    const [postdata, setPostdata] = useState({...editingPost});

    const changeHandler = (e) => setPostdata((postdata) => ({ ...postdata, content: e.target.value }))

    const editPostHandler = () => {
        // console.log("tweet clicked")
        editPost(authToken, postdata, dispatchData);
        setEditmodal();
        setShoweditdelete();
        // dispatchData({ type: TOGGLE_EDIT_MODAL });
    }

    const closeEditModal = () => {
        setEditmodal();
        setShoweditdelete();
    }

    return ReactDOM.createPortal(
        <>
            <div className="edittweet-overlay"></div>


            <div className="edittweet-modal">

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
                                value={postdata.content}
                                onChange={(e) => changeHandler(e)}
                            ></textarea>
                            {/* <input type="text" className="posttext-wh" placeholder="What is happening?!"/> */}
                        </div>
                        <div className="media-post-btns">
                            {/* <div className="media-input-container">
                                <label htmlFor="media-input-mdl">
                                    <i className="fa-regular fa-image img-icon"></i>
                                </label>
                                <input
                                    type="file"
                                    id="media-input-mdl"
                                    name="media-input-mdl"
                                    className="choose-file"
                                    onChange={(e) => uploadImageHandle(e.target.files[0])}
                                />
                            </div> */}
                            <div className="post-btn-container-wh">
                                {postdata.content?.trim().length === 0 && <button className="post-btn-zerotext-wh">Tweet</button>}
                                {postdata.content?.trim().length !== 0 && <button className="post-btn-wh" onClick={editPostHandler}>Save</button>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="close-modal" onClick={closeEditModal}><FontAwesomeIcon icon={faXmark} className="closeicon" /></div>
            </div>
        </>, document.getElementById("portal")
    )
}