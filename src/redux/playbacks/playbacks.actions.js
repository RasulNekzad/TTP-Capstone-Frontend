import axios from "axios";
import PlaybacksActionType from "./playbacks.types";

export const fetchAllPlaybacks = (payload) => ({
  type: PlaybacksActionType.FETCH_ALL_PLAYBACKS,
  payload,
});

export const fetchAllPlaybacksThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/playback/`);
      console.log("THUNK API CALL ALL PLAYBACKS =>", response.data);
      dispatch(fetchAllPlaybacks(response.data));
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
        `http://localhost:8080/api/playback/${userId}/${songId}`
      );
      console.log("THUNK API CALL PLAYBACK", response.data);
      dispatch(fetchPlayback(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};
