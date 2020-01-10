import React, { useState } from "react";

import {
  Map,
  Polyline,
  Marker,
  GoogleApiWrapper,
  InfoWindow
} from "google-maps-react";
import arrow from "./arrow.png";

const MapContainer = props => {
  const [activeMarker, setActiveMarker] = useState(undefined);

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const [path, setPath] = useState(undefined);

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const color = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "black",
    "white",
    "Orange",
    "magenta",
    "chocolate",
    "beige",
    "salmon",
    "tan",
    "navyblue"
  ];
  async function initMap() {
    const url = "http://localhost:8080/map/init";
    const response = await fetch(url, {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    const polyline = [];
    var temp = 0;
    Object.keys(data).map(key =>
      polyline.push(
        <Polyline
          key={key}
          path={data[key]}
          strokeColor={color[temp++ % color.length]}
          strokeOpacity={0.4}
          strokeWeight={5}
        />
      )
    );
    return polyline;
  }

  !path &&
    initMap().then(path => {
      setPath(path);
    });

  const onMapClick = (props, e, latLng) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  return (
    <Map
      onClick={onMapClick}
      google={props.google}
      initialCenter={{
        lat: 35.639032,
        lng: 139.807507
      }}
      zoom={12}
    >
      {path}

      <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
        <div>
          <h1>{Marker.name}</h1>
        </div>
      </InfoWindow>

      <Marker
        onClick={onMarkerClick}
        name={"中田屋船堀工場"}
        position={{ lat: 35.686823, lng: 139.864091 }}
      />

      <Marker
        onClick={onMarkerClick}
        name={"墨田リサイクル事業協同組合"}
        position={{ lat: 35.711594, lng: 139.815657 }}
      />

      <Marker
        onClick={onMarkerClick}
        name={"Koyo Service Tokyo Branch"}
        position={{ lat: 35.64229, lng: 139.810148 }}
      />

      <Marker
        onClick={onMarkerClick}
        name={"Komagata"}
        position={{ lat: 35.68022, lng: 139.783869 }}
      />

      <Marker
        onClick={onMarkerClick}
        name={"株式会社リサイクル・ネットワーク"}
        position={{ lat: 35.589399, lng: 139.72944 }}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCcZQWDPZSFi8TMjV64U_63QiqvsQtmI_E"
})(MapContainer);
