import React from "react";
import ReactDOM from "react-dom";
import GoogleMap from "./GoogleMap";

import "./styles.css";

function refresh() {
  const rootElement = document.getElementById("root");
  ReactDOM.render(<GoogleMap />, rootElement);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<GoogleMap />, rootElement);
