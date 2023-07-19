import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Playbacks = ({ playbacks }) => {
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

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
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Playbacks;