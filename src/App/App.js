import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import User from "../pages/user"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/user/:id" element={<User />} />
    </Routes>
  );
}

export default App;