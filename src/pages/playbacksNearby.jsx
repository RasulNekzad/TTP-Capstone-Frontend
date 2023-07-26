import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPlaybacksThunk,
  fetchActivePlaybacksThunk,
} from "../redux/playbacks/playbacks.actions";
import { fetchCurrentPlayingSongThunk } from "../redux/songs/songs.actions";
import Playbacks from "../components/playbacks";

const PlaybacksNearby = () => {
  const currentlyPlayingSong = useSelector((state) => state.songs.currentPlaying);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userUID = useSelector((state) => state.auth.token);
  // const playbacksNearby = useSelector(
  //   (state) => state.playbacks.activePlaybacks
  // );
  const dispatch = useDispatch();
  const fetchCurrentlyPlayingSong = (userUID) => {
      return dispatch(fetchCurrentPlayingSongThunk(userUID));
  };
  const fetchActivePlaybacks = () => {
    return dispatch(fetchActivePlaybacksThunk());
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCurrentlyPlayingSong(userUID);
    // fetchActivePlaybacks();
    }
  }, [isLoggedIn, userUID]);

  return (
    <div className="text-center">
      <Playbacks playbacks={currentlyPlayingSong}/>
    </div>
  );
};

export default PlaybacksNearby;
