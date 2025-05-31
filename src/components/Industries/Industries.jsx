import React, { useState } from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

import industries from "./industriesData";
import { theme } from "../../theme";
import IndustryCard from "./modules/IndustryCard";
import HorizontalListView from "../../utilities/HorizontalListView";

const Industries = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div
      className={`min-h-screen bg-white text-black  ${theme.layoutPages.paddingVertical}  flex flex-col items-center`}
    >
      <div className={`flex flex-col  justify-between items-start w-full py-20 ${theme.layoutPages.paddingHorizontal} `}>
        <Heading
          text="Tailored Services for Every Sector"
          showUnderline
          centered={false}
          breakSpan={true}
          isAnimate={false}
          color="text-black"
          className="pb-10"
        />

           <BodyText
          text="At Scons, we deliver innovative digital solutions tailored to the unique needs of industries like healthcare, finance, education, and more. Our industry-specific expertise empowers us to craft customized strategies that drive measurable success."
          centered={false}
          isAnimate={false}
          color="text-black"
          className="max-w-3xl "
        />
      </div>

      <HorizontalListView showIndicators={true} perPage={2} mobilePerPage={1} >
        {industries.map((industry, idx) => (
          <IndustryCard
            key={idx}
            industry={industry}
            active={activeIndex === idx}
            onHover={() => setActiveIndex(idx)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}
      </HorizontalListView>
    </div>
  );
};

export default Industries;