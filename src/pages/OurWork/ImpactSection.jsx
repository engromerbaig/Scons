import React from "react";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import { theme } from "../../theme";

const ImpactSection = ({ heading, introText, impacts }) => {
  return (
    <div className={`flex flex-col gap-6 ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
      {/* Main Heading */}
      <Heading
        text={`The right solution for ${heading}`}
        spanText={heading}
        spanColor="text-neon"
        centered={false}
        lineHeight="leading-none"
      />

      {/* Introductory Paragraph */}
      <BodyText
        text={introText}
        centered={false}
        className="max-w-3xl"
      />

      {/* Impact Cards Grid */}
      <div className="flex flex-col xl:flex-row xl:justify-between gap-6 ">
      {impacts.map((impact, index) => (
          <div
            key={index}
            className="border-2 border-b-0 w-full xl:max-w-80 border-neon rounded-3xl p-4 xl:p-6 flex flex-col h-64 "
          >
            {/* Heading Container - Top 25% */}
            <div className="h-1/4">
              <Heading
                text={impact.heading}
                centered={false}
                size="text-30px"
                fontWeight="font-black"
              />
            </div>
            
            {/* Body Text Container - Bottom 75%, Aligned to End */}
            <div className="h-3/4 flex flex-col justify-end">
              <BodyText
                text={impact.text}
                centered={false}
                className="text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactSection;