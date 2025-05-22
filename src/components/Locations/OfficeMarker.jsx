import React from "react";
import { Marker, Popup } from "react-leaflet";

const OfficeMarker = ({ office, position, icon, onPinClick }) => (
  <Marker
    position={position}
    icon={icon}
    eventHandlers={{
      click: () => onPinClick(office.title),
    }}
  >
    <Popup>
      <div className="bg-black text-white flex flex-row items-center mb-2 w-40">
        <div className="w-8 h-8 overflow-hidden rounded-full mr-2 flex-shrink-0">
          <img
            src={office.content.flagImage}
            alt={`${office.title} flag`}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-bold text-sm text-white">{office.title} Office</h3>
      </div>
    </Popup>
  </Marker>
);

export default OfficeMarker;