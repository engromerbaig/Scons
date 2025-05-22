import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Heading from "../Heading/Heading";

// Custom pin icon with #00c5ff color
const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="#00c5ff" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `)}`,
  iconSize: [32, 32], // Size of the pin icon [width, height]
  iconAnchor: [16, 32], // Anchor point of the icon (relative to bottom center)
  popupAnchor: [0, -32], // Popup position relative to the pin
});

const MapComponent = ({ officeCoordinates, accordionData, activeOffice, onPinClick }) => {
  // Ref to access the map instance for programmatic control
  const mapRef = useRef(null);

  // Update map center when activeOffice changes
  useEffect(() => {
    if (mapRef.current && activeOffice) {
      // Smoothly pan to the active office's coordinates with zoom level 8
      // Customize: Change '8' to adjust zoom (lower = zoomed out, higher = zoomed in)
      mapRef.current.setView(officeCoordinates[activeOffice], 8);
    }
  }, [activeOffice, officeCoordinates]);

  return (
    // Map container with Tailwind styling
    // Customize: Adjust height, border, or shadow via style prop or Tailwind classes
    <MapContainer
      center={officeCoordinates[accordionData[0].title]} // Initial center (first office)
      zoom={2.3} // Default zoom level (kept for wide view)
      style={{ height: "100%", width: "100%" }} // Full height/width of parent
      className="shadow-lg" // Tailwind styles for shadow
      ref={mapRef} // Reference for map control
    >
      {/* Dark-themed tile layer from Stadia Maps */}
      {/* Customize: Replace with Mapbox for black water: https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken} */}
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a>'
      />
      {/* Map markers for each office */}
      {accordionData.map((office) => (
        <Marker
          key={office.title} // Unique key for each marker
          position={officeCoordinates[office.title]} // Office coordinates
          icon={customIcon} // Custom pin icon
          eventHandlers={{
            click: () => {
              // Call onPinClick with the office title when marker is clicked
              onPinClick(office.title);
            },
          }}
        >
          {/* Popup on marker click */}
          <Popup>
            <div className="text-black">
              {/* <Heading
              text={`${office.title} Office`}
              /> */}
              <h3 className="font-bold text-base">{office.title} Office</h3>
              {/* <p>{office.content.address}</p>
              <p>{office.content.phone}</p> */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;