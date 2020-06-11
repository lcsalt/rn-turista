import { SET_CREDENTIALS, SET_LOGOUT } from '../actions/auth.js';

const initialState = {
    isLoggedIn: false,
    token: '',
    role: '',
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CREDENTIALS:
            return {...state, 
                    token: action.token,
                    role: action.role,
                    isLoggedIn: true}
        case SET_LOGOUT:
            return {...state,
                token: '',
                role: '',
                isLoggedIn: false}
        default:
            return state;
    }
}

export default authReducer;