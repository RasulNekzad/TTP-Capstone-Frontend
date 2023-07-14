import axios from "axios";
import SongsActionType from "./songs.types";

export const fetchSong = (payload) => ({
  type: SongsActionType.FETCH_SONG,
  payload,
});

export const fetchSongThunk = (accessToken) => {
    return async (dispatch) => {
        try {
            // boilerplate for now, access token required to fetch song from spotify       
        } catch (error) {
            console.error(error);
        }
    }
}