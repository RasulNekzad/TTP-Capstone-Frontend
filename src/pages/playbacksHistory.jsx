import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPlaybacksThunk,
  fetchPersonalPlaybackThunk,
} from "../redux/playbacks/playbacks.actions";
import Playbacks from "../components/playbacks";
import ToggleButton from "../components/toggleButton/ToggleButton";
import "../components/toggleButton/ToggleButton.css";
import { getAuth } from "firebase/auth";
import { is } from "@babel/types";

const PlaybacksHistory = () => {
  const playbacksGlobal = useSelector((state) => state.playbacks.playbacks);
  const playbacksPersonal = useSelector(
    (state) => state.playbacks.personalPlaybacks
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userUID = useSelector((state) => state.auth.token);
  const [showPersonalPlaybacks, setShowPersonalPlaybacks] = useState(false);

  const dispatch = useDispatch();

  const fetchAllPlaybacks = () => {
    return dispatch(fetchAllPlaybacksThunk());
  };

  const fetchPersonalPlaybacks = () => {
    return dispatch(fetchPersonalPlaybackThunk(userUID));
  };

  useEffect(() => {
    fetchAllPlaybacks();

    // Check if the user is authenticated
    // Verification of registration by getAuth() or isLoggedIn state?
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && isLoggedIn) {
      // If the user is logged in, fetch personal playbacks
      console.log(userUID);
      fetchPersonalPlaybacks();
    }
  }, [isLoggedIn, userUID]);

  // Function to toggle between global and personal playbacks
  const togglePlaybackView = () => {
    setShowPersonalPlaybacks(!showPersonalPlaybacks);
  };

  return (
    <div className="text-center">
      {isLoggedIn && (
        <ToggleButton
          toggleCallback={togglePlaybackView}
          label={
            showPersonalPlaybacks
              ? "Switch to Global Playbacks"
              : "Switch to Personal Playbacks"
          }
        />
      )}
      {showPersonalPlaybacks ? (
        <Playbacks playbacks={playbacksPersonal} />
      ) : (
        <Playbacks playbacks={playbacksGlobal} />
      )}
    </div>
  );
};

export default PlaybacksHistory;
