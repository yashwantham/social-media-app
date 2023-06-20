export const ACTIONS = {
    SET_USERSLIST: "set_userslist",
    SET_ALLPOSTS: "set_allposts",
    SET_TRENDING_TRUE: "set_trending_true",
    SET_LATEST_TRUE: "set_latest_true"
}

const {SET_USERSLIST, SET_ALLPOSTS,  SET_TRENDING_TRUE, SET_LATEST_TRUE} = ACTIONS;

export const DataReducer = (state, action) => {

    switch(action.type) {

        case SET_USERSLIST: {
            return {...state, usersList: [...action.payload]}
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

        default: {
            return {...state}
        }
        
    }

}