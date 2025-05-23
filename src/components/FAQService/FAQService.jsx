import React, { useState } from 'react';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import HorizontalListView from '../../utilities/HorizontalListView';
import FAQBox from './FAQBox';
import { theme } from '../../theme';

const FAQService = ({ faqData, faqHeading }) => {
  const [activeIndex, setActiveIndex] = useState(0); // First box active by default
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleInteraction = (index, action) => {
    if (action === 'hover') {
      setHoveredIndex(index);
      setActiveIndex(null); // Deactivate any active card on hover
    } else if (action === 'leave') {
      setHoveredIndex(null); // Clear hover state
    } else {
      // Click action: toggle active state
      setActiveIndex(activeIndex === index ? null : index);
      setHoveredIndex(null); // Clear hover state on click
    }
  };

  if (!faqData || !Array.isArray(faqData)) return null;

  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-center ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
    >
      <div className="flex flex-col items-start space-y-2">
        <Heading
          text={`Our ${faqHeading} Experts are here to Help`}
          spanText={faqHeading}
          spanColor="text-neon"
          size="text-60px"
          className="pb-8 xl:max-w-5xl"
          centered={false}
        />
        <BodyText
          text={`Do you have any other questions regarding ${faqHeading}? Our experts at Scons are always here to help and guide you with anything you need.`}
          className="pb-14 max-w-3xl"
          centered={false}
        />
      </div>

      <div className="pt-16 w-full">
        <HorizontalListView perPage={3} mobilePerPage={1}>
          {faqData.map((item, index) => (
            <FAQBox
              key={index}
              question={item.question}
              answer={item.answer}
              isActive={activeIndex === index}
              isHovered={hoveredIndex === index}
              onClick={(action) => handleInteraction(index, action)}
            />
          ))}
        </HorizontalListView>
      </div>
    </div>
  );
};

export default FAQService;