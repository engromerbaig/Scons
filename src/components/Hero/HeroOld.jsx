import React from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import { theme } from "../../theme";

import './index.css';

const slideContent = {
  title: "Innovative Solutions Through",
  subtitle: "Custom Software Development",
  description:
    "Empowering businesses with tailored, cutting-edge tech solutions that transform ideas into impactful realities.",
};

const HeroOld = () => {
  return (
    <AnimatedBackground className={`hero-section relative flex flex-col w-full min-h-screen`}>
      <div
        className={`${theme.layoutPages.paddingHorizontal} w-full grid grid-cols-12 items-center text-center py-2 lg:py-6 relative z-10 flex-grow`}
      >
        <div className="col-span-12">
          <motion.div>
            {/* Title Section */}
            <div className="relative w-full">
              <Heading text={slideContent.title} size="text-50px" color="text-blue" />
            </div>

            {/* Subtitle Section */}
            <div className="relative w-full">
              <Heading
                text="Custom Software"
                spanText="Software"
                fontWeight="font-semibold"
                spanFontWeight="font-normal"
                size="text-90px"
                className="leading-none"
                centered={true}
              />
            </div>

            <div className="relative w-full">
              <Heading
                text="Development"
                fontWeight="font-semibold"
                size="text-120px lg:text-150px"
                className="leading-none"
                centered={true}
              />
            </div>

            {/* Description Section */}
            <div className="relative w-full">
              <BodyText
                text={slideContent.description}
                centered={true}
                className="md:px-20 lg:px-40"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default HeroOld;