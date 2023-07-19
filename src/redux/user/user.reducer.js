import UserActionType from "./user.types";

export const INITIAL_USER_STATE = {
  user: {}, 
  spotifyOAuth: null
};

const userReducer = (state = INITIAL_USER_STATE, { type, payload }) => {
  switch (type) {
    case UserActionType.FETCHING_USER_PROFILE:
      return { ...state, user: payload }
    case UserActionType.FETCHING_SPOTIFY_OAUTH:
      return { ...state};
    default:
      return state;
  }
};

export default userReducer;