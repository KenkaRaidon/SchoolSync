import React from "react";
import Image from "next/image";
import "./LoadingSpinner.css"

const containerStyle = {
  marginTop: '140px', // Define other styles as needed
};

export default function LoadingSpinner() {
  return (
    <div id="loader-container">
      <span id="mascota-cargando-txt" style={containerStyle}>
      </span>
      <div className="loader"></div>
    </div>
  );
}