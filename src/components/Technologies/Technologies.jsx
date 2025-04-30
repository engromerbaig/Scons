import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import NestedTabs from "./NestedTabs"; // Adjust path accordingly

const Technologies = () => {
  return (
    <div
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
    >
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center items-start w-full mb-8">
          <Heading text="Our Technologies" centered={false} />
          <BodyText
            text="Hire from our pool of 350+ specialized experts in web, mobile, and software engineering, specializing in the latest technologies and frameworks, ready to scale your development teams effortlessly."
            centered={false}
          />
        </div>

        {/* Nested Tabs below the text */}
        <div className="w-full transition-all duration-300 ease-in-out" style={{ minHeight: "500px" }}>
    <NestedTabs />
  </div>      </div>
    </div>
  );
};

export default Technologies;
