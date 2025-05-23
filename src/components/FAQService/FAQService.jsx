import React, { useState } from 'react';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import HorizontalListView from '../../utilities/HorizontalListView';
import FAQBox from './FAQBox';
import { theme } from '../../theme';

const FAQService = ({ faqData, faqHeading }) => {
  const [activeIndex, setActiveIndex] = useState(0); // First box active by default

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!faqData || !Array.isArray(faqData)) return null;

  return (
    <div className={`w-full min-h-screen flex flex-col justify-center ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      <div className="flex flex-col items-start space-y-2">
        <Heading
          text={`Our ${faqHeading} Experts are here to Help`}
          spanText="Help"
          spanColor="text-neon"
          showUnderline
          size="text-70px"
          className="pb-8 max-w-4xl"
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
              onClick={() => handleClick(index)}
            />
          ))}
        </HorizontalListView>
      </div>
    </div>
  );
};

export default FAQService;
