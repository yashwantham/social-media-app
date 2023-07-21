import { useContext, useEffect, useState } from "react";
import { TopNav } from "../../components/TopNav/TopNav";
import "./BookmarksPage.css";
import { DataContext } from "../../contexts/DataProvider";
import { PostCard } from "../HomePage/HomePageComponents/PostCard/PostCard";
import axios from "axios";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { useLocation } from "react-router-dom";

export function BookmarksPage() {

    // const location = useLocation();
    // console.log("Location in BM", location);

    const authToken = localStorage.getItem("userToken")

    const {dispatchData, dataState} = useContext(DataContext);

    const {SET_BOOKMARKS} = ACTIONS;

    const [bm, setBm] = useState([]);

    const getBookmarks = async () => {
        try {
            const response = await axios.get("/api/users/bookmark/", {headers: { authorization: authToken }})
            // console.log("getBookmarks", response)
            if(response.status === 200) {
                dispatchData({type: SET_BOOKMARKS, payload: response.data.bookmarks})
                setBm(response.data.bookmarks)
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getBookmarks();
    }, [dataState.bookmarks])

    const bookMarkedPosts = bm.map((bmId) => dataState.allPosts.find(({_id}) => _id === bmId ));

    return (
        <>
        <div className="bookmarks-page-container" style={{overflowY: dataState.modal ? "hidden" : "visible", maxHeight: dataState.modal ? "100vh" : "none"}}>
            <TopNav pageName={"Bookmarks"}/>
            {bookMarkedPosts.length === 0 ? <p className="zero-bm-msg">No Posts Bookmarked Yet!</p> : bookMarkedPosts.map((post) => <PostCard post={post}/>)}
        </div>
        </>
    )
}