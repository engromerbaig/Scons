// src/pages/Packages.js
import { useState, lazy } from "react";
import { theme } from "../../theme";
import PackageCard from "./PackageCard";
import { packageData } from "./packageData";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import StartProjectBelt from "../../components/StartProjectBelt/StartProjectBelt";
import FilterControls from "../OurWork/FilterControls"; // Adjust path as needed
import usePackageFilters from "../../hooks/usePackageFilters"; // Adjust path as needed
import { motion } from "framer-motion";
import AnimatedHeading from "../../components/Hero/AnimatedHeading";

const InnerHero = lazy(() => import("../../components/InnerHero/InnerHero"));

const Packages = () => {
  const {
    selectedCategory,
    filteredPackages,
    uniqueCategories,
    handleCategoryChange,
    resetFilters,
  } = usePackageFilters(packageData);

  return (
    <div className={`${theme.layoutPages.paddingBottom} min-h-screen`}>
      <InnerHero height="h-[70vh]" headingColor="text-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-4">
            <AnimatedHeading
              prefixText="We Offer"
              animatedWords={["Design", "Web", "App", "Cheap"]}
              suffixText="Packages"
              color="text-black"
              fontWeight="font-black"
              className="leading-none"
              centered={false}
            />
          </div>
        </motion.div>

        <BodyText
          text="We offer a wide range of packages to meet your needs."
          centered={false}
        />
      </InnerHero>

      <div
        className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
      >
        <FilterControls
          selectedService={selectedCategory}
          uniqueServices={["All", ...uniqueCategories]} // Add "All" option
          handleServiceChange={handleCategoryChange}
          resetFilters={resetFilters}
          isNestedService={false} // No nested categories for packages
          isPackages
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} packageInfo={pkg} />
          ))}
        </div>
      </div>

      <StartProjectBelt text="Custom Project" />
    </div>
  );
};

export default Packages;