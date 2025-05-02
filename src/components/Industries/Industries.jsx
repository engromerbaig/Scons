import React from "react";
import Heading from "../Heading/Heading";
import IconBox from "./modules/IconBox";
import industries from "./industriesData";
import { theme } from "../../theme";

const DesktopColumn = ({ industries, index }) => (
    <div className="flex flex-col h-full">
        {index % 2 !== 0 && <div className="h-[10%]"></div>}
        {industries.map((industry, i) => (
            <IconBox
                key={i}
                name={industry.name}
                icon={industry.icon}
                details={industry.details}
            />
        ))}
        {index % 2 === 0 && <div className="h-[10%]"></div>}
    </div>
);

const MobileColumn = ({ industries, index }) => {
    const isCol1or3 = index === 0 || index === 2;

    return (
        <div className="flex flex-col h-full">
            <div className={`${isCol1or3 ? "h-[10%]" : ""}`}></div>
            {industries.map((industry, i) => (
                <IconBox
                    key={i}
                    name={industry.name}
                    icon={industry.icon}
                    details={industry.details}
                />
            ))}
            <div className={`${isCol1or3 ? "h-[10%]" : ""}`}></div>
        </div>
    );
};

const Industries = () => {
    const mobileColumns = [
        industries.filter((_, i) => i % 3 === 0).slice(0, 3),
        industries.filter((_, i) => i % 3 === 1).slice(0, 4),
        industries.filter((_, i) => i % 3 === 2).slice(0, 3),
    ];

    const desktopColumns = [0, 1, 2, 3, 4].map((colIndex) =>
        industries.filter((_, i) => i % 5 === colIndex).slice(0, 2)
    );

    return (
        <div className={`min-h-screen bg-black text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center`}>
            <div className="flex flex-col md:flex-row justify-between items-start w-full py-20">
                <Heading
                    text="We Serve Diverse Industries And Markets"
                    centered={false}
                    breakSpan={true}
                    isAnimate={false}
                    color="text-white"
                    className="md:pr-20"
                />
            </div>

            {/* Mobile Grid */}
            <div className="md:hidden grid grid-cols-3 gap-0 w-full py-10 h-[80vh]">
                {mobileColumns.map((col, index) => (
                    <MobileColumn
                        key={`mobile-${index}`}
                        industries={col}
                        index={index}
                    />
                ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-5 gap-0 w-full py-10 h-[80vh]">
                {desktopColumns.map((col, index) => (
                    <DesktopColumn
                        key={`desktop-${index}`}
                        industries={col}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Industries;
