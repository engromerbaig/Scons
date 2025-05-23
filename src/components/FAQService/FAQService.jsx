import React, { useState } from 'react';
import Heading from "../Heading/Heading";
import BodyText from '../BodyText/BodyText';
import FAQServiceItem from './FAQServiceItem'; // Import FAQServiceItem
import { theme } from "../../theme";

const FAQService = ({ faqData, faqHeading }) => {
  // Set activeIndex to 0 so the first FAQ item is open by default
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    // Toggle the active state (if the clicked index is already active, it will close it)
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`min-h-screen ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>

      <flex className="flex-col items-start ">

      <Heading text="We are Here to Help" showUnderline spanText="Help" size="text-70px" className='pb-6' centered={false} />
      <BodyText text={`You have anything else regatding ${faqHeading} we can help you with?`} className='pb-6'  centered={false}  />


      </flex>

      {/* FAQ items */}
      <div className={`faq-list ${theme.layoutPages.conatinerVerticalGap}`}>
        {faqData.map((item, index) => (
          <FAQServiceItem
            key={index}
            question={item.question}
            answer={item.answer}
            isActive={activeIndex === index}  // Check if the item is active
            onClick={() => handleClick(index)}  // Handle toggle click
          />
        ))}
      </div>
    </div>
  );
};

export default FAQService;
