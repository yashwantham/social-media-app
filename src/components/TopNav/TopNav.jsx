import { useContext } from "react";
import "./TopNav.css";
import { DataContext } from "../../contexts/DataProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";

export function TopNav({pageName}) {

    
    const { SET_TRENDING_TRUE, SET_LATEST_TRUE} = ACTIONS;

    const {dataState, dispatchData} = useContext(DataContext);

    const sortByTrending = () => dispatchData({type: SET_TRENDING_TRUE})

    const sortByLatest = () => dispatchData({type: SET_LATEST_TRUE})

    return (
        <>
            <div className="topnav-container">
                <div className="page-title">
                    {pageName}
                </div>
                {(pageName === "Home" || pageName === "Explore") && (
                    <div className="trending-latest-container">
                        <div className="latest" style={{borderBottom: dataState.showPostsBy.latest ? "4px solid var(--primary-color)" : "none"}} onClick={sortByLatest}>
                            Latest
                        </div>
                        <div className="trending" style={{borderBottom: dataState.showPostsBy.trending ? "4px solid var(--primary-color)" : "none"}} onClick={sortByTrending}>
                            Trending
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}