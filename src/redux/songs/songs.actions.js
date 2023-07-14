import axios from "axios";
import SongsActionType from "./songs.types";

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

export const fetchCurrentPlayingSongThunk = (accessToken) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/player/currently-playing`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        console.log("SPOTIFY API CALL CURRENT PLAYING SONG =>", response.data);
        dispatch(fetchCurrentPlayingSong(response.data));
      } catch (error) {
        console.error(error);
      }
    };
}
