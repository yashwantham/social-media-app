export const ACTIONS = {
    SET_LOGIN_TRUE: "set_login_true",
    SET_LOGIN_FALSE: "set_login_false",
    SET_USER_DATA: "set_user_data"
}

const { SET_LOGIN_TRUE, SET_LOGIN_FALSE, SET_USER_DATA} = ACTIONS;

export const AuthReducer = (state, action) => {
    switch(action.type) {

        case SET_LOGIN_TRUE: {
            return {...state, isLoggedin: true}
        }

        case SET_LOGIN_FALSE: {
            return {...state, isLoggedin: false}
        }

        case SET_USER_DATA: {
            return {...state, userData: {...action.payload}}
        }

        default: {
            return {...state}
        }

    }
}