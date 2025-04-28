import React from 'react';
import Heading from '../Heading/Heading';

const TextMarquee = ({ services }) => {
  // Double the items to create seamless loop
  const doubledServices = [...services, ...services];

  return (
    <div className="w-full overflow-hidden whitespace-nowrap relative h-full">
      <div className="animate-marquee inline-flex items-center absolute">
        {doubledServices.map((service, index) => (
          <div key={index} className="flex items-center px-8 shrink-0">
            {/* Custom Circle */}
            <div className="w-6 h-6 mr-14 bg-blue rounded-full shrink-0"></div>
            <div className="truncate w-full">
              <Heading 
                text={service.heading} 
                size='text-150px' 
                color='text-blueLight' 
                isAnimate={false} 
                fontWeight='font-semibold' 
                spanFontWeight='font-semibold' 
                centered={false} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextMarquee;