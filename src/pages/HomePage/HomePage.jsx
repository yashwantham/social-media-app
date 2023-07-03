import { useContext, useEffect } from "react";
import { Avatar } from "../../components/Avatar/Avatar";
import { TopNav } from "../../components/TopNav/TopNav";
import "./HomePage.css";
import { AllPostList } from "./HomePageComponents/AllPostsList/AllPostsList";
import { AuthContext } from "../../contexts/AuthProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { DataContext } from "../../contexts/DataProvider";
import { CreateTweetModal } from "./CreateTweetModal";

export function HomePage() {

    const { RESET_LATEST_TRENDING  } = ACTIONS;

    const { authState } = useContext(AuthContext);

    const { dataState, dispatchData } = useContext(DataContext);

    // const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatchData({ type: RESET_LATEST_TRENDING })
    }, [])

    // const toggleModal = () => dispatchData({type: TOGGLE_MODAL})

    return (
        <>

            {/* Modal */}

            <div className="home-page-container" style={{overflowY: dataState.modal ? "hidden" : "visible", maxHeight: dataState.modal ? "100vh" : "none"}}>
                <TopNav pageName="Home" />

                <div className="whats-happening-cotainer">
                    <div className="avatar-container-wh">
                        <Avatar imgSrc={authState.userData.avatar} userId={authState.userData._id} />
                    </div>
                    <div className="input-n-post-container">
                        <div className="posttext-input-container">
                            <textarea name="" id="" className="posttext-wh" placeholder="What is happening?!"></textarea>
                            {/* <input type="text" className="posttext-wh" placeholder="What is happening?!"/> */}
                        </div>
                        <div className="media-post-btns">
                            <div className="media-input-container">
                                <label htmlFor="media-input"><i class="fa-regular fa-image img-icon"></i></label><input type="file" id="media-input" name="" className="choose-file" />
                            </div>
                            <div className="post-btn-container-wh">
                                <button className="post-btn-wh">
                                    Tweet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <h1>Home Page</h1> */}

                <AllPostList />
            </div>
        </>
    )
}