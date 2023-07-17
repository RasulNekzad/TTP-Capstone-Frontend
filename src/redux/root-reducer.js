import { combineReducers } from "redux";
import playbacksReducer from "./playbacks/playbacks.reducers";
import songsReducer from "./songs/songs.reducer";

const rootReducer = combineReducers({
    playbacks: playbacksReducer, 
    user: userReducer, 
    songs: songsReducer,
});

export default rootReducer;