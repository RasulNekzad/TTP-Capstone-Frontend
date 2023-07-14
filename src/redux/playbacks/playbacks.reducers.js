import PlaybacksActionType from "./playbacks.types";

export const INITIAL_PLAYBACKS_STATE = {
  playbacks: [],
  playback: {},
};

const playbacksReducer = (state = INITIAL_PLAYBACKS_STATE, action) => {
  switch (action.type) {
    case PlaybacksActionType.FETCH_ALL_PLAYBACKS:
      return { ...state, playbacks: action.payload };

    case PlaybacksActionType.FETCH_PLAYBACK:
      return { ...state, playback: action.payload };

    default:
      return state;
  }
};

export default playbacksReducer