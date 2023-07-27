import { fetchCurrentPlayingSongThunk } from "../redux/songs/songs.actions";
import {
  createPlaybackThunk,
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
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const thirtySecondsMs = 30000;
  const updatedAt = useSelector((state) => state.user.updatedAt);
  const [intervalId, setIntervalId] = useState(null);

  const fetchCurrentPlayingSong = (userUID) => {
    console.log("FETCH CURRENT PLAYING SONG");
    dispatch(fetchCurrentPlayingSongThunk(userUID));
  };

  const handleUserLeave = () => {
    if (user && isLoggedIn) {
      dispatch(removeActivePlaybacksForUserThunk(user.uid));
    }
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     let interval = setInterval(() => {
  //       console.log("test1");
  //       fetchCurrentPlayingSong(userUID);
  //     }, thirtySecondsMs);

  //     window.addEventListener("beforeunload", handleUserLeave);

  //     return () => {
  //       clearInterval(interval);
  //       window.removeEventListener("beforeunload", handleUserLeave);
  //     };
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    // Execute the fetch and post function immediately when the component mounts
    if (isLoggedIn) {
      fetchCurrentPlayingSong(userUID);
    }

    // Set up an interval to fetch and post every 5 minutes
    const interval = setInterval(() => {
      if (isLoggedIn) {
        fetchCurrentPlayingSong(userUID);
      }
    }, 5 * 1000); // 5 seconds in milliseconds

    // Save the interval ID for cleanup
    setIntervalId(interval);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [isLoggedIn, userUID]);

  useEffect(() => {
    if (currentPlaying && isLoggedIn) {
      const user_id = user.uid;
      console.log("currentPlaying", currentPlaying);
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
  }, []);

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
    // <div className="App">
    //   {/* <Button onClick={fetchCurrentPlayingSong}>fetchCurrentPlayingSong</Button>
    //   {item ? <h1>{item.name}</h1> : <h1>Loading</h1>} */}
    // </div>
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
