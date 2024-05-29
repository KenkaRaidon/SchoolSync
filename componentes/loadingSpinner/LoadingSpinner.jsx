import React from "react";
import Image from "next/image";
import "./LoadingSpinner.css"

const containerStyle = {
  marginTop: '140px', // Define other styles as needed
};

export default function LoadingSpinner() {
  return (
    <div id="loader-container">
      <Image className="mascota-loader" src="/assets/images/mascotas_loading.png"
      width={500}
      height={500} alt="" priority />
        <span id="mascota-cargando-txt"  style={containerStyle}>
          <p>CARGANDO</p>
        </span>
        <div className="loader"></div>
    </div>
  );
}