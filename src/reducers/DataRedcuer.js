export const ACTIONS = {
    SET_USERSLIST: "set_userslist",
    UPDATE_USERLIST: "update_userlist",
    SET_ALLPOSTS: "set_allposts",
    SET_TRENDING_TRUE: "set_trending_true",
    SET_LATEST_TRUE: "set_latest_true",
    RESET_LATEST_TRENDING: "reset_latest_trending",
    SET_BOOKMARKS: "set_bookmarks",
    SET_FOLLOWING: "set_following"

}

const {SET_USERSLIST, UPDATE_USERLIST, SET_ALLPOSTS,  SET_TRENDING_TRUE, SET_LATEST_TRUE, RESET_LATEST_TRENDING, SET_BOOKMARKS, SET_FOLLOWING} = ACTIONS;

export const DataReducer = (state, action) => {

    switch(action.type) {

        case SET_USERSLIST: {
            return {...state, usersList: [...action.payload]}
        }

        // After follow - set the follwed user's data, we get the updated follwers array in his dat
        case UPDATE_USERLIST: {
            const updatedUserlist = state.usersList.map((user) => user._id === action.payload._id ? action.payload : user)
            return {...state, usersList: [...updatedUserlist]}
        }

        case SET_ALLPOSTS: {
            return {...state, allPosts: [...action.payload]}
        }

        case  SET_TRENDING_TRUE: {
            return {...state, showPostsBy: {latest: false, trending: true}}
        }

        case  SET_LATEST_TRUE: {
            return {...state, showPostsBy: {latest: true, trending: false}}
        }

        case RESET_LATEST_TRENDING: {
            return {...state, showPostsBy: {latest: false, trending: false}}
        }

        case SET_BOOKMARKS: {
            return {...state, bookmarks: [...action.payload]}
        }

        case SET_FOLLOWING: {
            return {...state, following: [...action.payload]}
        }

        default: {
            return {...state}
        }
        
    }

}