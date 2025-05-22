import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAPBOX_CONFIG } from "./mapApi";
import OfficeMarker from "./OfficeMarker";

// Custom pin icon with #00c5ff color
const createCustomIcon = () =>
  new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="#00c5ff" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const MapComponent = ({ officeCoordinates, accordionData, activeOffice, onPinClick }) => {
  const mapRef = useRef(null);
  const customIcon = createCustomIcon();

  useEffect(() => {
    if (mapRef.current && activeOffice) {
      mapRef.current.flyTo(officeCoordinates[activeOffice], 8, {
        duration: 1.5,
        easeLinearity: 0.5,
      });
    }
  }, [activeOffice, officeCoordinates]);

  return (
    <MapContainer
      center={officeCoordinates[accordionData[0].title]}
      zoom={2.3}
      style={{ height: "100%", width: "100%", backgroundColor: "#000000" }}
      className="relative z-0 bg-black"
      ref={mapRef}
    >
      <TileLayer
        url={MAPBOX_CONFIG.url}
        attribution={MAPBOX_CONFIG.attribution}
      />
      {accordionData.map((office) => (
        <OfficeMarker
          key={office.title}
          office={office}
          position={officeCoordinates[office.title]}
          icon={customIcon}
          onPinClick={onPinClick}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;