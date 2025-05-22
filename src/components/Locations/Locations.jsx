import React, { useState } from "react";
import Heading from "../Heading/Heading";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import MapComponent from "./MapComponent";
import accordionData from "./modules/accordionData";
import { theme } from "../../theme";

// Office coordinates (replace with precise latitude/longitude values)
// Customize: Add more offices or update coordinates for accuracy
const officeCoordinates = {
  Glasgow: [55.8609, -4.2514], // Approximate
  Karachi: [24.8607, 67.0011], // Approximate
};

const Locations = ({ isAnimate }) => {
  // State to track the currently active (clicked) office
  // Customize: Change default to another office title if needed
  const [activeOffice, setActiveOffice] = useState(accordionData[0].title);

  // Find the active office's data from accordionData
  const activeOfficeData = accordionData.find((office) => office.title === activeOffice);

  return (
    // Main container with Tailwind styling and theme-based padding
    // Customize: Adjust bg, padding, or height (e.g., remove h-screen)
    <div className={`bg-black min-h-screen text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      {/* Animated background (optional) */}
      <AnimatedBackground isAnimate={isAnimate} />
      <div className="container mx-auto px-4">
        {/* Page heading */}
        <Heading title="Our Locations" />
        {/* Grid layout: 4 columns for office details, 8 for map */}
        {/* Customize: Adjust gap or column spans (e.g., col-span-6 each) */}
        <div className="grid grid-cols-12 gap-4 gap-x-8">
          {/* Left: Office Details */}
          <div className="col-span-12 lg:col-span-4 bg-neutral-800 p-6 rounded-lg shadow-lg">
            {activeOfficeData ? (
              <div>
                {/* Office title and country */}
                <h3 className="text-2xl font-bold mb-2">{activeOfficeData.title}</h3>
                <p className="text-lg text-gray-300 mb-4">{activeOfficeData.country}</p>
                {/* Office image */}
                {/* Customize: Adjust image size or styling */}
                <img
                  src={activeOfficeData.content.image}
                  alt={`${activeOfficeData.title} office`}
                  className="w-full h-40 object-cover rounded-md mb-4 svg-neon"
                />
                {/* Address and phone */}
                <p className="text-gray-200">{activeOfficeData.content.address}</p>
                <p className="text-gray-200">{activeOfficeData.content.phone}</p>
              </div>
            ) : (
              <p className="text-gray-400">Select a pin on the map</p>
            )}
          </div>
          {/* Right: Map */}
          <div className="col-span-12 lg:col-span-8">
            <MapComponent
              officeCoordinates={officeCoordinates}
              accordionData={accordionData}
              activeOffice={activeOffice}
              onPinClick={(title) => setActiveOffice(title)} // Update active office on pin click
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;