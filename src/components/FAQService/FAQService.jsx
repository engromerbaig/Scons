import React, { useState } from 'react';
import Heading from "../Heading/Heading";
import FAQServiceItem from './FAQServiceItem'; // Import FAQServiceItem
import { theme } from "../../theme";

const FAQService = ({ faqTitle, faqData }) => {
  // Set activeIndex to 0 so the first FAQ item is open by default
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    // Toggle the active state (if the clicked index is already active, it will close it)
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`min-h-screen ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      <Heading text="Clear Answers to Your Key Questions" spanText="Key Questions" size="text-70px" className='pb-10' />

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
