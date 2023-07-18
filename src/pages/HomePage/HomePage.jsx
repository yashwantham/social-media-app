import { useContext, useEffect, useState } from "react";
import { Avatar } from "../../components/Avatar/Avatar";
import { TopNav } from "../../components/TopNav/TopNav";
import "./HomePage.css";
import { AllPostList } from "./HomePageComponents/AllPostsList/AllPostsList";
import { AuthContext } from "../../contexts/AuthProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { DataContext } from "../../contexts/DataProvider";
import { createPost } from "../../utils/postService";
import { successToastmessage } from "../../components/Toastmessage/successToastmessage";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "../../components/Spinner/Spinner";

export function HomePage() {


    const authToken = localStorage.getItem("userToken");

    const { RESET_LATEST_TRENDING, SET_LATEST_TRUE } = ACTIONS;

    const { authState } = useContext(AuthContext);

    const { dataState, dispatchData } = useContext(DataContext);

    // const [loading, setLoading] = useState(true);

    // const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatchData({ type: RESET_LATEST_TRENDING })
    }, [])

    // const toggleModal = () => dispatchData({type: TOGGLE_MODAL})

    const [postdata, setPostdata] = useState({ content: "", postImage: "" });

    const changeHandler = (e) => setPostdata((postdata) => ({ ...postdata, content: e.target.value }))

    const imageUploadHandler = (e) => {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setPostdata((postdata) => ({ ...postdata, postImage: imageUrl }));
        console.log("image uploaded", postdata);
    }

    const removeImageHandler = (e) => {
        setPostdata((postdata) => ({ ...postdata, postImage: "" }));
        // URL.revokeObjectURL(postdata.postImage)
    }

    const createPostHandler = () => {
        // console.log("tweet clicked")
        createPost(authToken, postdata, authState.userData, dispatchData);
        setPostdata(() => ({ content: "", postImage: "" }));
        dispatchData({ type: SET_LATEST_TRUE });
        successToastmessage("Your Tweet was sent");
    }

    return (
        <>
            <div className="home-page-container" style={{ overflowY: dataState.modal ? "hidden" : "visible", maxHeight: dataState.modal ? "100vh" : "none" }}>
                <TopNav pageName="Home" />

                <div className="whats-happening-cotainer">
                    <div className="avatar-container-wh">
                        <Avatar imgSrc={authState.userData.avatar} userId={authState.userData._id} />
                    </div>
                    <div className="input-n-post-container">
                        <div className="posttext-input-container">
                            <div className="textarea-container-post">
                                <textarea name="" id="" className="posttext-wh" placeholder="What is happening?!" value={postdata.content} onChange={(e) => changeHandler(e)}></textarea>
                            </div>
                            {/* <input type="text" className="posttext-wh" placeholder="What is happening?!"/> */}
                            {postdata.postImage.length !== 0 && <div className="posting-img">
                                <img src={postdata.postImage} alt="" className="selectedingtopost" />
                                <div className="remove-image-container" onClick={removeImageHandler}>
                                    <FontAwesomeIcon icon={faXmark} className="removeimageicon" />
                                </div>
                            </div>}
                        </div>
                        <div className="media-post-btns">
                            <div className="media-input-container">
                                <label htmlFor="media-input"><i class="fa-regular fa-image img-icon"></i></label>
                                <input key={postdata.postImage} type="file" id="media-input" name="" className="choose-file" onChange={imageUploadHandler} />
                            </div>
                            <div className="post-btn-container-wh">
                                {postdata.content?.trim().length === 0 && postdata.postImage.length === 0 && <button className="post-btn-zerotext-wh">Tweet</button>}
                                {(postdata.content?.trim().length !== 0 || postdata.postImage.length !== 0) && <button className="post-btn-wh" onClick={createPostHandler}>Tweet</button>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <h1>Home Page</h1> */}

                <AllPostList />
            </div>
            <ToastContainer />
        </>
    )
}