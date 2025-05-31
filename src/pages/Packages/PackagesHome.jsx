
import { useState, useEffect } from "react";
import Heading from "../../components/Heading/Heading";
import { theme } from "../../theme";
import AnimatedArrow from "../../components/AnimatedArrow/AnimatedArrow";
import { packageData } from "./packageData";
import PackageCard from "./PackageCard";

const PackagesHome = () => {
  // Filter packages to only include IDs 1, 10, and 5, and sort to place ID 1 in the middle
  const selectedPackages = packageData
    .filter((pkg) => [1, 10, 5].includes(pkg.id))
    .sort((a, b) => {
      const order = { 10: 1, 1: 2, 5: 3 }; // ID 1 in the middle
      return order[a.id] - order[b.id];
    });

  return (
    <div
      id="packages"
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center`}
    >
      <div className="flex flex-col xl:flex-row xl:justify-between justify-start items-start xl:items-center w-full  mx-auto mb-12 xl:mb-20">
        <Heading
          text="Our Discounted Packages"
          spanText="Packages"
          centered={false}
          spanColor="text-neon"
          className="text-left"
          showUnderline
        />
        <AnimatedArrow
          text="Show All Packages"
          to="/packages"
          className="text-left self-auto xl:self-auto"
        />
      </div>
      <div
      className={`flex flex-wrap justify-center w-full  mx-auto xl:grid xl:grid-cols-3 gap-10 2xl:gap-20 xl:justify-between`}
      >
        {selectedPackages.map((pkg, index) => (
          <div
            key={pkg.id || `package-${index}`}
            className={`w-full max-w-md xl:max-w-none xl:w-full mb-8 xl:mx-3 ${
              pkg.id === 1 ? "lg:col-start-2 xl:col-start-auto" : ""
            }`}
          >
            <PackageCard packageInfo={pkg} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagesHome;
