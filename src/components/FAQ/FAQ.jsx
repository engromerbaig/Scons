import React from "react";
import FAQNestedTabs from "./FAQNestedTabs";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";

const FAQ = () => {
  return (
    <section className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
      <div className="max-w-7xl mx-auto">
        <Heading
          text="Frequently Asked Questions"
          showUnderline
          className="pb-10"
          centered={false}
        />
        <BodyText
          text="Find answers to common questions about Tyfora’s services, processes, and how we empower businesses with innovative solutions."
          centered={false}
          className="max-w-2xl"
        />
        <div className="w-full transition-all duration-500 ease-in-out relative pt-10">
          <FAQNestedTabs />
        </div>
      </div>
    </section>
  );
};

export default FAQ;