import React, { useState } from "react";

import {
  Map,
  Polyline,
  Marker,
  GoogleApiWrapper,
  InfoWindow
} from "google-maps-react";
import icon from "./icon.png";

const MapContainer = props => {
  const [activeMarker, setActiveMarker] = useState(undefined);

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const [path, setPath] = useState(undefined);

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  async function initMap() {
    const url = "http://localhost:8080/map/init";
    const response = await fetch(url);
    const data = await response.json();
    const polyline = [];

    Object.keys(data).map(key => 
    polyline.push(<Polyline
        key = {key}
        path={data[key]}
        strokeColor="red"
        strokeOpacity={0.2}
        strokeWeight={5}
      />)
    );
    return polyline;
  }

  !path && initMap().then(path => {
    setPath(path)
  })

  const onMapClick = (props, e, latLng) => {
    console.log(path);
  };

  return (
    <Map
      onClick={onMapClick}
      google={props.google}
      initialCenter={{
        lat: 35.686823,
        lng: 139.864091
      }}
      zoom={14}
    >
    {path}
      
      <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
        <div>
          <h1>{"车 1"}</h1>
        </div>
      </InfoWindow>

      <Marker
        onClick={onMarkerClick}
        name={"No1"}
        style={{ transform: "rotate(90deg)" }}
        icon={{
          url: icon,
          anchor: new props.google.maps.Point(10, 10),
          scaledSize: new props.google.maps.Size(10, 10)
        }}
        position={{ lat: 35.686823, lng: 139.864091 }}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCcZQWDPZSFi8TMjV64U_63QiqvsQtmI_E"
})(MapContainer);
