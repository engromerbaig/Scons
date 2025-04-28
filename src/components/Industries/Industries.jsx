import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import industries from "./industriesData";
import IconBox from "./modules/IconBox";
import { theme } from "../../theme";
import FadeInSection from "../../utilities/Animations/FadeInSection";

const Industries = () => {
    return (
        <AnimatedBackground noGrid={true} className={`${theme.layoutPages.paddingVertical}`}>
                <div className={`${theme.layoutPages.paddingHorizontal} flex flex-col items-center`}>
                    {/* Heading */}
                    <Heading
                        text="We Serve Diverse Industries And Markets"
                        spanText="Industries And Markets"
                        centered={true}
                        breakSpan={true}
                        className="leading-none"
                    />

                    {/* BodyText */}
                    <BodyText
                        text="Tyfora combines innovation, strategy, and flawless execution to deliver tech solutions that fuel growth and guarantee lasting success for your business."
                        className="px-4 lg:px-20"
                    />
                </div>

                {/* Industries Grid */}
                <FadeInSection>
                    <div className="flex flex-col items-center mt-10">
                        {/* Large screens: 3-4-3 layout */}
                        <div className="hidden lg:grid grid-cols-3 gap-4 w-full max-w-4xl px-4">
                            {industries.slice(0, 3).map((industry, index) => (
                                <IconBox key={index} {...industry} />
                            ))}
                        </div>

                        <div className="hidden lg:grid grid-cols-4 gap-4 w-full max-w-6xl px-4 mt-4">
                            {industries.slice(3, 7).map((industry, index) => (
                                <IconBox key={index} {...industry} />
                            ))}
                        </div>

                        <div className="hidden lg:grid grid-cols-3 gap-4 w-full max-w-4xl px-4 mt-4">
                            {industries.slice(7, 10).map((industry, index) => (
                                <IconBox key={index} {...industry} />
                            ))}
                        </div>

                        {/* Medium and below: 2 per row layout */}
                        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4 lg:hidden">
                            {industries.map((industry, index) => (
                                <IconBox key={index} {...industry} />
                            ))}
                        </div>
                    </div>
                </FadeInSection>
        </AnimatedBackground>
    );
};

export default Industries;
