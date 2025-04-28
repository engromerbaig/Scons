import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import { theme } from "../../theme";
import slideInGsap from "../../utilities/Animations/slideInGsap";

const Vision = ({ headingText, spanText, bodyText, imageSrc, isImageLeft }) => {
    const containerRef = useRef(null); // Ref for the container

    useEffect(() => {
        // Apply slide-in animation with Intersection Observer
        slideInGsap(containerRef.current, { fromRight: isImageLeft, delay: 0.2 });
    }, [isImageLeft]);

    return (
        <div
            className={
                isImageLeft ? "py-10" : " py-10"
            }
        >
            <div
                ref={containerRef} // Attach ref for animation
                className={`opacity-0 translate-x-[-100px] text-white grid grid-cols-1 md:grid-cols-12  py-10 ${theme.layoutPages.paddingHorizontal} `}
            >
                {/* Image: Top or Left */}
                {imageSrc && (
                    <div
                        className={`p-6 flex items-center justify-center ${
                            isImageLeft
                                ? "md:col-span-6 md:order-first"
                                : "md:col-span-6 md:order-last"
                        }`}
                    >
                        <img
                            src={imageSrc}
                            className="w-full p-4 lg:p-0 "
                            alt="Decorative Icon"
                        />
                    </div>
                )}

                {/* Heading and BodyText */}
                <div
                    className={`p-6 flex flex-col justify-between h-full ${
                        isImageLeft
                            ? "md:col-span-6 md:order-last"
                            : "md:col-span-6 md:order-first"
                    }`}
                >
                    <Heading
                        text={headingText}
                        spanText={spanText}
                        centered={false}
                        className="pb-2"
                    />
                    <BodyText
                        text={bodyText}
                        centered={false}
                        lineHeight="leading-loose"
                    />
                </div>
            </div>
        </div>
    );
};

Vision.propTypes = {
    headingText: PropTypes.string.isRequired,
    spanText: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    imageSrc: PropTypes.string, // No default value
    isImageLeft: PropTypes.bool.isRequired,
};

export default Vision;
