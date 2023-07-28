import SongsActionType from "./songs.types";

export const INITIAL_SONGS_STATE = {
  songs: [],
  song: {},
  currentPlaying: null,
};

const songsReducer = (state = INITIAL_SONGS_STATE, action) => {
  switch (action.type) {
    case SongsActionType.FETCH_ALL_SONGS:
      return { ...state, songs: action.payload };

    case SongsActionType.FETCH_SONG:
      return { ...state, song: action.payload };

    case SongsActionType.FETCH_CURRENT_PLAYING_SONG:
      return { ...state, currentPlaying: action.payload };

    case SongsActionType.ADD_SONG:
      return { ...state, songs: [...state.songs, action.payload] };

    case SongsActionType.RESET_CURRENT_PLAYING_SONG:
      return { ...state, currentPlaying: null };
    default:
      return state;
  }
};

export default songsReducer;
