import { useContext, useState } from "react";
import "./AllPostsList.css";
import { DataContext } from "../../../../contexts/DataProvider";
import { PostCard } from "../PostCard/PostCard";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { Spinner } from "../../../../components/Spinner/Spinner";

export function AllPostList() {

    const {dataState} = useContext(DataContext);
    const {authState} = useContext(AuthContext);

    let postsToDisplay = [...dataState.allPosts];

    const isFollowingCheckbyUsername = (inUsername) =>  dataState.following.find(({username}) => username === inUsername) ? true : false

    postsToDisplay = dataState.allPosts.filter(({username}) => username === authState.userData.username || isFollowingCheckbyUsername(username))

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