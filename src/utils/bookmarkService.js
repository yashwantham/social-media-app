import axios from "axios"
import { ACTIONS } from "../reducers/DataRedcuer";


const {SET_BOOKMARKS} = ACTIONS;

export const addToBookmark = async (authToken, post, dispatchData) => {

    try {
        const response = await axios.post(`/api/users/bookmark/${post._id}`, {}, {headers: {authorization: authToken}})
        // console.log(response);
        if(response.status === 200) {
            dispatchData({type: SET_BOOKMARKS, payload: response.data.bookmarks})
        }
    }
    catch (error) {
        console.error(error)
    }

}

export const removeFromBookmark = async (authToken, id, dispatchData) => {

    try {
        const response = await axios.post(`/api/users/remove-bookmark/${id}`, {}, {headers: {authorization: authToken}})
        // console.log(response);
        if(response.status === 200) {
            dispatchData({type: SET_BOOKMARKS, payload: response.data.bookmarks})
        }
    }
    catch (error) {
        console.error(error)
    }

}

export const isPostBookmarked = (id, dataState) => {
    return dataState.bookmarks.find(({_id}) => _id === id ) ? true : false;
}