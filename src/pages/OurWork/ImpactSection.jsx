import React from "react";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { theme } from "../../theme";

const ImpactSection = ({ heading, deliverables }) => {
  return (
    <div className={`flex flex-col gap-4 ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
      <Heading
        text={`Scons Impact on ${heading}`}
        spanText={heading}
        spanColor="text-neon"
        centered={false}
        lineHeight="leading-none"
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {deliverables.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <IoIosCheckmarkCircle className="text-neon mt-1 shrink-0" size={20} />
            <BodyText text={item} centered={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactSection;
