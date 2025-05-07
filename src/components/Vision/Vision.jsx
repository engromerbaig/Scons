import { useState, useEffect } from 'react';
import { visionMissionData } from './visionMissionData';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { theme } from '../../theme';

const Vision = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedImage !== null ? 'hidden' : 'unset';
  }, [selectedImage]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start bg-black text-white ${theme.layoutPages.paddingHorizontal} py-16`}>
      
      {/* Main Heading */}
      <div className="mb-12 text-center">
        <Heading
          text="Our Vision & Goals"
          color="text-white"
          size="text-5xl"
          centered
          fontWeight="font-bold"
          isAnimate={false}
        />
      </div>

      {/* Collage Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-0">
        {visionMissionData.map((item, index) => (
          <div 
            key={index}
            className="relative w-full h-72 md:h-96 xl:h-[600px] cursor-pointer group overflow-hidden"
            // ^^^ height set here
          >
            {/* Image */}
            <img 
              src={item.imageSrc}
              alt={item.heading}
              className="w-full h-full object-cover"
            />

            {/* Overlay that slides from left */}
            <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out opacity-70" />

            {/* Text content: vertical and animated */}
            <div className="absolute bottom-4 left-2 flex flex-col lg:[writing-mode:vertical-rl] [writing-mode:horizontal-tb] lg:rotate-180 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out delay-300 opacity-0 group-hover:opacity-100">
              
              {/* Always visible heading */}
              <Heading
                text={item.heading}
                color="text-neon"
                size="text-40px"
                centered={false}
                fontWeight="font-semibold"
                isAnimate={false}
              />

              {/* Sliding body text */}
              <BodyText
                text={item.body}
                color="text-white"
                size="text-sm"
                centered={false}
                isAnimate={false}
                className='pb-6 xl:pb-40'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vision;
