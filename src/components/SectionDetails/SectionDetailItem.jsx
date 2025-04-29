import React from 'react';
import caretDown from '../../assets/icons/caretdown2.svg'; // Caret down icon
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import CustomButton from '../CustomButton/CustomButton';

const SectionDetailItem = ({ 
  serviceHeading, 
  details, 
  icons, 
  faqIcon, // Added dynamic faqIcon prop
  isActive, 
  onClick, 
  isLast 
}) => {
  return (
    <div className={`faq-item ${isActive ? 'active' : ''} ${isLast ? 'border-[1px]' : 'border-[1px]'} rounded-md my-10 px-2 lg:px-10 border-black py-4 lg:py-6`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
        {/* Left icon and heading */}
        <div className="flex items-center gap-4">
          <div className="bg-white border-2 lg:border-[3px] rounded-lg border-neon p-2 lg:p-4">
            <img src={faqIcon} alt="Service Icon" className="w-12 aspect-square svg-neon" /> {/* Use dynamic icon */}
          </div>
          <Heading text={serviceHeading} centered={false} size="text-50px" fontWeight='font-medium' />
        </div>

        {/* Caret icon */}
        <span className={`transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
          <img src={caretDown} alt="Caret Icon" className="w-6 lg:w-8 aspect-square" />
        </span>
      </div>

      {/* Expanded content */}
      {isActive && (
        <div className="pt-4">
          {/* Detail section */}
          <div className="">
            {/* Iterate over each detail */}
            {details.map((detail, idx) => (
              <div key={idx} className="flex flex-col items-start ">
       
                {/* BodyText2 (Description) */}
                <BodyText 
                  text={detail.description} 
                  centered={false} 
                  size="text-30px" 
                  className="leading-[2.5rem]" // Allows BodyText2 to fill remaining space
                  isAnimate={false}
                />
              </div>
            ))}
          </div>

          {/* Render icons row only if there are icons */}
          {/* {icons && icons.length > 0 && (
            <div className="flex justify-between items-center py-6">
              {icons.map((icon, idx) => (
                <img
                  key={idx}
                  src={icon}
                  alt={`Icon ${idx}`}
                  className="w-12 aspect-square opacity-25 hover:opacity-100 transition-opacity duration-300"
                />
              ))}
            </div>
          )} */}

          {/* Button */}
          <div className="pt-4">
            <CustomButton
              option="Let's Innovate"
              link="/lets-innovate"
              textColor="text-grayText"
              size="text-30px"
              padding="px-1 py-3"
              width="w-40"
              className="font-bold"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionDetailItem;
