import "./index.css";
import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import img from "../assets/man_listening_headphones.png";
import backgroundImg from "../assets/spotify_background.png";
import { getAuth } from "@firebase/auth";

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
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    /**
     * Extracting params
     */
    if (window.location.hash) {
      const params = getParamsFromSpotifyAuth(window.location.hash);
      console.log("Params", params);
    }
  });

  return (
    <>
      <div className="header">
        <div className="header__col--1">
          <div className="header__text">Spotify Proximity</div>
          <h6>Ever wondered what music people around you are listening to?</h6>
          <div className="header__button">
            <Button href="/songs" variant="dark">
              Get Started!
            </Button>
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
      <div className="header--2">
        <div className="header__col--4">
          <div className="header__text">More About Our App</div>
          <h6>
            Discover the rhythms of your proximity. Explore the melodic
            <br />
            tapestry of the people around you, and uncover the tunes
            <br /> that set the rhythm of their lives. Be a part of the global
            <br /> harmony by sharing your favorite tracks with the community.
            <br /> Experience the joy of harmonizing with others, one melody
            <br /> at a time.
          </h6>
          <div className="header__button--2">
            <Button
              variant="dark"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="header__col--3">
          <img
            className="header__background_image"
            src={backgroundImg}
            alt="spotify"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
