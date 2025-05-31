import React, { useState } from 'react';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import HorizontalListView from '../../utilities/HorizontalListView';
import IndustryCard from '../Industries/modules/IndustryCard';
import { theme } from '../../theme';

const FAQService = ({ faqData, faqHeading }) => {
  const [activeIndex, setActiveIndex] = useState(null);

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
        <HorizontalListView perPage={3} mobilePerPage={1} showIndicators={true}>
          {faqData.map((item, index) => (
            <IndustryCard
              key={index}
              industry={{
                name: item.question,
                details: item.answer,
                image: item.image || '', // Use provided image or empty string for no background
                number: item.number || null, // Optional number field
              }}
              active={activeIndex === index}
              onHover={() => setActiveIndex(index)}
              onLeave={() => setActiveIndex(null)}
              borderColor="border-neon"
              showOverlay={false}
              showBorder={false}
              titleColor='text-black'
  bgColor="#ECEEF1" // light gray (same as Tailwind's bg-gray-200)
  hoverBgColor="#00c5ff" // example neon color              titleColor='text-black'

  answerFontSize='text-base'
  answerLineHeight='leading-loose'
  
            />
          ))}
        </HorizontalListView>
      </div>
    </div>
  );
};

export default FAQService;