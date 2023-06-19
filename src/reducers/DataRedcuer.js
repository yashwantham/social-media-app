export const ACTIONS = {
    SET_USERSLIST: "set_userslist",
    SET_ALLPOSTS: "set_allposts"
}

const {SET_USERSLIST, SET_ALLPOSTS} = ACTIONS;

export const DataReducer = (state, action) => {

    switch(action.type) {

        case SET_USERSLIST: {
            return {...state, usersList: [...action.payload]}
        }

        case SET_ALLPOSTS: {
            return {...state, allPosts: [...action.payload]}
        }

        default: {
            return {...state}
        }
        
    }

}