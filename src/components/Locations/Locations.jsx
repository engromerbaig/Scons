import React, { useState } from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import MapComponent from "./MapComponent";
import accordionData from "./modules/accordionData";
import { theme } from "../../theme";
import Button from "../Button/Button";


import { IoLocation } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";

import FadeWrapper from "../../utilities/Animations/FadeWrapper";

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
    <div className={`bg-black  text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      {/* Page heading */}
      <div className="flex flex-col pb-10">
        <Heading text="Our Locations" spanText="Locations" spanColor="text-neon" color="text-white" centered={false} />
        <BodyText text="We have multiple offices around the world. Find the closest one to you!" color="text-white" centered={false} />
      </div>

      {/* Responsive layout: Grid for xl and above, flex column for below xl */}
      {/* Customize: Adjust gap, breakpoints (e.g., lg instead of xl), or styling */}
      <div className="flex flex-col xl:grid xl:grid-cols-12 gap-4 xl:gap-x-8">
        {/* Office Details: col-span-4 on xl+, full width below */}
        <div className="w-full xl:col-span-4 p-6">
          {/* Tab-like buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {accordionData.map((office) => (
              <button
                key={office.title}
                onClick={() => setActiveOffice(office.title)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  activeOffice === office.title
                    ? "bg-neon text-black"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {office.title}
              </button>
            ))}
          </div>

          {/* Office details */}
          {activeOfficeData ? (


<FadeWrapper
  key={activeOfficeData.title} // Forces fade animation on tab switch
  className="flex flex-col gap-y-4 xl:gap-y-6"
>
  {/* Office title and country */}
  <div>
    <h3 className="text-2xl font-bold">{`${activeOfficeData.title} Office`}</h3>
    <div className="flex flex-row items-center gap-x-2 mt-1">
      <p className="text-lg text-gray-300">{activeOfficeData.country}</p>
      <img
        src={activeOfficeData.content.flagImage}
        alt={`${activeOfficeData.title} flag`}
        className="rounded-full object-cover w-5 h-5 border border-black"
      />
    </div>
  </div>

  {/* Optional: Office image */}
  {/* <img
    src={activeOfficeData.content.image}
    alt={`${activeOfficeData.title} office`}
    className="w-full h-40 object-contain svg-neon rounded-md"
  /> */}

  {/* Address and phone */}
  <div className="flex flex-col gap-y-2 text-gray-200">
    <div className="flex items-start gap-x-2 hover:text-neon">
      <IoLocation className="text-neon w-6 h-6 flex-shrink-0" /> {/* Fixed size */}
      <span className="pr-10">{activeOfficeData.content.address}</span>
    </div>

    <a
      href={`tel:${activeOfficeData.content.phone}`}
      className="flex items-center gap-x-2 hover:text-neon"
    >
      <FaPhone className="text-neon w-5 h-5 flex-shrink-0" /> {/* Fixed size */}
      <span>{activeOfficeData.content.phone}</span>
    </a>
  </div>

  {/* CTA Button */}
  <Button
    name="Schedule a Meeting"
    bgColor="bg-neon"
    textColor="black"
    hoverBgColor="bg-neon"
    hoverTextColor="black"
    link="/contact-us"
  />
</FadeWrapper>


          ) : (
            <p className="text-gray-400">Select an office</p>
          )}
        </div>

        {/* Map: col-span-8 on xl+, full width below */}
        <div className="w-full xl:col-span-8 h-[400px] xl:h-[500px]">
          <MapComponent
            officeCoordinates={officeCoordinates}
            accordionData={accordionData}
            activeOffice={activeOffice}
            onPinClick={(title) => setActiveOffice(title)} // Update active office on pin click
          />
        </div>
      </div>
    </div>
  );
};

export default Locations;