import React from "react";
import Heading from "../Heading/Heading";
import VerticalAccordion from "./modules/VerticalAccordion";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import { theme } from "../../theme";

const Locations = ({isAnimate}) => {
    return (
        <div className={`w-full  h-full   `}>
            {/* First row - Title section */}
            <div className={`bg-neon ${theme.layoutPages.paddingHorizontal} py-10`}>
                <Heading
                    text="Innovation Centers Across The Globe"
                    color="text-black"
                    size="text-50px"
                    centered={true}
                />
            </div>

<VerticalAccordion isAnimate={isAnimate} />


            {/* Second row - Vertical Accordion */}
        </div>
    );
};

export default Locations;
