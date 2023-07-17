import './index.css'
import {Button} from "react-bootstrap";
import React from "react";
import img from '../assets/man_listening_headphones.png'

function Home() {
    return (
        <div className="header">
            <div className="header__col--1">
                <div className="header__text">Spotify Proximity</div>
                <h6>Ever wondered what music people around you are listening to?</h6>
                <div className="header__button"><Button href="/songs">Get Started!</Button></div>
            </div>
            <div className="header__col--2">
                <img className="header__image" src={img} alt="person listening to music"/>
            </div>
        </div>
    )
}

export default Home;