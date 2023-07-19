import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../pages";
import Auth from "../pages/auth";
import TopNavbar from "../components/layout/TopNavbar";
import User from "../pages/user"
import PlaybacksNearby from "../pages/playbacksNearby";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
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
