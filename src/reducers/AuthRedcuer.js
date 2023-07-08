export const ACTIONS = {
    SET_LOGIN_TRUE: "set_login_true",
    SET_LOGIN_FALSE: "set_login_false",
    SET_USER_DATA: "set_user_data",
    RESET_AUTH: "reset_auth"
}

const { SET_LOGIN_TRUE, SET_LOGIN_FALSE, SET_USER_DATA, RESET_AUTH} = ACTIONS;

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

        case RESET_AUTH: {
            return {...state, isLoggedin: false, userData: {}}
        }

        default: {
            return {...state}
        }

    }
}