export const ACTIONS = {
    SET_USERSLIST: "set_userslist",
    SET_ALLPOSTS: "set_allposts",
    SET_TRENDING_TRUE: "set_trending_true",
    SET_LATEST_TRUE: "set_latest_true",
    RESET_LATEST_TRENDING: "reset_latest_trending",
    SET_BOOKMARKS: "set_bookmarks",
    SET_LIKED_POSTS: "set_liked_posts"
}

const {SET_USERSLIST, SET_ALLPOSTS,  SET_TRENDING_TRUE, SET_LATEST_TRUE, RESET_LATEST_TRENDING, SET_BOOKMARKS, SET_LIKED_POSTS} = ACTIONS;

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

        case RESET_LATEST_TRENDING: {
            return {...state, showPostsBy: {latest: false, trending: false}}
        }

        case SET_BOOKMARKS: {
            return {...state, bookmarks: [...action.payload]}
        }

        case SET_LIKED_POSTS: {
            return {...state, likedPosts: [...action.payload]}
        }

        default: {
            return {...state}
        }
        
    }

}