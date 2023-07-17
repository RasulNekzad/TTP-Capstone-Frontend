import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import process from 'process';

const Playbacks = ({ playbacks }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Define the map options
  const mapOptions = {
    zoom: 10,
    center: { lat: 2, lng: 3 }, // Set the initial center of the map
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (map && playbacks) {
      const newMarkers = playbacks.map((playback) => {
        return {
          position: {
            lat: parseFloat(playback.latitude),
            lng: parseFloat(playback.longitude),
          },
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
          {
            markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
              />
            ))
          }
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Playbacks;