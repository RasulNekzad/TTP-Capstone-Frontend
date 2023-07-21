import "./index.css";
import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import img from "../assets/man_listening_headphones.png";
import { refreshToken } from "../redux/user/user.actions";
import { fetchCurrentPlayingSongThunk } from "../redux/songs/songs.actions";
import { useDispatch } from "react-redux";
import { fetchPlaybackStateThunk } from "../redux/playbacks/playbacks.actions";

function Home() {
  const getParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const params = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
    return params;
  };
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Extracting access token and refresh token
     */
    if (window.location.hash) {
      const { access_token, refresh_token } = getParamsFromSpotifyAuth(
        window.location.hash
      );
      console.log("Token", { access_token, refresh_token });
      // add to db or firebase

      // fetch current playing song test
    //   dispatch(fetchCurrentPlayingSongThunk(access_token));

      //fetch playback_state test
      dispatch(fetchPlaybackStateThunk(access_token));
      // refresh token test
    //   refreshToken(refresh_token).then(({ access_token }) => {
    //     console.log("new access_token", access_token);
    //   });
    }
  });

  return (
    <div className="header">
      <div className="header__col--1">
        <div className="header__text">Spotify Proximity</div>
        <h6>Ever wondered what music people around you are listening to?</h6>
        <div className="header__button">
          <Button href="/songs">Get Started!</Button>
        </div>
      </div>
      <div className="header__col--2">
        <img
          className="header__image"
          src={img}
          alt="person listening to music"
        />
      </div>
    </div>
  );
}

export default Home;
