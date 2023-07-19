import { combineReducers } from "redux";
import playbacksReducer from "./playbacks/playbacks.reducers";
import songsReducer from "./songs/songs.reducer";
import userReducer from "./user/user.reducer";
import authReducer from "./auth/auth.reducer";

const rootReducer = combineReducers({
    playbacks: playbacksReducer, 
    user: userReducer, 
    songs: songsReducer,
    auth: authReducer
});

export default rootReducer;