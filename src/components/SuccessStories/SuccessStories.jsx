import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import SuccessCard from "../SuccessCard/SuccessCard";
import { successStoriesData } from "./successStoriesData";


const SuccessStories = () => {
  return (
    <div
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center min-h-screen`}
    >
      <div className="flex flex-row justify-between items-center w-full mb-8">
        <Heading text="Our Success Stories" className="text-left" />
        <BodyText text="More Case Studies →" className="text-right cursor-pointer" />
      </div>

      {/* Cards container: 2 cards per row */}
      <div className="flex flex-wrap justify-between w-full max-w-6xl">
        {successStoriesData.map(({ id, image, logo, heading, bodyText }) => (
          <div key={id} className="w-full md:w-[48%] mb-8">
            <SuccessCard
              image={image}
              logo={logo}
              heading={heading}
              bodyText={bodyText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
