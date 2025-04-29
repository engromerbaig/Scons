import React from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import videoBg from "../../assets/videos/1.mp4";

import './index.css';

const Hero = () => {
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
                  spanColor="text-green-400"
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
                  text="We are your trusted development partner with just one goal in focus — to build products that generate a lasting, profitable impact."
                  centered={false}
                />
              </div>
            </motion.div>
          </div>

          {/* Green Circle */}
          <div className="absolute bottom-20 right-40">
            <div className="w-32 h-32 bg-green-400 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-500 transition">
              <span className="text-white font-bold">Let's Discuss</span>
            </div>
          </div>

        </div>
      </div>

      {/* Carousel Placeholder (10vh) */}
      <div className="w-full h-[10vh] flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Carousel Placeholder</p>
      </div>
    </div>
  );
};

export default Hero;
