import React, { useState } from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import arrowGif from "../../assets/images/portfolio1.png"; // Import the GIF file
import './index.css'

// image of arrow
import arrowInfinite from "../../assets/images/portfolio1.png"; // Import the GIF file

import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import { theme } from "../../theme";
import businessSuccessMob from "../../assets/images/portfolio1.png";

const BusinessSuccess = () => {
    const [animationStep, setAnimationStep] = useState(0); // Control sequential animation for below-md layout.

    // Handlers to move through animation steps
    const handleFirstHeadingComplete = () => setAnimationStep(1);
    const handleSecondHeadingComplete = () => setAnimationStep(2);
    const handleBodyTextComplete = () => setAnimationStep(3);

    // Fade-in animation for the GIF
    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };

    return (
        <div
            className={`grid min-h-screen ${theme.layoutPages.paddingHorizontal} $`}
        >
            {/* Layout for md and above */}
            <div className="hidden md:grid md:grid-cols-12 min-h-screen pt-16 md:py-0">
                {/* Left Column */}
                <div className={`col-span-12 md:col-span-9 flex flex-col justify-center items-start`}>
                    <Heading
                        text="Formula For Business Success"
                        color="text-neon"
                        size="text-50px"
                        centered={false}
                    />
                    <BodyText
                        text="Tyfora combines innovation, strategy, and flawless execution to deliver tech solutions that fuel growth and guarantee lasting success for your business."
                        centered={false}
                    />
                </div>

                {/* Right Column - GIF */}
                <div className="col-span-12 md:col-span-3 flex items-end md:items-center justify-center " id="arrows">
                    
                </div>
            </div>


            {/* mobile buisness */}

            {/* Layout for below md */}
            <div className="md:hidden flex flex-col justify-center items-start min-h-screen">
                {/* First Heading */}
                <div className="text-left min-h-[60px] relative">
                    {animationStep >= 0 && (
                        <Heading
                            text="Formula For Business Success"
                            spanText="Business Success"
                            color="text-white"
                            spanColor="text-neon"
                            breakSpan={true}
                            centered={false}
                            isAnimate={animationStep === 0}
                            onAnimationComplete={handleFirstHeadingComplete}
                        />
                    )}
                    {/* Placeholder for heading */}
                    <Heading
                        text="Formula For Business Success"
                        spanText="Business Success"
                        className="absolute invisible"
                        color="text-white"
                        spanColor="text-neon"
                        breakSpan={true}
                        centered={false}
                    />
                </div>

                {/* Body Text */}
                <div className="text-left min-h-[80px] relative">
                    {animationStep >= 1 && (
                        <BodyText
                            text="Tyfora combines innovation, strategy, and flawless execution to deliver tech solutions that fuel growth and guarantee lasting success for your business."
                            centered={false}
                            isAnimate={animationStep === 1}
                            onAnimationComplete={handleBodyTextComplete}
                        />
                    )}
                    {/* Placeholder for body text */}
                    <BodyText
                        text="Tyfora combines innovation, strategy, and flawless execution to deliver tech solutions that fuel growth and guarantee lasting success for your business."
                        className="absolute invisible"
                        centered={false}
                    />
                </div>

                {/* Image Section */}
                <div className="flex items-center justify-center mt-10 min-h-[200px] relative">
                    {animationStep >= 2 && (
                        <motion.div
                            className="w-full flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: animationStep >= 2 ? 1 : 0 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.img
                                src={businessSuccessMob}
                                alt="Business Success Mobile"
                                className="w-4/5"
                                loading="lazy"
                            />
                        </motion.div>
                    )}
                    {/* Placeholder for image */}
                    <img
                        src={businessSuccessMob}
                        alt="Business Success Mobile Placeholder"
                        className="absolute invisible w-4/5"
                    />
                </div>
            </div>








        </div>
    );
};

export default BusinessSuccess;
