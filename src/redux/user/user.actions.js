import axios from "axios";

import UserActionType from "./user.types";

export const fetchUserProfile = (payload) => {
  console.log("FETCH USER PROFILE ACTION");
  return {
    payload: payload,
    type: UserActionType.FETCHING_USER_PROFILE,
  };
};

export const fetchSpotifyOAuth = (payload) => {
  console.log("FETCH USER PROFILE ACTION");
  return {
    type: UserActionType.FETCHING_SPOTIFY_OAUTH,
    payload: payload,
  };
};

export const fetchUserProfileThunk = (userId) => {
  return async (dispatch) => {
    try {
      console.log("FETCHUSERPROFILETHUNK IS FIRING");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`
      );
      console.log("FETCHUSERPROFILETHUNK COMPLETED TO =>", response.data);
      dispatch(fetchUserProfile(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSpotifyOAuthThunk = () => {
  return async (dispatch) => {
    try {
      console.log("FETCHSPOTIFYOAUTHTHUNK IS FIRING");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/spotify/login`
      );
      console.log("FETCHSPOTIFYOAUTHTHUNK COMPLETED");
      dispatch(fetchSpotifyOAuth());
      window.location.href = response.data.authURL;
    } catch (error) {
      console.error(error);
    }
  };
};

export const refreshToken = async (refresh_token) => {
    try {
      console.log("REFRESHTOKEN IS FIRING");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/spotify/refresh_token?refresh_token=${refresh_token}`
      );
      console.log("REFRESHTOKEN COMPLETED =>", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};
