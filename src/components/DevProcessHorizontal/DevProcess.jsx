import React, { useState } from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import HorizontalListView from "../../utilities/HorizontalListView";
import IndustryCard from "../Industries/modules/IndustryCard";
import { featureData } from "./modules/featureData";
import { theme } from "../../theme";

const DevProcess = ({ processText }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!featureData || !Array.isArray(featureData)) return null;

  // Map featureData to fit IndustryCard props
  const mappedData = featureData.map((item) => ({
    name: item.title,
    details: item.description,
    number: item.number,
    image: item.image, // Optional: provide a placeholder image or leave empty
  }));

  return (
    <div className={`w-full min-h-screen flex flex-col justify-center ${theme.layoutPages.paddingVertical} `}>
      <div className={`flex flex-col items-start space-y-2 ${theme.layoutPages.paddingHorizontal}`}>
        <Heading 
          text="Where Innovation Meets Expertise" 
          centered={false}
          showUnderline
          className="pb-6"
        />
        <BodyText 
          text={
            processText ||
            "At Scons, we understand your industry, challenges, and aspirations. Our solutions are tailored to fuel growth and deliver excellence, designed specifically for businesses like yours."
          }
          centered={false}
          lineHeight="leading-tight"
          color="text-black"
          className="max-w-4xl"
        />
      </div>

      <div className="pt-16 w-full">
        <HorizontalListView showIndicators perPage={3} mobilePerPage={1}>
          {mappedData.map((industry, idx) => (
            <IndustryCard
              key={idx}
              industry={industry}
              active={activeIndex === idx}
              CARD_HEIGHT={450}
              CARD_WIDTH={400}
              onHover={() => setActiveIndex(idx)}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </HorizontalListView>
      </div>
    </div>
  );
};

export default DevProcess;
