import { useContext, useEffect } from "react";
import { Avatar } from "../../components/Avatar/Avatar";
import { TopNav } from "../../components/TopNav/TopNav";
import "./HomePage.css";
import { AllPostList } from "./HomePageComponents/AllPostsList/AllPostsList";
import { AuthContext } from "../../contexts/AuthProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { DataContext } from "../../contexts/DataProvider";

export function HomePage() {

    const { RESET_LATEST_TRENDING } = ACTIONS;

    const { authState } = useContext(AuthContext);

    const {dispatchData} = useContext(DataContext);

    useEffect(() => {
        dispatchData({type: RESET_LATEST_TRENDING})
    }, [])

    return (
        <>
            <div className="home-page-container">
                <TopNav pageName="Home" />

                <div className="whats-happening-cotainer">
                    <div className="avatar-container-wh">
                        <Avatar imgSrc={authState.userData.avatar} />
                    </div>
                    <div className="input-n-post-container">
                        <div className="posttext-input-container">
                            <textarea name="" id="" className="posttext-wh" placeholder="What is happening?!"></textarea>
                            {/* <input type="text" className="posttext-wh" placeholder="What is happening?!"/> */}
                        </div>
                        <div className="media-post-btns">
                            <div className="media-input-container">
                                <label htmlFor="media-input"><i class="fa-regular fa-image img-icon"></i></label><input type="file" id="media-input" name="" className="choose-file"/>
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