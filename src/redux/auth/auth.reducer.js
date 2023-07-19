import { LOGIN, LOGOUT } from './auth.types';
import AuthActionTypes from "./auth.types";

const initialState = {
    token: '',
    isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true,
            };
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                token: '',
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default authReducer;