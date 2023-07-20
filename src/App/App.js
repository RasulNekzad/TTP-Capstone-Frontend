import { addSongThunk, fetchAllSongsThunk } from "../redux/songs/songs.actions";
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

function App() {
  /* Test with mock data.  mockSong should be currently playing from spotify
  const thirySecondsMs = 30000;
  const dispatch = useDispatch();

  // TODO: Don't use state for songs,
  // Return single song from backend
  // Use that song to POST.
  const songs = useSelector((state) => state.songs.songs);

  useEffect(() => {
    dispatch(fetchAllSongsThunk());
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      console.log(songs);
      if (songs === null) {
        return;
      }
      console.log("running");
      const localAuth = true; // TODO: Get logged in auth from context (firebase)
      if (localAuth) {
        const spotifyAuth = true; // TODO: Get spotify logged in auth from context (firebase)
        if (spotifyAuth) {
          const mockSong = {
            title: "Song Name",
            artist: "Artist Name",
            image_url: "example.png",
            external_url: "sample.link",
          };
          const mockUserId = 1;
          if (mockSong) {
            const song = songs.find((song) => {
              return (
                song.title === mockSong.title && song.artist === mockSong.artist
              );
            });
            console.log(songs);
            console.log(song);
            // All validation should be on backend
            if (!song) {
              dispatch(addSongThunk(mockSong));
            }

            // Getting coordinates
            navigator.geolocation.getCurrentPosition(
              // Success callback
              (position) => {
                const { latitude, longitude } = position.coords;
                const song = songs.find((song) => {
                  return (
                    song.title === mockSong.title &&
                    song.artist === mockSong.artist
                  );
                });
                console.log("before post", position);
                console.log(position);
                const playback = {
                  user_id: mockUserId,
                  song_id: song.song_id,
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
        }
      }
    }, thirySecondsMs);
    return () => {
      clearInterval(interval);
    };
  }, [songs]);
  */

  /**
   * Commented out tests
   */
  // const dispatch = useDispatch();
  // const {item} = useSelector(state => state.songs.currentPlaying);

  // const fetchCurrentPlayingSong = () => {
  //   dispatch(
  //     fetchCurrentPlayingSongThunk(
  //       `access token` // insert access token
  //     )
  //   );
  // }

  // useEffect(() => {
  // }, [item]);

  return (
    // <div className="App">
    //   {/* <Button onClick={fetchCurrentPlayingSong}>fetchCurrentPlayingSong</Button>
    //   {item ? <h1>{item.name}</h1> : <h1>Loading</h1>} */}
    // </div>
    <Router>
        <TopNavbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Auth/>}/>
                <Route path="/user" element={<UserProfile />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/songs" element={<PlaybacksNearby />} />
            </Routes>
    </Router>
  );
}

export default App;
