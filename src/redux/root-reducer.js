import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import playbacksReducer from "./playbacks/playbacks.reducers"

const rootReducer = combineReducers({
    user: userReducer, 
    playbacks : playbacksReducer
});

export default rootReducer;