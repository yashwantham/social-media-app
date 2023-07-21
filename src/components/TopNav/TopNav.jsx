import { useContext } from "react";
import "./TopNav.css";
import { DataContext } from "../../contexts/DataProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

export function TopNav({ pageName, userId, editprofdmodal }) {

    const location = useLocation();
    console.log(location);

    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);
    const { dataState, dispatchData } = useContext(DataContext);

    const { SET_TRENDING_TRUE, SET_LATEST_TRUE } = ACTIONS;

    const getVisitedProfile = () => dataState.usersList.find(({ _id }) => _id === userId)


    const sortByTrending = () => dispatchData({ type: SET_TRENDING_TRUE })

    const sortByLatest = () => dispatchData({ type: SET_LATEST_TRUE })

    const navigateBack = () => {
        // console.log((location.state.from.pathname))
        navigate(location?.state?.from?.pathname)
    }

    return (
        <>
            <div className="topnav-container" style={{ zIndex: dataState.modal || dataState.verifiedModal || editprofdmodal ? 0 : 5 }}>
                {pageName !== "Profile" && pageName !== "OthersProfile" && pageName !== "Tweet" && <div className="page-title">
                    {pageName}
                </div>}
                {(pageName === "Home" || pageName === "Explore") && (
                    <div className="trending-latest-container">
                        <div className="latest" style={{ borderBottom: dataState.showPostsBy.latest ? "4px solid var(--primary-color)" : "none" }} onClick={sortByLatest}>
                            Latest
                        </div>
                        <div className="trending" style={{ borderBottom: dataState.showPostsBy.trending ? "4px solid var(--primary-color)" : "none" }} onClick={sortByTrending}>
                            Trending
                        </div>
                    </div>
                )}

                {(pageName === "Profile") && (
                    <div className="arrow-profilename-container">
                        <div className="leftarrow-pp">
                            <FontAwesomeIcon icon={faArrowLeft} className="arrowpp" onClick={navigateBack} />
                        </div>
                        <div className="profilename-tcount-container">
                            <div className="profilename">
                                {`${authState.userData.firstName} ${authState.userData.lastName}`}
                            </div>
                            <div className="tweetcount">
                                {dataState.allPosts.reduce((acc, { username }) => username === authState.userData.username ? acc + 1 : acc, 0)} Tweets
                            </div>
                        </div>
                    </div>
                )}

                {(pageName === "OthersProfile") && (
                    <div className="arrow-profilename-container">
                        <div className="leftarrow-pp">
                            <FontAwesomeIcon icon={faArrowLeft} className="arrowpp" onClick={navigateBack} />
                        </div>
                        <div className="profilename-tcount-container">
                            <div className="profilename">
                                {`${getVisitedProfile()?.firstName} ${getVisitedProfile()?.lastName}`}
                            </div>
                            <div className="tweetcount">
                                {dataState.allPosts.reduce((acc, { username }) => username === getVisitedProfile().username ? acc + 1 : acc, 0)} Tweets
                            </div>
                        </div>
                    </div>
                )}

                {(pageName === "Tweet") && (
                    <div className="arrow-tweet-container">
                        <div className="leftarrow-pp">
                            <FontAwesomeIcon icon={faArrowLeft} className="arrowpp" onClick={navigateBack} />
                        </div>
                        <div className="page-title">
                            {pageName}
                        </div>
                    </div>
                )

                }

            </div>
        </>
    )
}