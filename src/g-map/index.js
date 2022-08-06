import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "../assests/css/App.css";

const Marker = () => (
  <>
    <div className="pin"></div>
    <div className="pulse"></div>
  </>
);
function GMap({ lat, lng }) {
  const defaultProps = {
    center: {
      lat: 23.0225,
      lng: 72.5714,
    },
    zoom: 13,
  };

  const [location, setLocation] = useState({});
  useEffect(() => {
    setLocation({
      lat: lat,
      lng: lng,
    });
  }, [lat, lng]);

  return (
    <div style={{ height: "80vh", width: "100%", marginTop: "2%" }}>
      <GoogleMapReact
        defaultZoom={defaultProps.zoom}
        center={Object.keys(location)?.length ? location : defaultProps.center}
        bootstrapURLKeys={{ key: "AIzaSyBfayPuI_i3oQWm5qpqH4bAJrCQPTGgR40" }}
        defaultCenter={defaultProps.center}
      >
        <Marker lat={lat} lng={lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}

export default GMap;
