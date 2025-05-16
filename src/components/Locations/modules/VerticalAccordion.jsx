import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import slideUpGsap from "../../../utilities/Animations/slideUpGsap";
import Heading from "../../Heading/Heading";
import accordionData from "./accordionData";
import BodyText from "../../BodyText/BodyText";

const VerticalAccordion = ({ isAnimate = true }) => {
    const [openIndex, setOpenIndex] = useState(isAnimate ? 0 : null);
    const contentRef = useRef([]);

    const handleToggle = (index) => {
        if (isAnimate) {
            setOpenIndex(index);
        }
    };

    useEffect(() => {
        // Preload all images in the accordion
        accordionData.forEach((item) => {
            const img = new Image();
            img.src = item.content.image;
        });
    }, []);

    useEffect(() => {
        if (!isAnimate) return;

        const handleImageLoad = () => {
            slideUpGsap(contentRef.current[openIndex], { delay: 0.3 });
        };

        const img = contentRef.current[openIndex]?.querySelector("img");
        if (img && img.complete) {
            handleImageLoad(); // Trigger immediately if already loaded
        } else if (img) {
            img.addEventListener("load", handleImageLoad); // Wait for image to load
        }

        return () => {
            if (img) img.removeEventListener("load", handleImageLoad);
        };
    }, [openIndex, isAnimate]);

    return (
        <div className="w-full overflow-hidden overflow-y-hidden">
            <div className="h-[90vh] lg:h-[75vh] flex flex-col lg:flex-row text-black border-b-0 lg:border-b border-neon border-x-0">
                {accordionData.map((item, index) => (
                    <motion.div
                        key={index}
                        onClick={() => handleToggle(index)}
                        animate={isAnimate ? {
                            flex: openIndex === index ? 3 : 1,
                            opacity: openIndex === index ? 1 : 0.8,
                        } : {
                            flex: 1,
                            opacity: 1,
                        }}
                        transition={isAnimate ? { duration: 0.5 } : { duration: 0 }}
                        className="relative cursor-pointer flex flex-col items-center justify-center border-x-0 border-b lg:border-b-0 lg:border-x border-neon overflow-hidden"
                    >
                        {(isAnimate && openIndex === index) || (!isAnimate) ? (
                            <div
                                ref={(el) => (contentRef.current[index] = el)}
                                className="w-full max-w-xl p-4 lg:p-10 overflow-y-auto flex flex-col items-center"
                            >
                                <img
                                    src={item.content.image}
                                    alt={item.title}
                                    className="w-3/4 lg:w-full h-auto object-contain mb-4 mx-auto svg-neon"
                                    loading='lazy'
                                />
                                <Heading
                                    text={item.title}
                                    color="text-black"
                                    font="font-manrope"
                                    size="text-50px"
                                    centered={true}
                                />
                                <BodyText text={item.content.address} size="text-25px" />
                                <a 
                                    href={`tel:${item.content.phone.replace(/\s+/g, '')}`} 
                                    className="text-25px transition font-normal hover:font-bold focus:font-bold"
                                >
                                    {item.content.phone}
                                </a>
                            </div>
                        ) : (
                            <span className="absolute font-uppercase bottom-2 right-1 flex flex-col uppercase text-50px lg:[writing-mode:vertical-rl] [writing-mode:horizontal-tb] lg:rotate-180">
                                <Heading text={item.country} isAnimate={false} />
                            </span>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default VerticalAccordion;