import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import videoBg from "../../assets/videos/1.mp4";
import logoData from "./modules/logoData";

import InfiniteMarquee from "../InfiniteMarquee/InfiniteMarquee";

import './index.css';

const Hero = () => {
  // State and ref for the interactive Discuss button
  const [isHover, setIsHover] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const MAX_OFFSET = 40; // max movement in px for both axes

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let diffX = e.clientX - centerX;
    let diffY = e.clientY - centerY;
    // Clamp the movements
    diffX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, diffX));
    diffY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, diffY));
    setOffset({ x: diffX, y: diffY });
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="w-full min-h-screen flex flex-col border-b-2 border-gray-200">
      {/* Hero Section (90vh) */}
      <div className="relative w-full h-[90vh] overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={videoBg}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        {/* Content */}
        <div
          className={`${theme.layoutPages.paddingHorizontal} w-full h-full flex items-center justify-center relative z-20`}
        >
          {/* Centered text container */}
          <div className="w-full max-w-4xl text-left">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <div className="mb-4">
                <Heading
                  text="We are a Custom Software Development Company"
                  spanText="Software Development Company"
                  spanColor="text-neon"
                  fontWeight="font-black"
                  spanFontWeight="font-black"
                  size="text-90px"
                  color="text-white"
                  className="leading-none"
                  centered={false}
                />
              </div>

              <div>
                <BodyText
                  text="We are your trusted development partner with just one goal in focus - to build products that generate a lasting, profitable impact."
                  centered={false}
                  color="text-white"
                />
              </div>
            </motion.div>
          </div>

          {/* Interactive Neon Circle Button */}
          <div className="absolute bottom-10 right-40 select-none">
            <div
              ref={btnRef}
              className={`w-40 h-40 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 ${
                isHover ? "bg-white" : "bg-neon"
              }`}
              style={{
                transform: `
                  scale(${isHover ? 0.9 : 1})
                  translateX(${offset.x}px)
                  translateY(${offset.y}px)
                `,
                transformOrigin: "center",
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseMove={isHover ? handleMouseMove : undefined}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col justify-center items-center p-4">
              <p className="text-black font-black select-none text-3xl">↗</p>
              <p className="text-black font-black select-none text-center">Let's Discuss Your Idea </p>

              </div>
            </div>
          </div>

        </div>
        <div className="absolute bottom-4 left-20 z-20">
  <div className="flex items-center space-x-2">
    <span className="w-2 h-2 bg-neon rounded-full" />
    <p className="text-white text-sm font-medium text-left">Clients served by Econs family</p>
  </div>
</div>


      </div>

      {/* Carousel Section (10vh) */}
      <div className="w-full h-[10vh] flex items-center justify-center">
        <InfiniteMarquee
          items={logoData}
          speed={50}
          showBullets={false}
          pauseOnHover={true}
          renderItem={(item, idx) => (
            <img
              src={logoData[idx].image}
              alt={item.alt || `logo-${idx}`}
              className="h-[8vh]  object-contain mx-10"
              loading="lazy"
            />
          )}
        />
      </div>
    </div>
  );
};

export default Hero;
