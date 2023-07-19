import AuthActionTypes from './auth.types';

export const login = (token) => {
    return {
        type: AuthActionTypes.LOGIN,
        payload: token,
    };
};

export const logout = () => {
    return {
        type: AuthActionTypes.LOGOUT,
    };
};