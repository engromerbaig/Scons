import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";

const InnerHero = ({
  logoImage,
  illustrationImage,
  headingText,
  spanText,
  bodyText,
  height = "h-screen", // Default full viewport height
  headingSize = "text-90px",
  bodySize = "text-30px",
}) => (
  <section
  className={`
    relative w-full flex items-center justify-center
    ${height} 
    ${theme.layoutPages.paddingHorizontal}
    ${theme.layoutPages.paddingVertical}
  `}
  style={{
    background: "linear-gradient(to bottom, #B8C3C4 0%, #B8C3C4 80%, #ECE9DF 90%)"
    // Replace #1e3a8a and #f5f5dc with your actual heroBlue and beige hex codes
  }}
>
    <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-0">
      {/* Left Side: Logo, Heading, Body */}
      <div className="flex flex-col items-start justify-center flex-1 gap-2">
        {logoImage && (
          <img src={logoImage} alt="Logo" className="w-32 h-16 mb-0 object-contain" />
        )}
        <Heading
          text={headingText}
          spanText={spanText}
          size={headingSize}
          color="text-black"
          spanColor="text-black"
          fontWeight="font-black"
          spanFontWeight="font-black"
          centered={false}
          className=" leading-none"
        />
        <BodyText
          text={bodyText}
          size={bodySize}
          color="text-black"
          centered={false}
          className="mt-2 leading-none"
        />
      </div>

      {/* Right Side: Illustration */}
      <div className="flex-1 flex items-center justify-center">
        {illustrationImage && (
          <img
            src={illustrationImage}
            alt="Hero Illustration"
            className="w-full max-w-lg object-contain"
          />
        )}
      </div>
    </div>
  </section>
);

export default InnerHero;
