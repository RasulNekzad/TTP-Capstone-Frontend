// import { fetchCurrentPlayingSongThunk } from "../redux/songs/songs.actions";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { Button } from "react-bootstrap";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../pages";
import Auth from "../pages/auth";
import TopNavbar from "../components/layout/TopNavbar";
import User from "../pages/user"
import PlaybacksNearby from "../pages/playbacksNearby";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
                <Route path="/" element={<Home/>} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/songs" element={<PlaybacksNearby />} />
            </Routes>
    </Router>
  );
}

export default App;
