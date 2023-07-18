import UserActionType from "./user.types";

export const INITIAL_USER_STATE = {
  user: {}
};

const userReducer = (state = INITIAL_USER_STATE, { type, payload }) => {
  switch (type) {
    case UserActionType.FETCHING_USER_PROFILE:
      return { ...state, user: payload }
    default:
      return state;
  }
};

export default userReducer;