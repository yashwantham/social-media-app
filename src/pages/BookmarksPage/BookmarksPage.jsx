import { useContext } from "react";
import { TopNav } from "../../components/TopNav/TopNav";
import "./BookmarksPage.css";
import { DataContext } from "../../contexts/DataProvider";
import { PostCard } from "../HomePage/HomePageComponents/PostCard/PostCard";

export function BookmarksPage() {

    const {dataState} = useContext(DataContext);

    return (
        <>
        <div className="bookmarks-page-container">
            <TopNav pageName={"Bookmarks"}/>
            {dataState.bookmarks.map((post) => <PostCard post={post}/>)}
        </div>
        </>
    )
}