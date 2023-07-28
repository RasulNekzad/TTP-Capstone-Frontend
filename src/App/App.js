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
import Footer from "../components/layout/Footer";

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
  const [playbackIntervalId, setPlaybackIntervalId] = useState(null);
  const [removeplaybackIntervalId, setRemovePlaybackIntervalId] =
    useState(null);
  const [playbackStateIntervalId, setPlaybackStateIntervalId] = useState(null);

  console.log("Logged In: ", isLoggedIn);
  console.log("Current Playing: ", currentPlaying);

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

  // useEffect(() => {
  //   // Execute the fetch and post function immediately when the component mounts
  //   if (isLoggedIn) {
  //     // Fetch whether user is playing song after logged in
  //     fetchPlaybackState(userUID);
  //     // Fetch current playing song if user is playing song
  //     // Else reset currentPlaying and remove active playbacks
  //     if (playback_state) {
  //       fetchCurrentPlayingSong(userUID);
  //     } else {
  //         if (currentPlaying) {
  //           resetCurrentPlayingSong();
  //           dispatch(removeActivePlaybacksForUserThunk(userUID));
  //         }
  //     }
  //   }

  //   // Set up an interval to fetch and post every 5 minutes
  //   const interval = setInterval(() => {
  //     if (isLoggedIn) {
  //       fetchPlaybackState(userUID);
  //       if (playback_state) {
  //         fetchCurrentPlayingSong(userUID);
  //       } else {
  //         if (currentPlaying) {
  //           resetCurrentPlayingSong();
  //           dispatch(removeActivePlaybacksForUserThunk(userUID));
  //         }
  //       }
  //     }
  //   }, 2 * 1000); // 5 seconds in milliseconds

  //   // Save the interval ID for cleanup
  //   setIntervalId(interval);

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [isLoggedIn, userUID, playback_state]);
  // Fetch playback state when the component mounts and when playback_state changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchPlaybackState(userUID);
    }
  }, [isLoggedIn, userUID]);

  // Set up an interval to fetch the playback state every 2 seconds
  useEffect(() => {
    if (isLoggedIn) {
      const playbackStateInterval = setInterval(() => {
        fetchPlaybackState(userUID);
      }, 2 * 1000); // 2 seconds in milliseconds

      setPlaybackStateIntervalId(playbackStateInterval);

      return () => {
        clearInterval(playbackStateInterval);
      };
    }
  }, [isLoggedIn, userUID]);

  // Fetch current playing song when playback_state changes or when the component mounts
  useEffect(() => {
    if (isLoggedIn && playback_state) {
      fetchCurrentPlayingSong(userUID);
    } else {
      if (currentPlaying) resetCurrentPlayingSong();
    }
  }, [playback_state, isLoggedIn, userUID]);

  // Set up an interval to fetch and post every 2 seconds
  useEffect(() => {
    if (isLoggedIn && playback_state) {
      const playbackInterval = setInterval(() => {
        fetchCurrentPlayingSong(userUID);
      }, 2 * 1000); // 2 seconds in milliseconds

      setPlaybackIntervalId(playbackInterval);

      return () => {
        clearInterval(playbackInterval);
      };
    }
  }, [isLoggedIn, userUID, playback_state, dispatch]);

  // Remove active playbacks when playback_state changes to false
  useEffect(() => {
    if (isLoggedIn && !playback_state) {
      dispatch(removeActivePlaybacksForUserThunk(userUID));
    }
  }, [playback_state, isLoggedIn, userUID, dispatch]);

  // Interval to remove active playbacks
  useEffect(() => {
    if (isLoggedIn && !playback_state) {
      const removeplaybackInterval = setInterval(() => {
        dispatch(removeActivePlaybacksForUserThunk(userUID));
      }, 2 * 1000);

      setRemovePlaybackIntervalId(removeplaybackInterval);

      return () => {
        clearInterval(removeplaybackInterval);
      };
    }
  }, [isLoggedIn, userUID, playback_state, dispatch]);

  useEffect(() => {
    if (currentPlaying && isLoggedIn && playback_state) {
      const user_id = userUID;
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
  }, [currentPlaying, isLoggedIn, playback_state, userUID, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUpdatedAtThunk(userUID));
    }
  }, [isLoggedIn, userUID, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      const updatedAtInterval = setInterval(() => {
        dispatch(fetchUpdatedAtThunk(userUID));
      }, 2 * 1000);

      return () => {
        clearInterval(updatedAtInterval);
      };
    }
  }, [isLoggedIn, userUID, playback_state, dispatch]);
  
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
          refreshTokenThunk(userUID);
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
        <Route path="/map" element={<PlaybacksNearby />} />
        <Route path="/history" element={<PlaybacksHistory />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
