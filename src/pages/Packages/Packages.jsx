import { useState } from "react";
import { theme } from "../../theme";
import PackageCard from "./PackageCard";
import { packageData } from "./packageData";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import StartProjectBelt from "../../components/StartProjectBelt/StartProjectBelt";

const Packages = () => {
    return (
        <div className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} min-h-screen `}>
            <div className="flex flex-col pb-10 ">
            <Heading
            text="Packages"
            />
            <BodyText
            text="Choose the package that best fits your needs."
            />

            
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {packageData.map((pkg) => (
                <PackageCard key={pkg.id} packageInfo={pkg} />
            ))}


            </div>


<StartProjectBelt text="Custom Project"/>

          
        </div>
    );
};

export default Packages;
