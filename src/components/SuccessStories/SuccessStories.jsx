import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import SuccessCard from "../SuccessCard/SuccessCard";
import { successStoriesData } from "./successStoriesData";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";

const SuccessStories = () => {
  return (
    <div
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center min-h-screen`}
    >
      <div className="flex flex-row justify-between items-center w-full mb-8">
        <Heading text="Our Success Stories" className="text-left" />
        <AnimatedArrow
          text="More Case Studies"
        />
      </div>

      {/* Cards container: 2 cards per row */}
      <div className="flex flex-wrap justify-between w-full ">
        {successStoriesData.map(({ id, image, logo, heading, bodyText }, index) => (
          <div
            key={id}
            className={`w-full md:w-[48%] mb-8 ${
              index % 2 === 1 ? "lg:mt-40" : "" /* Add margin-top to right cards */
            }`}
          >
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
