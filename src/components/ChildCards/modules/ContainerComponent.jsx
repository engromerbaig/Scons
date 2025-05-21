import React, { useEffect, useRef } from "react";
import './index.css';
import { gsap } from "gsap";
import AnimatedBackground from "../../../utilities/AnimatedBackground/AnimatedBackground";
import Heading from "../../Heading/Heading";
import BodyText from "../../BodyText/BodyText";

const ContainerComponent = ({ logo, heading, number, text, glowColor }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    // GSAP animation for infinite clockwise rotation
    gsap.to(imageRef.current, {
      rotation: -360, // Rotate 360 degrees clockwise
      duration: 8, // 4 seconds per rotation
      repeat: -1, // Infinite repeat
      ease: "linear", // Smooth, linear rotation
    });
  }, []); // Empty dependency array to run once on mount

  return (
    <div className={`glow-right-container ${glowColor} flex-shrink-0 w-full h-full flex flex-col bg-charcoal lg:bg-transparent lg:border-b-[1px] lg:border-neon p-14 scrollbar-hide scroll-container`}>
      
      {/* First Div - Icon Section (50% height) */}
      <div className="flex flex-col items-center justify-center h-1/2">
        <img
          ref={imageRef}
          src={logo}
          className="w-16 aspect-square mb-4 svg-white"
          loading="lazy"
          alt="Icon"
        />
      </div>

      {/* Second Div - Content Section (50% height, aligned to top) */}
      <div className="glow-content flex flex-col justify-start items-start h-1/2">
        
        {/* Heading and Number */}
        <div className="w-full flex justify-between items-center mb-2">
          <Heading
            text={heading}
            size="text-40px"
            centered={false}
            color="text-white"
          />

          <Heading
            text={number}
            color="text-neon"
            centered={false}
          />
          
        </div>

        {/* Paragraph Text */}
        <BodyText
          text={text}
          color="text-white"
          centered={false}
          lineHeight="leading-tight"
          className="whitespace-normal break-words"
        />
        
      </div>

    </div>
  );
};

export default ContainerComponent;