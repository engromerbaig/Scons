import React from "react";
import Heading from "../Heading/Heading";
import VerticalAccordion from "./modules/VerticalAccordion";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import { theme } from "../../theme";
import GreenBelt from "../GreenBelt/GreenBelt";

const Locations = ({isAnimate}) => {
    return (
        <div className={`w-full  h-full   `}>

            <GreenBelt>
   <Heading
                    text="Our Global Hub's"
                    color="text-black"
                    size="text-50px"
                    centered={true}
                />

            </GreenBelt>
    

<VerticalAccordion isAnimate={isAnimate} />


            {/* Second row - Vertical Accordion */}
        </div>
    );
};

export default Locations;
