import { createContext, useEffect, useReducer } from "react"
import axios from "axios";

import { DataReducer } from "../reducers/DataRedcuer";
import { ACTIONS } from "../reducers/DataRedcuer";

export const DataContext = createContext();

const {SET_USERSLIST, SET_ALLPOSTS, SET_BOOKMARKS} = ACTIONS;


export function DataProvider({ children }) {

    const authToken = localStorage.getItem("userToken");

    const [dataState, dispatchData] = useReducer(DataReducer, { usersList: [], allPosts: [], showPostsBy: {latest: false, trending: false}, bookmarks:[], followers: [],
        following: [], modal: false, profilePageShow: {tweets: true, media: false, likes: false} })

    console.log("dataState", dataState)

    const getUsersList = async () => {
        try {
            const response = await axios.get("/api/users")
            // console.log("getUsersList",response)
            if(response.status === 200) {
                dispatchData({type: SET_USERSLIST, payload: response.data.users})
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const getAllPosts = async () => {
        try {
            const response = await axios.get("/api/posts")
            // console.log(response)
            if(response.status === 200) {
                dispatchData({type: SET_ALLPOSTS, payload: response.data.posts})
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const getBookmarks = async () => {
        try {
            const response = await axios.get("/api/users/bookmark/", {headers: { authorization: authToken }})
            // console.log("getBookmarks", response)
            if(response.status === 200) {
                dispatchData({type: SET_BOOKMARKS, payload: response.data.bookmarks})
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUsersList();
        getAllPosts();
        getBookmarks();
    }, [])

    return (
        <>
            <DataContext.Provider value={{dataState, dispatchData}}>{children}</DataContext.Provider>
        </>
    )
}