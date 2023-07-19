import React, { useEffect } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { login, logout } from '../redux/auth/auth.actions';
import {useDispatch, useSelector} from "react-redux";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    logout: () => {},
    login: (token) => {}
})

export const AuthContextProvider = (props) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        return onIdTokenChanged(auth, (user) => {
            if (user) {
                dispatch(login(user.uid));
            } else {
                dispatch(logout());
            }
        });
    });

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        dispatch(login(token));
    };

    const logoutHandler = () => {
        auth.signOut().then(() => {
            dispatch(logout());
        });
    };

    const contextValue = {
        userId: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;