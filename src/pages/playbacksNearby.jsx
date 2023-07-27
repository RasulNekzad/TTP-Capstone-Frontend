import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPlaybacksThunk,
  createPlaybackThunk, 
  fetchActivePlaybacksThunk,
} from "../redux/playbacks/playbacks.actions";
import { fetchCurrentPlayingSongThunk } from "../redux/songs/songs.actions";
import Playbacks from "../components/playbacks";

const PlaybacksNearby = () => {
  const currentlyPlayingSong = useSelector((state) => state.songs.currentPlaying);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userUID = useSelector((state) => state.auth.token);
  const [intervalId, setIntervalId] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  // const playbacksNearby = useSelector(
  //   (state) => state.playbacks.activePlaybacks
  // );
  const dispatch = useDispatch();
  const fetchCurrentlyPlayingSong = (userUID) => {
      return dispatch(fetchCurrentPlayingSongThunk(userUID));
  };

  const postPlaybackData = (playbackData) => {
    // Perform the post request here using the playbackData
    // For example, call your createPlaybackThunk action
    return dispatch(createPlaybackThunk(playbackData));
  };

  const handlePlaybackData = (playbackData) => {
    // This function will be called by the Playbacks component
    // whenever it has data to be posted
    postPlaybackData(playbackData);
  };

  const fetchActivePlaybacks = () => {
    return dispatch(fetchActivePlaybacksThunk());
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fetchCurrentlyPlayingSong(userUID);
  //     // fetchActivePlaybacks();
  //   }
  // }, [isLoggedIn, userUID]);
  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLatitude(parseFloat(latitude));
      setCurrentLongitude(parseFloat(longitude));
    };
    const geoLocationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const handleLocationChange = (position) => {
      success(position);
    };

    const handleLocationError = (error) => {
      console.error("Error getting location:", error);
    };

    const geoLocationWatchId = navigator.geolocation.watchPosition(
      handleLocationChange,
      handleLocationError,
      geoLocationOptions
    );

    if (isLoggedIn) {
      fetchCurrentlyPlayingSong(userUID);
    }

    // Set up an interval to fetch and post every 5 minutes
    const interval = setInterval(() => {
      if (isLoggedIn) {
        fetchCurrentlyPlayingSong(userUID);
      }
    }, 60 * 5 * 1000); // 5 minutes in milliseconds

    // Save the interval ID for cleanup
    setIntervalId(interval);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      navigator.geolocation.clearWatch(geoLocationWatchId);
    };
  }, [isLoggedIn, userUID]);

  return (
    <div className="text-center">
      {currentlyPlayingSong.title && currentLatitude && currentLongitude ? (
        <Playbacks
          playbacks={currentlyPlayingSong}
          onPlaybackData={handlePlaybackData}
          user_id={userUID}
          currentLatitude = {currentLatitude}
          currentLongitude = {currentLongitude}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlaybacksNearby;
