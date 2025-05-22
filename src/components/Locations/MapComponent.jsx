
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom pin icon with #00c5ff color
const customIcon = new L.Icon({
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

  useEffect(() => {
    if (mapRef.current && activeOffice) {
      mapRef.current.flyTo(officeCoordinates[activeOffice], 8, {
        duration: 1.5, // Smooth drag effect
        easeLinearity: 0.5,
      });
    }
  }, [activeOffice, officeCoordinates]);

  return (
    <MapContainer
      center={officeCoordinates[accordionData[0].title]}
      zoom={2.3}
      style={{ height: "100%", width: "100%", backgroundColor: "#000000" }}
      className="relative z-10 bg-black"
      ref={mapRef}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/engromerbaig/cmazsu0x100ct01s64wn7dvsd/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5ncm9tZXJiYWlnIiwiYSI6ImNtYXp1MDN0djBobXIyaXM2NWNzMGoxdWgifQ.T6bA1hG3-owi57hM4s_DFw"
        attribution='© <a href="https://www.mapbox.com/">Mapbox</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a>'
      />
      {accordionData.map((office) => (
        <Marker
          key={office.title}
          position={officeCoordinates[office.title]}
          icon={customIcon}
          eventHandlers={{
            click: () => {
              onPinClick(office.title);
            },
          }}
        >
          <Popup>
            <div className="bg-black text-white p-4 rounded-lg shadow-lg max-w-xs">
              <h3 className="font-bold text-lg mb-2">{office.title} Office</h3>
              <p className="text-sm">{office.content.address}</p>
              <p className="text-sm">{office.content.phone}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
