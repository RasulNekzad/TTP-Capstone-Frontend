import SongsActionType from "./songs.types";

export const INITIAL_SONGS_STATE = {
  songs: null,
  song: {},
  currentPlaying: {},
};

const songsReducer = (state = INITIAL_SONGS_STATE, action) => {
  switch (action.type) {
    case SongsActionType.FETCH_ALL_SONGS:
      return { ...state, songs: action.payload };

    case SongsActionType.FETCH_SONG:
      return { ...state, song: action.payload };

    case SongsActionType.FETCH_CURRENT_PLAYING_SONG:
      const title = action.payload.item.name;
      const artist = action.payload.item.artists[0].name;
      const imageUrl = action.payload.item.album.images[0].url;
      const externalUrl = action.payload.item.external_urls.spotify;
      const songObject = {
        title: title,
        artist: artist,
        image_url: imageUrl,
        external_url: externalUrl,
      };
      return { ...state, currentPlaying: songObject };

    case SongsActionType.ADD_SONG:
      return { ...state, songs: [...state.songs, action.payload] };

    default:
      return state;
  }
};

export default songsReducer;
