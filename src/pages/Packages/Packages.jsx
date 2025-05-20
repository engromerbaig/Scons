import { lazy } from "react";

const Heading = lazy(() => import("../../components/Heading/Heading"));
const BodyText = lazy(() => import("../../components/BodyText/BodyText"));
import { theme } from "../../theme";

import PackageCard from "./PackageCard";


const Packages = () => {
    return ( <div className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} min-h-screen`}>

        PACKAGES HERE 

        <PackageCard/>
    </div> );
}
 
export default Packages;