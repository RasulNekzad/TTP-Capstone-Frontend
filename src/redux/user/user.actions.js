import axios from "axios";

import UserActionType from "./user.types";
import user from "../../components/userProfile";

export const fetchUserProfile = (payload) => {
  console.log("FETCH USER PROFILE ACTION");
  return {
    payload: payload,
    type: UserActionType.FETCHING_USER_PROFILE,
    payload,
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

export const fetchUpdatedAt = (payload) => {
  return {
    type: UserActionType.FETCHING_UPDATEDAT,
    payload,
  };
};

export const fetchUpdatedAtThunk = (userId) => {
  return async (dispatch) => {
    try {
      console.log("FETCHUPDATEDATTHUNK IS FIRING");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`
      );
      console.log("FETCHUPDATEATTHUNK COMPLETED", response.data.updatedAt);
      dispatch(fetchUpdatedAt(new Date(response.data.updatedAt)));
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
      dispatch(fetchSpotifyOAuth(Date.now()));
      window.location.href = response.data.authURL;
    } catch (error) {
      console.error(error);
    }
  };
};

export const refreshToken = (payload) => {
  console.log("REFRESH TOKEN ACTION");
  return {
    type: UserActionType.REFRESH_TOKEN,
    payload,
  };
};
export const refreshTokenThunk = (userId) => {
  return async (dispatch) => {
    try {
      console.log("REFRESHTOKEN IS FIRING");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/spotify/refresh_token/${userId}`
      );
      console.log("REFRESHTOKEN COMPLETED =>", response.data);
      dispatch(refreshToken(response.data.updatedAt));
    } catch (error) {
      console.error(error);
    }
  };
};
