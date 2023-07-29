import {
  fetchCurrentPlayingSongThunk,
  resetCurrentPlayingSongThunk,
} from "../redux/songs/songs.actions";
import {
  createPlaybackThunk,
  fetchPlaybackStateThunk,
  removeActivePlaybacksForUserThunk,
  fetchActivePlaybacksThunk,
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
import { useEffect } from "react";
import PlaybacksHistory from "../pages/playbacksHistory";
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
  const updatedAt = useSelector((state) => state.user.updatedAt);

  console.log("Logged In: ", isLoggedIn);
  console.log("Current Playing: ", currentPlaying);

  const fetchCurrentPlayingSong = (userUID) => {
    dispatch(fetchCurrentPlayingSongThunk(userUID));
  };

  const fetchPlaybackstate = (userUID) => {
    dispatch(fetchPlaybackStateThunk(userUID));
  };

  const resetCurrentPlayingSong = () => {
    dispatch(resetCurrentPlayingSongThunk());
  };

  const fetchActivePlaybacks = () => {
    return dispatch(fetchActivePlaybacksThunk());
  };

  const fetchCurrentAndResetPlayingSongIfNeeded = async () => {
    if (isLoggedIn && playback_state) {
      fetchCurrentPlayingSong(userUID);
      fetchActivePlaybacks();
    } else {
      if (currentPlaying) {
        resetCurrentPlayingSong();
        if (!currentPlaying) removeActivePlaybacks();
      }
    }
  };

  const removeActivePlaybacks = async () => {
    if (isLoggedIn && !playback_state) {
      dispatch(removeActivePlaybacksForUserThunk(userUID));
    }
  };

  const fetchPlaybackState = async () => {
    if (isLoggedIn) {
      fetchPlaybackstate(userUID);
    }
  };

  const fetchUpdatedAtAndCheckTokenRefresh = async () => {
    if (isLoggedIn) {
      dispatch(fetchUpdatedAtThunk(userUID));
      checkTokenRefresh();
    }
  };

  // Function to check if the token needs to be refreshed
  const checkTokenRefresh = async () => {
    const now = Date.now();
    const expiresIn = 3500 * 1000;
    const timeDiff = now - updatedAt;

    if (timeDiff >= expiresIn && isLoggedIn) {
      dispatch(refreshTokenThunk(userUID));
      console.log("Token refreshed for the user.");
    }
  };

  // Fetch playback state when the component mounts and when playback_state changes
  useEffect(() => {
    fetchPlaybackState();
  }, [isLoggedIn, userUID]);

  // Set up an interval to fetch the playback state every 2 seconds
  useEffect(() => {
    if (isLoggedIn) {
      const playbackStateInterval = setInterval(fetchPlaybackState, 2 * 1000); // 2 seconds in milliseconds

      return () => {
        clearInterval(playbackStateInterval);
      };
    }
  }, [isLoggedIn, userUID]);

  // Fetch current playing song when playback_state changes or when the component mounts
  useEffect(() => {
    fetchCurrentAndResetPlayingSongIfNeeded();
  }, [playback_state, isLoggedIn, userUID]);

  // Set up an interval to fetch and post every 2 seconds
  useEffect(() => {
    if (isLoggedIn && playback_state) {
      const playbackInterval = setInterval(
        fetchCurrentAndResetPlayingSongIfNeeded,
        2 * 1000
      ); // 2 seconds in milliseconds

      return () => {
        clearInterval(playbackInterval);
      };
    }
  }, [isLoggedIn, userUID, playback_state]);

  // Remove active playbacks when playback_state changes to false
  useEffect(() => {
    if (!currentPlaying){
      removeActivePlaybacks();
      fetchActivePlaybacks();
    } 
  }, [playback_state, currentPlaying]);

  // Set up interval for removing active playbacks
  useEffect(() => {
    if (isLoggedIn && !playback_state) {
      const removeplaybacksinterval = setInterval(() => {
        if (!currentPlaying) {
          removeActivePlaybacks();
          fetchActivePlaybacks();
        } 
      }, 1000);

      return () => {
        clearInterval(removeplaybacksinterval);
      };
    }
  }, [currentPlaying]);

  // Fetch current playing song after switch song and remove active playbacks when current song is null
  useEffect(() => {
    if (isLoggedIn) {
      const currentPlayingInterval = setInterval(() => {
        if (isLoggedIn && currentPlaying) {
          fetchCurrentPlayingSong(userUID);
          fetchActivePlaybacks();
        }
      }, 2 * 1000);

      return () => {
        clearInterval(currentPlayingInterval);
      };
    }
  }, [isLoggedIn, currentPlaying]);

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

  // useEffect(() => {
  //   fetchUpdatedAtAndCheckTokenRefresh();
  // }, [isLoggedIn, userUID, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      const updatedAtInterval = setInterval(
        fetchUpdatedAtAndCheckTokenRefresh,
        3500 * 1000
      );

      return () => {
        clearInterval(updatedAtInterval);
      };
    }
  }, [isLoggedIn, userUID, dispatch]);

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
