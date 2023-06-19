import { useContext } from "react";
import "./AllPostsList.css";
import { DataContext } from "../../../../contexts/DataProvider";
import { PostCard } from "../PostCard/PostCard";

export function AllPostList() {

    const {dataState} = useContext(DataContext);

    return (
        <>
         {dataState.allPosts.map((post) => <PostCard post={post}/>)}
        </>
    )
}