import axios from "axios"
import { ACTIONS } from "../reducers/DataRedcuer";

const { SET_ALLPOSTS } = ACTIONS;

export const createPost = async (authToken, post, userData, dispatchData) => {
    try {
        const response = await axios.post("/api/posts", {postData: {content: post.content, mediaURL: post.postImage, name: `${userData.firstName} ${userData.lastName}`}}, {headers: {authorization: authToken}})
        console.log({response});
        if(response.status === 201) {
            dispatchData({type: SET_ALLPOSTS, payload: response.data.posts})
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const deletePost = async ( authToken, postId, dispatchData ) => {
    try {
        const response = await axios.delete(`/api/posts/${postId}`, {headers: {authorization: authToken}})
        // console.log({response});
        if(response.status === 201) {
            dispatchData({type: SET_ALLPOSTS, payload: response.data.posts})
        }
    }
    catch (error) {
        console.error(error)
    }
}