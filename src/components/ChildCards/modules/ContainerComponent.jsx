import React, { useEffect, useRef } from "react";
import './index.css';
import { gsap } from "gsap";
import Heading from "../../Heading/Heading";
import BodyText from "../../BodyText/BodyText";

const ContainerComponent = ({ logo, heading, number, text, glowColor }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      rotation: -360,
      duration: 8,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className={`glow-right-container ${glowColor} flex-shrink-0 w-full h-full flex flex-col bg-charcoal lg:bg-transparent lg:border-b-[1px] lg:border-neon px-10 lg:px-14 py-14 scrollbar-hide scroll-container`}>

      {/* Top Row: Number (left), Icon (right) */}
      <div className="flex justify-between items-start w-full mb-4">
        <div className="">
     <Heading

          text={`<${number}>`}
          color="text-neon"
          centered={false}
          size="text-70px"
        />

        </div>
   

        <img
          ref={imageRef}
          src={logo}
          className="lg:w-16 w-10 aspect-square svg-neon"
          loading="lazy"
          alt="Icon"
        />
      </div>

      {/* Heading and Text Section */}
      <div className="flex flex-col items-start w-full">
        <Heading
          text={heading}
          size="text-40px"
          centered={false}
          color="text-white"
          className="mb-2"
        />

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
