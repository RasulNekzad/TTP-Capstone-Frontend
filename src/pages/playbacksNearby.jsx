import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchActivePlaybacksThunk,
} from "../redux/playbacks/playbacks.actions";
import Playbacks from "../components/playbacks";
import ProtectedRoute from "../components/protectedroute";

const PlaybacksNearby = () => {
    // const playbacksNearby = useSelector((state) => state.playbacks.playbacks);
    const playbacksNearby = useSelector(
        (state) => state.playbacks.activePlaybacks
    );
    const dispatch = useDispatch();
    // const fetchAllPlaybacks = () => {
    //   console.log("RUNNING DISPATCH FROM FETCHALLPLAYBACKS");
    //   return dispatch(fetchAllPlaybacksThunk());
    // };
    // useEffect(() => {
    //   console.log("FETCHAllPLAYBACKS FIRING IN USEEFFECT");
    //   fetchAllPlaybacks();
    // }, []);
    const fetchActivePlaybacks = () => {
        return dispatch(fetchActivePlaybacksThunk());
    };

    useEffect(() => {
        fetchActivePlaybacks();
    }, []);

  const playbacksNearby = useSelector(
    (state) => state.playbacks.activePlaybacks
  );
  const playback_state = useSelector((state) => state.playbacks.playback_state);
  const dispatch = useDispatch();
  
  const fetchActivePlaybacks = () => {
    return dispatch(fetchActivePlaybacksThunk());
  };

  useEffect(() => {
    fetchActivePlaybacks();
  }, [playback_state, playbacksNearby]);

    return (
        <ProtectedRoute>
            <div className="text-center">
                <Playbacks playbacks={playbacksNearby}/>
            </div>
        </ProtectedRoute>
    );
};

export default PlaybacksNearby;
