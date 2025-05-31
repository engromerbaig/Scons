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
            text="Leverage our expertise in modern web design and development, mobile app solutions, SEO, digital marketing, and AI integration. We work with the latest technologies and frameworks to build fast, scalable, and intelligent digital experiences."
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
