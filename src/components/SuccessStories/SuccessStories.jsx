import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import SuccessCard from "../SuccessCard/SuccessCard";

const SuccessStories = () => {
    return ( <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center  min-h-screen`}>
<div className="flex flex-row justify-between items-center w-full">
  <Heading text="Our Success Stories" className="text-left" />
  <BodyText text="More Case Studies →" className="text-right" />
</div>
<SuccessCard/>

    </div> );
}
 
export default SuccessStories;