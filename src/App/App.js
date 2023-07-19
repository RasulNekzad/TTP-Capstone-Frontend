import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../pages";
import Auth from "../pages/auth";
import TopNavbar from "../components/layout/TopNavbar";
import UserProfile from "../components/user/UserProfile";
import PlaybacksNearby from "../pages/playbacksNearby";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <TopNavbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Auth/>}/>
                <Route path="/user" element={<UserProfile />} />
                <Route path="/playbacks" element={<PlaybacksNearby />} />
                <Route path="/songs" element={<PlaybacksNearby />} />
            </Routes>
    </Router>
  );
}

export default App;
