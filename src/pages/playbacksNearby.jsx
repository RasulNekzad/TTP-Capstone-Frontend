import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivePlaybacksThunk } from "../redux/playbacks/playbacks.actions";
import Playbacks from "../components/playbacks";

const PlaybacksNearby = () => {
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
      <div className="text-center">
        <Playbacks playbacks={playbacksNearby} />
      </div>
  );
};

export default PlaybacksNearby;
