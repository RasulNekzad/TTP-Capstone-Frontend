import SongsActionType from "./songs.types";

export const INITIAL_SONGS_STATE = {
  song: {},
};

const songsReducer = (state = INITIAL_SONGS_STATE, action) => {
  switch (action.type) {
    case SongsActionType.FETCH_SONG:
      return { ...state, song: action.payload };

    default:
      return state;
  }
};

export default songsReducer