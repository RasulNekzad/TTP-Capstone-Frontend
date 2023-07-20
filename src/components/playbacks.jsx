import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import SpotifyPlayer from "react-spotify-web-playback";

const Playbacks = ({ playbacks }) => {
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(false);

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    setCurrentLatitude(parseFloat(latitude));
    setCurrentLongitude(parseFloat(longitude));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const mapOptions = {
    zoom: 10,
    center: { lat: currentLatitude, lng: currentLongitude },
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (map && playbacks) {
      const newMarkers = playbacks.map((playback) => {
        const { latitude, longitude } = playback;
        const { image_url } = playback;
        return {
          position: {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          },
          icon: {
            url: image_url, // Use the song image as the marker icon
            scaledSize: new window.google.maps.Size(30, 30), // Adjust the size of the icon
          },
          text: `(${latitude}, ${longitude})`
        };
      });
      setMarkers(newMarkers);
    }
  }, [map, playbacks]);

  const onLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = () => {
    // If the selected track is the same as the clicked track, close the InfoWindow
    setSelectedTrack(true);
  };

  const handleCloseInfoWindow = () => {
    setSelectedTrack(false); // Close the InfoWindow by resetting the selectedTrack state
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          options={mapOptions}
          onLoad={onLoad}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={marker.icon}
              label={marker.text}
              onClick={handleMarkerClick}
            >
              {selectedTrack && (<InfoWindow
                onCloseClick={handleCloseInfoWindow}
              >
                <audio controls>
                  <source src={"https://p.scdn.co/mp3-preview/7764c953b83f2eb2259e5bd4fcf6559c3ba0d670?cid=0b6fbd37eea445a29e484f2eb8d51b1b"} type="audio/mpeg" />
                </audio>
              </InfoWindow>)}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Playbacks;