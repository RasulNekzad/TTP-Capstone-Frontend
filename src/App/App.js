import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "../pages";
import TopNavbar from "../components/layout/TopNavbar";
import './App.css';
import User from "../pages/user"
import PlaybacksNearby from "../pages/playbacksNearby";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <TopNavbar/>
        <Routes>
            {/* <Route path="/" element={<Home/>} /> */}
            <Route path="/user/:id" element={<User />} />
            <Route path="/playbacks" element={<PlaybacksNearby />} />
        </Routes>
    </Router>
  );
}

export default App;