import { createContext, useEffect, useReducer } from "react"
import axios from "axios";

import { DataReducer } from "../reducers/DataRedcuer";
import { ACTIONS } from "../reducers/DataRedcuer";

export const DataContext = createContext();

const {SET_USERSLIST, SET_ALLPOSTS} = ACTIONS;


export function DataProvider({ children }) {

    const [dataState, dispatchData] = useReducer(DataReducer, { usersList: [], allPosts: [] })

    const getUsersList = async () => {
        try {
            const response = await axios.get("/api/users")
            console.log("getUsersList",response)
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

    useEffect(() => {
        getUsersList();
        getAllPosts();
    }, [])

    return (
        <>
            <DataContext.Provider value={{dataState}}>{children}</DataContext.Provider>
        </>
    )
}