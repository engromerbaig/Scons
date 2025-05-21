import { useState, lazy } from "react";
import { theme } from "../../theme";
import PackageCard from "./PackageCard";
import { packageData } from "./packageData";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import StartProjectBelt from "../../components/StartProjectBelt/StartProjectBelt";

const InnerHero = lazy(() => import("../../components/InnerHero/InnerHero"));


const Packages = () => {
    return (
        <div className={`${theme.layoutPages.paddingBottom}  min-h-screen `}>

                 <InnerHero
      
        headingText="Packages"
        bodyText="Choose the package that best fits your needs."
        height="h-[50vh]"
        headingColor="text-black"
      />

<div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
  {packageData.map((pkg) => (
                <PackageCard key={pkg.id} packageInfo={pkg}  />
            ))}


            </div>




</div>

<StartProjectBelt text="Custom Project"/>

          
        </div>
    );
};

export default Packages;
