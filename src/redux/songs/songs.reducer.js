import SongsActionType from "./songs.types";

export const INITIAL_SONGS_STATE = {
  songs: [],
  song: {},
  currentPlaying: {},
};

const songsReducer = (state = INITIAL_SONGS_STATE, action) => {
  switch (action.type) {
    case SongsActionType.FETCH_SONG:
      return { ...state, song: action.payload };

    case SongsActionType.FETCH_CURRENT_PLAYING_SONG:
      const songName = action.payload.item.name;
      const title = action.payload.item.album.name;
      const imageUrl = action.payload.item.album.images[0].url;
      const externalUrl = action.payload.item.external_urls.spotify;
      const songObject = {
        song_name: songName,
        title: title,
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
