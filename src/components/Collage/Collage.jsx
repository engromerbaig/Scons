import { useState, useEffect } from 'react';
import { gridData } from './modules/gridData';
import Heading from '../Heading/Heading';

import { theme } from '../../theme';

const Collage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.layoutPages.paddingHorizontal} pb-16 md:pb-20 lg:pb-24`}>
      {/* Grid Container */}
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full lg:gap-x-6">
        {gridData.map((image, index) => (
          <div 
            key={index} 
            className="relative w-full h-full cursor-pointer group overflow-hidden"
          >
            {/* Image */}
            <img 
              src={image.src} 
              alt={image.overlayText} 
              className="w-full h-full object-cover"
            />
            {/* Overlay that slides from left */}
            <div 
              className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out opacity-70"
            />
            {/* Text Container */}
            <div 
              className="absolute bottom-4 left-2 flex flex-col lg:[writing-mode:vertical-rl] [writing-mode:horizontal-tb] lg:rotate-180 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out delay-300 opacity-0 group-hover:opacity-100"
            >
              {/* Author */}
              <Heading 
                text={image.author} 
                color="text-white" 
                size="text-50px" 
                centered={false} 
                fontWeight='font-semibold' 
                isAnimate={false}
              />
              {/* Designation */}
              <Heading 
                text={image.designation} 
                color="text-blue" 
                fontWeight='font-medium' 
                size="text-50px" 
                centered={false} 
                isAnimate={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collage;