import axios from "axios";

import UserActionType from "./user.types";

export const fetchUserProfile = (payload) => {
  console.log("FETCH USER PROFILE ACTION");
  return {
    type: UserActionType.FETCHING_USER_PROFILE,
    payload: payload,
  };
};

export const fetchUserProfileThunk = (userId) => {
    return async (dispatch) => {
      try {
        console.log("FETCHUSERPROFILETHUNK IS FIRING");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`);
        console.log("FETCHUSERPROFILETHUNK COMPLETED"); 
        dispatch(fetchUserProfile(response.data));
      } catch (error) {
        console.error(error);
      }
    };
};