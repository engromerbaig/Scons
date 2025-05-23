import React, { useState, lazy, Suspense } from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import Button from "../Button/Button";
import { IoLocation } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import FadeWrapper from "../../utilities/Animations/FadeWrapper";
import accordionData from "./modules/accordionData";

// Lazy-load MapComponent
const MapComponent = lazy(() => import("./MapComponent"));

const officeCoordinates = {
  Glasgow: [55.8609, -4.2514],
  Karachi: [24.8607, 67.0011],
};

const Locations = () => {
  const [activeOffice, setActiveOffice] = useState(accordionData[0].title);
  const activeOfficeData = accordionData.find((office) => office.title === activeOffice);

  return (
    <div id="locations" className={`bg-black text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      <div className="flex flex-col pb-10">
        <Heading text="Our Locations" spanText="Locations" spanColor="text-neon" color="text-white" centered={false} />
        <BodyText text="We have multiple offices around the world. Find the closest one to you!" color="text-white" centered={false} />
      </div>
      <div className="flex flex-col xl:grid xl:grid-cols-12 gap-4 xl:gap-x-8">
        <div className="w-full xl:col-span-4 p-6">
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
          {activeOfficeData ? (
            <FadeWrapper key={activeOfficeData.title} className="flex flex-col gap-y-4 xl:gap-y-6">
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
              <div className="flex flex-col gap-y-2 text-gray-200">
                <div className="flex items-start gap-x-2 hover:text-neon">
                  <IoLocation className="text-neon w-6 h-6 flex-shrink-0" />
                  <span className="pr-10">{activeOfficeData.content.address}</span>
                </div>
                <a href={`tel:${activeOfficeData.content.phone}`} className="flex items-center gap-x-2 hover:text-neon">
                  <FaPhone className="text-neon w-5 h-5 flex-shrink-0" />
                  <span>{activeOfficeData.content.phone}</span>
                </a>
              </div>
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
        <div className="w-full xl:col-span-8 h-[400px] xl:h-[500px]">
          <Suspense fallback={<div className="text-white">Loading map...</div>}>
            <MapComponent
              officeCoordinates={officeCoordinates}
              accordionData={accordionData}
              activeOffice={activeOffice}
              onPinClick={(title) => setActiveOffice(title)}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Locations;