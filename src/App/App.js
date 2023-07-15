import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../pages";
import TopNavbar from "../components/layout/TopNavbar";

function App() {
  return (
    <Router>
        <TopNavbar/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
    </Router>
  );
}

export default App;