import SongsActionType from "./songs.types";

export const INITIAL_SONGS_STATE = {
  song: {},
  currentPlaying: {},
};

const songsReducer = (state = INITIAL_SONGS_STATE, action) => {
  switch (action.type) {
    case SongsActionType.FETCH_SONG:
      return { ...state, song: action.payload };

    case SongsActionType.FETCH_CURRENT_PLAYING_SONG:
      return { ...state, currentPlaying: action.payload };

    default:
      return state;
  }
};

export default songsReducer;
