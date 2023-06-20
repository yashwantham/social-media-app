import { useContext } from "react";
import { Avatar } from "../../components/Avatar/Avatar";
import { TopNav } from "../../components/TopNav/TopNav";
import "./HomePage.css";
import { AllPostList } from "./HomePageComponents/AllPostsList/AllPostsList";
import { AuthContext } from "../../contexts/AuthProvider";

export function HomePage() {

    const {authState} = useContext(AuthContext);

    return (
        <>
        <div className="home-page-container">
            <TopNav pageName="Home"/>

            <div className="whats-happening-cotainer">
                <div className="avatar-container-wh">
                    <Avatar imgSrc={authState.userData.avatar}/>
                </div>
                 <div className="input-n-post-container">
                    <div className="posttext-input-container">
                        <textarea name="" id="" className="posttext-wh" placeholder="What is happening?!"></textarea>
                        {/* <input type="text" className="posttext-wh" placeholder="What is happening?!"/> */}
                    </div>
                    <div className="media-post-btns">
                        <div className="media-input-container">
                        <i class="fa-regular fa-image img-icon"></i>
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

            <AllPostList/>
        </div>
        </>
    )
}