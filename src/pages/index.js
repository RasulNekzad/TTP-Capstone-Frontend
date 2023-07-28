import "./index.css";
import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import img from "../assets/man_listening_headphones.png";
import backgroundImg from "../assets/spotify_background.png";
import mapLocation from "../assets/map_location.png";
import musicalNote from "../assets/musical_notes.png";
import spotify_2 from "../assets/spotify_2.png";

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

  useEffect(() => {
    /**
     * Extracting access token and refresh token
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
          <div className="header__text">
            <span style={{ paddingBottom: "5rem" }}>
              Discover Through Music
            </span>
            <h5>
              <br />
              Embark on a journey of harmonious connections as <br />
              Spotify Proximity brings you closer to fellow music enthusiasts,
              <br />
              celebrating the beauty of diverse tastes and shared rhythms.
            </h5>
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
      <div className="main__container">
        <div className="main__text">
          <h1>How It Works</h1>
        </div>
        <div className="main__col--5">
          <div className="main__card">
            <h1 className="main__card__num">1</h1>
            <img className="main__img" src={spotify_2} alt="spotify icon" />
            <span>
              Sign up and then connect your Spotify account to our app, which
              would allow you to share your music with your community.
            </span>
          </div>
          <div className="main__card">
            <h1 className="main__card__num">2</h1>
            <img
              className="main__img"
              src={mapLocation}
              alt="map location icon"
            />
            <span>
              Explore our interactive map, offering a unique glimpse into the
              musical preferences of people nearby.
            </span>
          </div>
          <div className="main__card">
            <h1 className="main__card__num">3</h1>
            <img
              className="main__img"
              src={musicalNote}
              alt="musical note icon"
            />
            <span>
              Click on the music icon to view song information and listen to a
              30 second preview.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
