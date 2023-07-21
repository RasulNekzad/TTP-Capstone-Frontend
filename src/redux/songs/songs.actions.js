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

export const fetchCurrentPlayingSongThunk = (access_token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/song/currently-playing?access_token=${access_token}`
      );
      console.log("SPOTIFY API CALL CURRENT PLAYING SONG =>", response.data);
      if (response.data.is_playing) {
        const title = response.data.item.name;
        const artist = response.data.item.artists[0].name;
        const imageUrl = response.data.item.album.images[0].url;
        const externalUrl = response.data.item.external_urls.spotify;
        const song = {
          title: title,
          artist: artist,
          image_url: imageUrl,
          external_url: externalUrl,
        };
        dispatch(fetchCurrentPlayingSong(song));
        dispatch(addSongThunk(song));
      }
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
