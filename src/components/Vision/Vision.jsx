import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";

const Vision = ({ heading, span, body, imageSrc }) => (
  <section className={`bg-black ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
    <div className="text-white grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-4 md:px-16">
      {/* Image (optional) */}
      {imageSrc && (
        <div className="md:col-span-6 flex justify-center mb-6 md:mb-0">
          <img src={imageSrc} className="w-full max-w-md" alt="" />
        </div>
      )}
      {/* Text */}
      <div className={`md:col-span-6`}>
        <Heading text={heading} spanText={span} className="pb-2" spanColor="text-white" color="text-white" />
        <BodyText text={body} className="leading-loose" color="text-white" />
      </div>
    </div>
  </section>
);

export default Vision;
