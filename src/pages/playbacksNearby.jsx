import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlaybacksThunk } from "../redux/playbacks/playbacks.actions";
import Playbacks from "../components/playbacks";

const PlaybacksNearby = () => {
  const playbacksNearby = useSelector((state) => state.playbacks.playbacks);
  const dispatch = useDispatch();
  const fetchAllPlaybacks = () => {
    console.log('RUNNING DISPATCH FROM FETCHALLPLAYBACKS')
    return dispatch(fetchAllPlaybacksThunk());
  };
  useEffect(() => {
    console.log('FETCHAllPLAYBACKS FIRING IN USEEFFECT')
    fetchAllPlaybacks();
  }, []);
  return ( 
    <div className="text-center">
      <Playbacks playbacks={playbacksNearby}/>
    </div>
  );
};

export default PlaybacksNearby;