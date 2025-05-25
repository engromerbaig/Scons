import React from "react";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Button from "../../components/Button/Button"; // Assuming Button is used in NestedTabs
import { technologiesData } from "../../components/Technologies/technologiesData";
import { theme } from "../../theme";

const TechUsed = ({ serviceHeading, heading}) => {
  // Get the main technology categories (e.g., "Mobile Apps", "Web Platforms")
  const technologyCategories = Object.keys(technologiesData);

  // Check if the service heading matches any technology category
  const matchedCategory = technologyCategories.find(
    (category) => category.toLowerCase() === serviceHeading.toLowerCase()
  );

  // Render the content for the matched category
  const renderContent = () => {
    if (!matchedCategory) return null; // Return null if no match

    const platforms = Object.keys(technologiesData[matchedCategory]);

    return (
      <div className="w-full transition-all duration-500 ease-in-out relative pt-10">
        {platforms.map((platform) => (
          <div key={platform} className="mb-10">
            <Heading
              text={platform}
              fontWeight="font-black"
              size="text-30px"
              className="mb-4"
              centered={false}
            />
            <div className="grid grid-cols-2 xl:grid-cols-3 max-w-xl gap-2 xl:gap-4">
              {technologiesData[matchedCategory][platform].map((tech) => (
                <Button
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  bgColor="bg-gray-100"
                  textColor="black"
                  fontWeight="font-semibold"
                  fontSize="text-xs xl:text-sm"
                  className="py-3"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}
    >
      <div className="max-w-7xl">
        <Heading
          text={`${heading} Technologies`}
          showUnderline
          className="pb-10"
          centered={false}
        />
        <BodyText
          text="Hire from our pool of 350+ specialized experts in web, mobile, and software engineering, specializing in the latest technologies and frameworks, ready to scale your development teams effortlessly."
          centered={false}
          className="max-w-2xl"
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default TechUsed;