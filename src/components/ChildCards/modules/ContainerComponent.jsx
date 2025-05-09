// ContainerComponent.js
import React from "react";
import './index.css';
import AnimatedBackground from "../../../utilities/AnimatedBackground/AnimatedBackground";
import Heading from "../../Heading/Heading";
import BodyText from "../../BodyText/BodyText";

const ContainerComponent = ({ logo, heading, number, text }) => (
    <div className="glow-right-container flex-shrink-0 h-screen flex flex-col border-r-2 bg-charcoal border-black p-10 scrollbar-hide scroll-container">
      
      {/* First Div - Icon Section (50% height) */}
      <div className="flex flex-col items-center justify-center h-1/2">
        <img src={logo} className="md:w-32 w-24 aspect-square"               loading="lazy"
 alt="Icon" />
      </div>

      {/* Second Div - Content Section (50% height, aligned to top) */}
      <div className="glow-content flex flex-col justify-start items-start h-1/2">
        
        {/* Heading and Number */}
        <div className="w-full flex justify-between items-center mb-2">
          <Heading
          text={heading}
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
          lineHeight="leading-loose"
          className="whitespace-normal break-words"
          />
        
      </div>

    </div>
);

export default ContainerComponent;
