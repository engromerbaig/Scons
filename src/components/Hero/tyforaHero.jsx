import React from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import waveImage from "../../assets/images/wave.png";
import Marquee from "../Marquee/Marquee";
import InfiniteCarousel from "../InfiniteCarousel/InfiniteCarousel";
import logoData from "./modules/logoData";

import './index.css';

const slideContent = {
  title: "Innovative Solutions Through",
  subtitle: "Custom Software Development",
  description:
    "Empowering businesses with tailored, cutting-edge tech solutions that transform ideas into impactful realities.",
};

const HeroTyfora = () => {
  return (
    <div
      className="hero-section relative flex flex-col w-full min-h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${waveImage})`,
        backgroundPosition: "50% 50%", // Changed from "center center" to move it down
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div
        className={`${theme.layoutPages.paddingHorizontal} w-full grid grid-cols-12 items-center text-center py-2 lg:py-6 relative z-10 flex-grow`}
      >
        <div className="col-span-12">
          <motion.div>
            {/* Subtitle Section */}
            <div className="relative w-full">
              <Heading
                text="Custom Software"
                fontWeight="font-medium"
                size="text-90px lg:text-111px"
                className="leading-none uppercase"
                centered={true}
              />
            </div>

            <div className="relative w-full">
              <Heading
                text="Development"
                fontWeight="font-semibold"
                size="text-120px lg:text-180px"
                className="leading-none outlined-text-3 uppercase tracking-wider"
                fontFamily="font-poppins"
                centered={true}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section with Description and Carousel Placeholder */}
      <div className={`${theme.layoutPages.paddingHorizontal} w-full pb-6 grid grid-cols-1 md:grid-cols-2 gap-8`}>
        {/* Left Side - Description */}
        <div className="flex items-center">
          <BodyText
            text={slideContent.description}
            size="text-30px"
            className="max-w-md lg:text-start"
          />
        </div>
        
        {/* Right Side - Carousel Placeholder */}
        <div className="flex items-center justify-center  ">
          <div className="text-center">
          <BodyText
            text="Trusted by 10,000+ companies around the world"
            size="text-30px"
            color="text-black"
            fontWeight="font-semibold"
          />
            <p className="text-lg font-medium mb-4"></p>
            {/* <p className="text-sm text-gray-300">Future carousel component will be placed here</p> */}
            <InfiniteCarousel
          width="150px"
          height="100px"
            widthMob="150px"
          heightMob="80px"
          duration="20s"
        >
          {logoData.map((logoItem, index) => (
            <div key={index} className="logo-item">
              <img src={logoItem.image} alt={`Logo ${index + 1}`} className="w-32 md:w-96" />
            </div>
          ))}
        </InfiniteCarousel>          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTyfora;