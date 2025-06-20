import React from "react";
import NestedTabs from "./NestedTabs";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";

const Technologies = () => {
  return (
    <section className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
      <div className="max-w-7xl ">
         <Heading text="Our Core Technologies" showUnderline className="pb-10" centered={false} />
          <BodyText
            text="We specialize in modern web development, mobile apps, SEO, digital marketing, and early-stage AI integration. Using up-to-date frameworks and tools, we build fast, scalable, and user-focused digital solutions for startups and growing businesses."
            centered={false}
            className="max-w-3xl"
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
