import axios from "axios"
import { ACTIONS } from "../reducers/DataRedcuer"


const { SET_ALLPOSTS} = ACTIONS;

export const likePost = async (authToken, id, dispatchData) => {
    try {
        const response = await axios.post(`/api/posts/like/${id}`, {}, {headers: {authorization: authToken}})
        // console.log(response);
        if(response.status === 201) {
            dispatchData({type: SET_ALLPOSTS, payload: response.data.posts});
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const dislikePost = async (authToken, id, dispatchData) => {
    try {
        const response = await axios.post(`/api/posts/dislike/${id}`, {}, {headers: {authorization: authToken}})
        // console.log(response);
        if(response.status === 201) {
            dispatchData({type: SET_ALLPOSTS, payload: response.data.posts});
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const isPostLiked = (post, authState) => {
    return post?.likes?.likedBy.find(({username}) => username === authState.userData.username) ? true : false
}