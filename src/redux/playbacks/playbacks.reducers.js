import PlaybacksActionType from "./playbacks.types";

export const INITIAL_PLAYBACKS_STATE = {
  playbacks: [],
  playback: {},
  personalPlaybacks: [],
  playback_state: {},
  activePlaybacks: [],
};

const playbacksReducer = (state = INITIAL_PLAYBACKS_STATE, action) => {
  switch (action.type) {
    case PlaybacksActionType.FETCH_ALL_PLAYBACKS:
      return { ...state, playbacks: action.payload };

    case PlaybacksActionType.FETCH_PLAYBACK:
      return { ...state, playback: action.payload };

    case PlaybacksActionType.CREATE_PLAYBACK:
      return { ...state, playbacks: [...state.playbacks, action.payload] };

    case PlaybacksActionType.FETCH_PERSONAL_PLAYBACKS:
      return { ...state, personalPlaybacks: action.payload };

    case PlaybacksActionType.FETCH_PLAYBACK_STATE:
      return { ...state, playback_state: action.payload };

    case PlaybacksActionType.FETCH_ACTIVE_PLAYBACKS:
      return { ...state, activePlaybacks: action.payload };

    default:
      return state;
  }
};

export default playbacksReducer;
