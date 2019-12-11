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
      polyline.push(
        <Polyline
          key={key}
          path={data[key]}
          strokeColor="red"
          strokeOpacity={0.2}
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
    const url =
      "http://localhost:8080/map/insert" +
      "/" +
      latLng.latLng.lat() +
      "/" +
      latLng.latLng.lng();
    fetch(url);
  };

  return (
    // <Map
    //   onClick={onMapClick}
    //   google={props.google}
    //   initialCenter={{
    //     lat: 35.677832,
    //     lng: 139.767507
    //   }}
    //   zoom={12}
    // >
    <Map
      onClick={onMapClick}
      google={props.google}
      initialCenter={{
        lat: 35.68022,
        lng: 139.783869
      }}
      zoom={12}
    >
      {path}

      <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
        <div>
          <h1>{"车 1"}</h1>
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
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAchwZSKeWtyND-bY7YO2jjDezevzRg33E"
})(MapContainer);
