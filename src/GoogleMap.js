import React, { useState } from "react";
import { refresh } from "./index";
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

  // const inputPile = [];

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };
  function initMap() {
    const url = "http://localhost:8080/map/init";
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log("data", data.polyline)
        return data.polyline;
      });
  }

  const path = [];
  const onMapClick = (props, e, latLng) => {
    path.push({ lat: latLng.latLng.lat(), lng: latLng.latLng.lng() });
    const url =
      "http://localhost:8080/map/insert" +
      "/" +
      latLng.latLng.lat() +
      "/" +
      latLng.latLng.lng();
    fetch(url).then(refresh);
    console.log(path);

    // console.log("{ lat: ", latLng.latLng.lat(), ", lng: ",latLng.latLng.lng(), " },");
  };

  // inputPile.push(
  //   <Polyline
  //       path={initMap()}
  //       strokeColor="red"
  //       strokeOpacity={0.2}
  //       strokeWeight={5}
  //     />
  // );

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
      <Polyline
        id={1}
        path={path}
        strokeColor="red"
        strokeOpacity={0.2}
        strokeWeight={5}
      />
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
