import axios from "axios";
import PlaybacksActionType from "./playbacks.types";
import { async } from "q";
import user from "../../components/userProfile";

export const fetchAllPlaybacks = (payload) => ({
  type: PlaybacksActionType.FETCH_ALL_PLAYBACKS,
  payload,
});

export const fetchAllPlaybacksThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}playback/`
      );
      console.log("THUNK API CALL ALL PLAYBACKS =>", response.data.content);
      dispatch(fetchAllPlaybacks(response.data.content));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchPlayback = (payload) => ({
  type: PlaybacksActionType.FETCH_PLAYBACK,
  payload,
});

export const fetchPlaybackThunk = (songId, userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}playback/${userId}/${songId}`
      );
      console.log("THUNK API CALL PLAYBACK", response.data);
      dispatch(fetchPlayback(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createPlayback = (payload) => ({
  type: PlaybacksActionType.CREATE_PLAYBACK,
  payload,
});

export const createPlaybackThunk = (newPlayback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}playback/`,
        newPlayback
      );
      dispatch(createPlayback(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchPersonalPlayback = (payload) => ({
  type: PlaybacksActionType.FETCH_PERSONAL_PLAYBACKS,
  payload,
});

export const fetchPersonalPlaybackThunk = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}playback/${userId}`
      );
      console.log("THUNK API CALL PERSONAL PLAYBACK =>", response.data.content);
      dispatch(fetchPersonalPlayback(response.data.content));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchPlaybackState = (payload) => ({
  type: PlaybacksActionType.FETCH_PLAYBACK_STATE,
  payload,
});

export const fetchPlaybackStateThunk = (user_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}song/playback-state?user_id=${user_id}`
      );
      console.log("THUNK API CALL PLAYBACK STATE =>", response.data);
      dispatch(fetchPlaybackState(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchActivePlaybacks = (payload) => ({
  type: PlaybacksActionType.FETCH_ACTIVE_PLAYBACKS,
  payload,
});

export const fetchActivePlaybacksThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}active-playback/`
      );
      dispatch(fetchActivePlaybacks(response.data.content));
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeActivePlaybacksForUser = (payload) => ({
  type: PlaybacksActionType.REMOVE_ACTIVE_PLAYBACKS_FOR_USER,
  payload,
});

export const removeActivePlaybacksForUserThunk = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}active-playback/${userId}`
      );
      dispatch(removeActivePlaybacksForUser(userId));
    } catch (error) {
      console.error(error);
    }
  };
};
