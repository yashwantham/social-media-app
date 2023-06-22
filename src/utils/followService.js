import axios from "axios";
import { ACTIONS } from "../reducers/AuthRedcuer";
import { ACTIONS as  ACTIONSDR} from "../reducers/DataRedcuer";


const { SET_USER_DATA } = ACTIONS;
const {UPDATE_USERLIST, SET_FOLLOWING} = ACTIONSDR;

export const follow = async (id, authToken, dispatchData, dispatchAuth) => {
  try {
    const response = await axios.post(
      `/api/users/follow/${id}`,
      {},
      { headers: { authorization: authToken } }
    );
    // console.log(response);
    if(response.status === 200) {
        dispatchAuth({type: SET_USER_DATA, payload: response.data.user});
        dispatchData({type: UPDATE_USERLIST, payload: response.data.followUser});
        dispatchData({type: SET_FOLLOWING, payload: response.data.user.following});
    }
  } catch (error) {
    console.log(error);
  }
};


export const unfollow = async (id, authToken, dispatchData, dispatchAuth) => {
    try {
        const response = await axios.post(
            `/api/users/unfollow/${id}`,
            {},
            { headers: { authorization: authToken } }
          );
        //   console.log(response);
        if(response.status === 200) {
            dispatchAuth({type: SET_USER_DATA, payload: response.data.user});
            dispatchData({type: UPDATE_USERLIST, payload: response.data.followUser});
            dispatchData({type: SET_FOLLOWING, payload: response.data.user.following});
        }
    }
    catch (error) {

    }
}

export const isFollowing = (id, dataState) => {
    return dataState.following.find(({_id}) => _id === id) ? true : false;
}