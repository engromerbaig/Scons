import React from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import './index.css';
import { theme } from "../../theme";
import timelineImage from "../../assets/icons/arrow.svg";

const BusinessSuccess = ({heading, spanHeading, bodyText}) => {
  const content = (
    <>
      <Heading
        text={heading}
        spanText={spanHeading}
        color="text-white"
        spanColor="text-neon"
        centered={false}
      />
      <BodyText
        text={bodyText}
        centered={false}
        color="text-white"
      />
    </>
  );

  return (
    <div className={`grid  bg-black ${theme.layoutPages.paddingHorizontal}  `}>
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-12 min-h-screen ">
        <div className="col-span-12 md:col-span-8 md:pr-10 flex flex-col justify-center items-start">
          {content}
        </div>
        <div className="col-span-12 md:col-span-4 h-screen flex items-center justify-center">
    <motion.img
      src={timelineImage}
      alt="Timeline Overview"
      className="w-full h-full object-cover" // Changed from object-contain
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      loading="lazy"
    />
  </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col justify-center items-start  py-10">
        {content}
      </div>
    </div>
  );
};

export default BusinessSuccess;