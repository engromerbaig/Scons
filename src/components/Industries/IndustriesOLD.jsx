import React, { useState } from "react";
import Heading from "../Heading/Heading";
import IconBox from "./modules/IconBox";
import industries from "./industriesData";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import Descriptor from "../Descriptor/Descriptor";
import { theme } from "../../theme";

const DesktopColumn = ({ industries, index }) => (
    <div className="flex flex-col h-full">
        {index % 2 !== 0 && <div className="h-[10%]"></div>}
        {industries.map((industry, i) => (
                <IconBox key={i} name={industry.name} icon={industry.icon} details={industry.details} />
            ))}
        {index % 2 === 0 && <div className="h-[10%]"></div>}
    </div>
);

const MobileColumn = ({ industries, index }) => {
    const isCol2 = index === 1;
    const isCol1or3 = index === 0 || index === 2;

    return (
        <div className="flex flex-col h-full">
            <div className={`${isCol1or3 ? "h-[10%]" : ""}`}></div>
            {industries.map((industry, i) => (
                <IconBox key={i} name={industry.name} icon={industry.icon} details={industry.details} />
            ))}
            <div className={`${isCol1or3 ? "h-[10%]" : ""}`}></div>
        </div>
    );
};

const Industries = () => {
    const [animationStep, setAnimationStep] = useState(0);
    const handleHeadingComplete = () => setAnimationStep(1);
    const handleDescriptorComplete = () => setAnimationStep(2);

    // Distribute industries data for mobile layout
    const mobileColumns = [
        industries.filter((_, i) => i % 3 === 0).slice(0, 3), // 3 icons for col 1
        industries.filter((_, i) => i % 3 === 1).slice(0, 4), // 4 icons for col 2
        industries.filter((_, i) => i % 3 === 2).slice(0, 3), // 3 icons for col 3
    ];

    // Distribute industries data for desktop layout
    const desktopColumns = [0, 1, 2, 3, 4].map((colIndex) =>
        industries.filter((_, i) => i % 5 === colIndex).slice(0, 2) // 2 icons per col
    );

    return (
        <AnimatedBackground>
            <div
                className={`min-h-screen ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center`}
            >
                <div className="flex flex-col lg:flex-row justify-between items-start w-full py-20">
                    <Heading
                        text="We Serve Diverse"
                        spanText="Industries And Markets"
                        centered={false}
                        breakSpan={true}
                        isAnimate={animationStep === 0}
                        onAnimationComplete={handleHeadingComplete}
                        className="lg:pr-20"
                    />

                    {animationStep >= 1 && (
                        <Descriptor
                            text="Delivering innovative solutions to industries worldwide, empowering businesses in technology, healthcare, retail, education, and beyond."
                            isAnimate={animationStep === 1}
                            onAnimationComplete={handleDescriptorComplete}
                        />
                    )}
                </div>

                {/* Mobile Grid */}
                <div className="lg:hidden grid grid-cols-3 gap-0 w-full py-10 h-[60vh]">
                    {mobileColumns.map((col, index) => (
                        <MobileColumn
                            key={`mobile-${index}`}
                            industries={col}
                            index={index}
                        />
                    ))}
                </div>

                {/* Desktop Grid */}
                <div className="hidden lg:grid lg:grid-cols-5 gap-0 w-full py-10 h-[80vh]">
                    {desktopColumns.map((col, index) => (
                        <DesktopColumn
                            key={`desktop-${index}`}
                            industries={col}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </AnimatedBackground>
    );
};

export default Industries;
