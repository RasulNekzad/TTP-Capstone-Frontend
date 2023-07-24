import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentPlayingSongThunk } from "../redux/songs/songs.actions";
import Playbacks from "../components/playbacks";

const PlaybacksNearby = () => {
  const playbacksNearby = useSelector((state) => state.songs.currentPlaying);
  const userUID = useSelector((state) => state.auth.token); 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(userUID)
  const dispatch = useDispatch();
  const fetchAllPlaybacks = () => {
    if (isLoggedIn) {
      console.log("RUNNING DISPATCH FROM FETCHALLPLAYBACKS");
      console.log("User UID:", userUID);
      return dispatch(fetchCurrentPlayingSongThunk(userUID));
    } else {
      console.log("User is not logged in.");
    }
  };

  useEffect(() => {
    console.log("FETCHAllPLAYBACKS FIRING IN USEEFFECT");
    fetchAllPlaybacks();
  }, [isLoggedIn]);
  console.log(playbacksNearby)
  return ( 
    <div className="text-center">
      <Playbacks playbacks={playbacksNearby}/>
    </div>
  );
};

export default PlaybacksNearby;