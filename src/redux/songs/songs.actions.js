import axios from "axios";
import SongsActionType from "./songs.types";

export const fetchAllSongs = (payload) => ({
  type: SongsActionType.FETCH_ALL_SONGS,
  payload,
});

export const fetchAllSongsThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/song/`);
      dispatch(fetchAllSongs(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSong = (payload) => ({
  type: SongsActionType.FETCH_SONG,
  payload,
});

export const fetchSongThunk = (accessToken, songId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${songId}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      console.log("SPOTIFY API CALL SONG =>", response.data);
      dispatch(fetchSong(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchCurrentPlayingSong = (payload) => ({
  type: SongsActionType.FETCH_CURRENT_PLAYING_SONG,
  payload,
});

export const fetchCurrentPlayingSongThunk = (userUID) => {
  return async (dispatch) => {
    try {
      console.log(userUID)
      const response = await axios.get(
        `http://localhost:8080/api/song/currently-playing?user_id=${userUID}`
      );
      console.log("SPOTIFY API CALL CURRENT PLAYING SONG =>", response.data);
      dispatch(fetchCurrentPlayingSong(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addSong = (payload) => ({
  type: SongsActionType.ADD_SONG,
  payload,
});

/**
 * song = {
    "title": "somesong",
    "artist": "someartist",
    "image_url": "imageurl",
    "external_url": "externalurl"
    "preview_url": "preview_url"
    }
 */
export const addSongThunk = (song) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/song/`,
        song
      );
      console.log("API CALL ADD SONG =>", response.data);
      dispatch(addSong(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};
