import { useState } from "react";
import { theme } from "../../theme";
import PackageCard from "./PackageCard";
import { packageData } from "./packageData";

const Packages = () => {
    return (
        <div className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
            {packageData.map((pkg) => (
                <PackageCard key={pkg.id} packageInfo={pkg} />
            ))}
        </div>
    );
};

export default Packages;
