import React from "react";
import NestedTabs from "./NestedTabs";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";

const Technologies = () => {
  return (
    <section className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
      <div className="max-w-7xl ">
         <Heading text="Our Technologies" showUnderline className="pb-10" centered={false} />
          <BodyText
            text="Hire from our pool of 350+ specialized experts in web, mobile, and software engineering, specializing in the latest technologies and frameworks, ready to scale your development teams effortlessly."
            centered={false}
            className="max-w-2xl"
          />

        {/* Wrapper to prevent layout shift */}
        <div className="w-full transition-all duration-500 ease-in-out relative pt-10">
          <NestedTabs />
        </div>
      </div>
    </section>
  );
};

export default Technologies;
