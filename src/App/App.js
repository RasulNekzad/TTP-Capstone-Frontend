import {
  fetchCurrentPlayingSongThunk,
  resetCurrentPlayingSongThunk,
} from "../redux/songs/songs.actions";
import {
  createPlaybackThunk,
  fetchPlaybackStateThunk,
  removeActivePlaybacksForUserThunk,
} from "../redux/playbacks/playbacks.actions";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages";
import Auth from "../pages/auth";
import TopNavbar from "../components/layout/TopNavbar";
import User from "../pages/user";
import UserProfile from "../components/user/UserProfile";
import PlaybacksNearby from "../pages/playbacksNearby";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import PlaybacksHistory from "../pages/playbacksHistory";
import { getAuth } from "firebase/auth";
import {
  fetchUpdatedAtThunk,
  refreshTokenThunk,
} from "../redux/user/user.actions";

function App() {
  //  Populating the db with currently playing song every 30 seconds
  const currentPlaying = useSelector((state) => state.songs.currentPlaying);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userUID = useSelector((state) => state.auth.token);
  const playback_state = useSelector((state) => state.playbacks.playback_state);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const thirtySecondsMs = 30000;
  const updatedAt = useSelector((state) => state.user.updatedAt);
  const [intervalId, setIntervalId] = useState(null);

  console.log(isLoggedIn);

  const fetchCurrentPlayingSong = (userUID) => {
    dispatch(fetchCurrentPlayingSongThunk(userUID));
  };

  // const handleUserLeave = () => {
  //   if (user && isLoggedIn) {
  //     dispatch(removeActivePlaybacksForUserThunk(user.uid));
  //   }
  // };

  const fetchPlaybackState = (userUID) => {
    dispatch(fetchPlaybackStateThunk(userUID));
  };

  const resetCurrentPlayingSong = () => {
    dispatch(resetCurrentPlayingSongThunk());
  };

  useEffect(() => {
    // Execute the fetch and post function immediately when the component mounts
    if (isLoggedIn) {
      // Fetch whether user is playing song after logged in
      fetchPlaybackState(userUID);
      // Fetch current playing song if user is playing song
      // Else reset currentPlaying and remove active playbacks
      if (playback_state) {
        fetchCurrentPlayingSong(userUID);
      } else {
          if (currentPlaying) {
            dispatch(removeActivePlaybacksForUserThunk(userUID));
            resetCurrentPlayingSong();
          }
      }
    }

    // Set up an interval to fetch and post every 5 minutes
    const interval = setInterval(() => {
      if (isLoggedIn) {
        fetchPlaybackState(userUID);
        if (playback_state) {
          fetchCurrentPlayingSong(userUID);
        } else {
          if (currentPlaying) {
            dispatch(removeActivePlaybacksForUserThunk(userUID));
            resetCurrentPlayingSong();
          }
        }
      }
    }, 2 * 1000); // 5 seconds in milliseconds

    // Save the interval ID for cleanup
    setIntervalId(interval);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [isLoggedIn, userUID, playback_state]);

  useEffect(() => {
    if (currentPlaying && isLoggedIn && playback_state) {
      const user_id = user.uid;
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          const { latitude, longitude } = position.coords;
          const playback = {
            user_id: user_id,
            song_id: currentPlaying.song_id,
            latitude: latitude,
            longitude: longitude,
          };
          console.log("POSTING PLAYBACK:", playback);
          dispatch(createPlaybackThunk(playback));
        },
        // Error callback
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    }
  }, [currentPlaying, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUpdatedAtThunk(userUID));
    }
  }, [isLoggedIn, userUID]);

  useEffect(() => {
    // Schedule the token refresh task every 50 minutes (3000000 milliseconds)
    const refreshTokenTask = setInterval(checkTokenRefresh, 3000000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(refreshTokenTask);
  }, [isLoggedIn, userUID]);

  // Function to check if the token needs to be refreshed
  const checkTokenRefresh = async () => {
    const now = Date.now();
    const expiresIn = 3600 * 1000; // 3600 seconds = 1 hour
    const timeDiff = now - updatedAt;

    if (timeDiff >= expiresIn && user) {
      refreshTokenThunk(user.uid);
      console.log("Token refreshed for the user.");
    }
  };

  return (
    <Router>
      <TopNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/songs" element={<PlaybacksNearby />} />
        <Route path="/history" element={<PlaybacksHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
