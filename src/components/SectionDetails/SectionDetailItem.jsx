import React from 'react';
import caretDown from '../../assets/icons/caretdown2.svg'; // Caret down icon
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import CustomButton from '../CustomButton/CustomButton';
import Button from '../Button/Button';

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
    <div className={`faq-item ${isActive ? 'active' : ''} ${isLast ? 'border-[1px]' : 'border-[1px]'} rounded-md my-10 px-2 lg:px-10 border-neon py-4 lg:py-6`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
        {/* Left icon and heading */}
        <div className="flex items-center gap-4">
          <div className="bg-black border-2  rounded-lg border-neon p-2 lg:p-3">
            <img src={faqIcon} alt="Service Icon" className="w-10 aspect-square svg-neon" />
          </div>
          <Heading 
            text={serviceHeading} 
            centered={false} 
            size="text-50px" 
            color="text-white" 
            fontWeight="font-medium" 
          />
        </div>

        {/* Caret icon */}
        <span className={`transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
          <img src={caretDown} alt="Caret Icon" className="w-6 svg-neon aspect-square" />
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
                <BodyText 
                  text={detail.description} 
                  centered={false} 
                  color="text-white"
                  className="leading-loose"
                  isAnimate={false}
                />
              </div>
            ))}
          </div>

          {/* Render icons row only if there are icons */}
          {icons && icons.length > 0 && (
            <div className="flex justify-between items-center py-6">
              {icons.map((icon, idx) => (
                <img
                  key={idx}
                  src={icon}
                  alt={`Icon ${idx}`}
                  className="w-8 xl:w-12 aspect-square svg-neon opacity-50 hover:opacity-100 transition-opacity duration-300"
                />
              ))}
            </div>
          )}

          {/* Button */}
          <div className="pt-4">
             <Button
                  name="Contact Us"
                  size="text-sm"
                  textColor="black"
                  fontWeight="font-bold"
                  hoverTextColor='black'
                  bgColor="bg-neon"
                  hoverBgColor='bg-neon'
                  className="px-6 py-2"
                  link="/contact"
/>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionDetailItem;
