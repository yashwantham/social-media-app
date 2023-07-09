import { useContext } from "react";
import "./AllPostsList.css";
import { DataContext } from "../../../../contexts/DataProvider";
import { PostCard } from "../PostCard/PostCard";

export function AllPostList() {

    const {dataState} = useContext(DataContext);

    let postsToDisplay = [...dataState.allPosts];

    if(dataState.showPostsBy.latest) { //sort by date
        postsToDisplay = postsToDisplay.sort((a, b) => {
            // a = new Date(a.createdAt)
            // b = new Date(b.createdAt)
            // if(a.getFullYear() !== b.getFullYear()) return b.getFullYear() - a.getFullYear()
            // else if(a.getMonth() !== b.getMonth()) return b.getMonth() - a.getMonth()
            // else if(a.getDate() !== b.getDate()) return b.getDate() - a.getDate()
            // else if(a.getHours() !== b.getHours()) return b.getHours() - a.getHours()
            // else return b.getMinutes() - a.getMinutes()
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
    } 
    else if(dataState.showPostsBy.trending) { //sort by trending
        postsToDisplay = postsToDisplay.sort((a, b) => b.likes.likeCount - a.likes.likeCount)
    }

    return (
        <>
         {postsToDisplay.map((post) => <PostCard post={post} key={post._id}/>)}
        </>
    )
}