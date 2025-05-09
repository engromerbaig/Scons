import React from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import './index.css';

import { theme } from "../../theme";
import businessSuccessMob from "../../assets/images/portfolio1.png";

const BusinessSuccess = () => {
    return (
        <div className={`grid min-h-screen bg-black ${theme.layoutPages.paddingHorizontal}`}>
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-12 min-h-screen pt-16">
                {/* Left Column */}
                <div className="col-span-12 md:col-span-9 flex flex-col justify-center items-start">
                    <Heading
                        text="Formula For Business Success"
                        color="text-neon"
                        centered={false}
                    />
                    <BodyText
                        text="Tyfora combines innovation, strategy, and flawless execution to deliver tech solutions that fuel growth and guarantee lasting success for your business."
                        centered={false}
                        color="text-white"
                    />
                </div>

                {/* Right Column - Image */}
                <div className="col-span-12 md:col-span-3 flex items-center justify-center">
                    <motion.img
                        src={businessSuccessMob}
                        alt="Business Success"
                        className="w-4/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col justify-center items-start min-h-screen py-10">
                <Heading
                    text="Formula For Business Success"
                    spanText="Business Success"
                    color="text-white"
                    spanColor="text-neon"
                    breakSpan={true}
                    centered={false}
                />
                <BodyText
                    text="Tyfora combines innovation, strategy, and flawless execution to deliver tech solutions that fuel growth and guarantee lasting success for your business."
                    centered={false}
                />
                <div className="flex items-center justify-center mt-10">
                    <motion.img
                        src={businessSuccessMob}
                        alt="Business Success Mobile"
                        className="w-4/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
};

export default BusinessSuccess;
