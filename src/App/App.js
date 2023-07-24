import { fetchCurrentPlayingSongThunk } from "../redux/songs/songs.actions";
import { createPlaybackThunk } from "../redux/playbacks/playbacks.actions";
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
import { useEffect } from "react";
import PlaybacksHistory from "../pages/playbacksHistory";
import { getAuth } from "firebase/auth";

function App() {
  /* Populating the db with currently playing song every 30 seconds
   * Will require access token from spotify

  const currentPlaying = useSelector((state) => state.songs.currentPlaying);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const thirtySecondsMs = 30000;

  const fetchCurrentPlayingSong = () => {
    fetchCurrentPlayingSongThunk(//access_token here
    );
  };

  useEffect(() => {
    if (user) {
      let interval = setInterval(() => {
        fetchCurrentPlayingSong();
      }, thirtySecondsMs);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    if (currentPlaying) {
      const mockUserId = 1;
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          const { latitude, longitude } = position.coords;
          const playback = {
            user_id: mockUserId,
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
  }, [currentPlaying]);

  */

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
