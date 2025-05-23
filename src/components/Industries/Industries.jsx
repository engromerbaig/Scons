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
      className={`min-h-screen bg-white text-black  ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} flex flex-col items-center`}
    >
      <div className={`flex flex-col  justify-between items-start w-full py-20 `}>
        <Heading
          text="We Serve Diverse Industries And Markets"
          centered={false}
          breakSpan={true}
          isAnimate={false}
          color="text-black"
        />

           <BodyText
          text="We have a proven track record of delivering innovative solutions across various sectors, including healthcare, finance, education, and more. Our expertise allows us to tailor our services to meet the unique needs of each industry."
          centered={false}
          isAnimate={false}
          color="text-black"
          className="max-w-4xl "
        />
      </div>

      <HorizontalListView perPage={2} mobilePerPage={1} >
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