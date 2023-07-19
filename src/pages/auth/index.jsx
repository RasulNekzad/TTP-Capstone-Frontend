import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyOAuthThunk } from "../../redux/user/user.actions";
import AuthForm from "../../components/auth/AuthForm";

function Auth() {
    const dispatch = useDispatch();
    const fetchSpotifyOAuth = () => {
        console.log('RUNNING DISPATCH FROM FETCHSPOTIFYOAUTH')
        return dispatch(fetchSpotifyOAuthThunk());
    };
    // Define the callback function to be passed to AuthForm
    const handleSpotifyOAuthClick = () => {
        console.log('Spotify button clicked. Triggering fetchSpotifyOAuth...');
        fetchSpotifyOAuth();
    };
    return <AuthForm onSpotifyAuthClick={handleSpotifyOAuthClick}/>;
}

export default Auth;
