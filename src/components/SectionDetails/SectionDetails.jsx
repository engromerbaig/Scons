import React, { useState } from 'react';
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import SectionDetailItem from "./SectionDetailItem";
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';
import { theme } from '../../theme';
import GreenBelt from '../GreenBelt/GreenBelt';

const SectionDetails = ({ faqSpanText, faqBodyText, faqItems }) => {
  // Set the initial state to 0 so the first FAQ item is open by default
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);  // Toggle open/close
  };

  return (
    <div className={`min-h-screen  ${theme.layoutPages.paddingVertical}`} >
      <div className="flex flex-col gap-6 ">

      <GreenBelt className="">

      <Heading text="Beyond Development, We Build Journeys" spanText='We Build Journeys' size='text-70px' />


      </GreenBelt>

      </div>
   

      <div className={`faq-list bg-black ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
        {faqItems.map((item, index) => (
          <SectionDetailItem
            key={index}
            serviceHeading={item.serviceHeading}
            details={item.details}
            faqIcon={item.faqIcon[0]} // Pass the dynamic icon
            icons={item.icons} // Pass the icons at this level
            isActive={activeIndex === index}  // Compare with activeIndex
            onClick={() => handleClick(index)}  // Handle click to toggle
            isLast={index === faqItems.length - 1}
            className=""
          />
        ))}
      </div>
    </div>
  );
};

export default SectionDetails;
