import { useContext, useEffect } from "react";
import { TopNav } from "../../components/TopNav/TopNav";
import "./ExplorePage.css";
import { DataContext } from "../../contexts/DataProvider";
import { PostCard } from "../HomePage/HomePageComponents/PostCard/PostCard";
import { ACTIONS } from "../../reducers/DataRedcuer";

export function ExplorePage() {

    
const { RESET_LATEST_TRENDING } = ACTIONS;

    const {dataState, dispatchData} = useContext(DataContext);

    let postsToDisplay = [...dataState.allPosts];

    if(dataState.showPostsBy.latest) { //sort by date
        postsToDisplay = postsToDisplay.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } 
    else if(dataState.showPostsBy.trending) { //sort by trending
        postsToDisplay = postsToDisplay.sort((a, b) => b.likes.likeCount - a.likes.likeCount)
    }

    useEffect(() => {
        dispatchData({type: RESET_LATEST_TRENDING})
    }, [])

    return (
        <>
        <div className="explore-page-container">
            <TopNav pageName="Explore"/>

            {postsToDisplay.map((post) => <PostCard post={post}/>)}
        </div>
        </>
    )
}