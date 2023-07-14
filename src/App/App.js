import "./App.css";
// import { fetchCurrentPlayingSongThunk } from "../redux/songs/songs.actions";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { Button } from "react-bootstrap";

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
    <div className="App">
      {/* <Button onClick={fetchCurrentPlayingSong}>fetchCurrentPlayingSong</Button>
      {item ? <h1>{item.name}</h1> : <h1>Loading</h1>} */}
    </div>
  );
}

export default App;
