import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const Playbacks = ({ playbacks }) => {
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    setCurrentLatitude(parseFloat(latitude));
    setCurrentLongitude(parseFloat(longitude));
  };

  useEffect(() => {
    const geoLocationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const handleLocationChange = (position) => {
      success(position);
      // Handle any additional logic you want to perform when the location changes
    };

    const handleLocationError = (error) => {
      console.error("Error getting location:", error);
      // Handle any errors that occur while getting the location
    };

    const geoLocationWatchId = navigator.geolocation.watchPosition(
      handleLocationChange,
      handleLocationError,
      geoLocationOptions
    );

    // Clean up the watcher when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(geoLocationWatchId);
    };
  }, []); // Empty dependency array to run only on mount

  const mapOptions = {
    zoom: 15,
    center: { lat: currentLatitude, lng: currentLongitude },
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (map && playbacks) {
      const newMarkers = playbacks.map((playback) => {
        const {
          title,
          artist,
          external_url,
          preview_url,
          image_url,
          latitude,
          longitude,
        } = playback;
        return {
          position: {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          },
          icon: {
            // Add your custom marker icon here
            url: image_url,
            scaledSize: new window.google.maps.Size(50, 50), // Adjust the size of the icon
          },
          title,
          artist,
          external_url,
          preview_url,
          image_url,
        };
      });
      setMarkers(newMarkers);
    }
  }, [map, playbacks]);

  const onLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = (marker) => {
    setSelectedTrack(marker);
  };

  const handleCloseInfoWindow = () => {
    setSelectedTrack(null); // Close the InfoWindow by resetting the selectedTrack state
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          options={mapOptions}
          onLoad={onLoad}
        >
          {map &&
            markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                icon={marker.icon}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}
          {selectedTrack && (
            <InfoWindow
              position={selectedTrack.position}
              onCloseClick={handleCloseInfoWindow}
            >
              <div>
                <h3>{selectedTrack.title}</h3>
                <p>Artist: {selectedTrack.artist}</p>
                <p>Played Time: {selectedTrack.playedTime}</p>
                <audio controls>
                  <source src={selectedTrack.preview_url} type="audio/mpeg" />
                </audio>
                <a
                  href={selectedTrack.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Listen to Full Song
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Playbacks;
