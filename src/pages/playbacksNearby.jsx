import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPlaybacksThunk,
  fetchActivePlaybacksThunk,
} from "../redux/playbacks/playbacks.actions";
import Playbacks from "../components/playbacks";

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

  return (
    <div className="text-center">
      <Playbacks playbacks={playbacksNearby} />
    </div>
  );
};

export default PlaybacksNearby;
