import { useState, useEffect, lazy } from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import { theme } from "../../theme";
import PackageCard from "./PackageCard";
import { packageData } from "./packageData";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import StartProjectBelt from "../../components/StartProjectBelt/StartProjectBelt";
import FilterControls from "../OurWork/FilterControls";
import usePackageFilters from "../../hooks/usePackageFilters";
import { motion } from "framer-motion";
import AnimatedHeading from "../../components/Hero/AnimatedHeading";
import ogLogo from "../../assets/images/og-default.jpg"; // Logo-based OG image

const InnerHero = lazy(() => import("../../components/InnerHero/InnerHero"));

const Packages = () => {
  const {
    selectedCategory,
    filteredPackages,
    uniqueCategories,
    handleCategoryChange,
    resetFilters,
  } = usePackageFilters(packageData);

  // Define preferred order
  const preferredOrder = ["Web Development", "Hybrid", "Design"];
  // Sort the remaining categories alphabetically, excluding the preferred ones
  const remainingCategories = uniqueCategories
    .filter((cat) => !preferredOrder.includes(cat))
    .sort();
  // Combine the preferred order and remaining
  const sortedCategories = [...preferredOrder, ...remainingCategories];

  // Group packages based on sorted categories
  const groupedPackages = selectedCategory === "All Categories"
    ? sortedCategories.reduce((acc, category) => {
        const categoryPackages = packageData.filter(
          (pkg) => pkg.category === category
        );
        if (categoryPackages.length > 0) {
          acc[category] = categoryPackages;
        }
        return acc;
      }, {})
    : { [selectedCategory]: filteredPackages };

  // Meta description (trim to 160 characters)
  const metaDescription =
    "Explore Scons' diverse packages for web development, design, and more, tailored to meet your business needs.".substring(0, 160);

  // Keywords
  const keywords = [
    "Scons",
    "packages",
    "web development",
    "design",
    "hybrid",
    "software solutions",
    "UK tech",
  ].join(", ");

  return (
    <div className={`${theme.layoutPages.paddingBottom}`}>
      <Helmet>
        <title>Packages | Scons</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href="https://sconstech.com/packages" />
        <meta property="og:title" content="Packages | Scons" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sconstech.com/packages" />
        <meta property="og:image" content={ogLogo} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Scons logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Packages | Scons" />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogLogo} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Software Packages",
            "provider": {
              "@type": "Organization",
              "name": "Scons",
              "url": "https://sconstech.com",
            },
            "description": metaDescription,
            "url": "https://sconstech.com/packages",
            "image": ogLogo,
          })}
        </script>
      </Helmet>

      <InnerHero height="h-[70vh]" headingColor="text-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-4">
            <AnimatedHeading
              prefixText="We Offer"
              animatedWords={["Design", "Web", "App", "AI", "SEO", "Marketing"]}
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
          uniqueServices={["All Categories", ...uniqueCategories]}
          handleServiceChange={handleCategoryChange}
          resetFilters={resetFilters}
          isNestedService={false}
          isPackages={true}
        />

        {Object.entries(groupedPackages).map(([category, packages]) => (
          <div key={category} className="mt-12">
            <Heading
              text={`${category} Packages`}
              centered={false}
              className="mb-10"
              showUnderline
            />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div key={pkg.id} className="w-full">
                  <PackageCard packageInfo={pkg} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <StartProjectBelt text="Custom Project" />
    </div>
  );
};

export default Packages;