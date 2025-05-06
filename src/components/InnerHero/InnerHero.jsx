import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";

// Helper to map position keywords to Tailwind classes
const positionClassMap = {
  "top-left": "absolute top-2 left-[-10px] md:top-6 md:left-[-20px]",
  "top-right": "absolute top-0 right-0",
  "bottom-left": "absolute bottom-0 left-0",
  "bottom-right": "absolute bottom-4 right-[-20px] md:bottom-20 md:right-[-60px]",
  "logo": "absolute bottom-2 right-4 md:bottom-4 md:right-80",
};

const InnerHero = ({
  height = "min-h-screen",
  headingText,
  spanText,
  headingSize = "text-90px",
  headingColor = "text-black",
  headingspanColor = "text-black",
  headingText2 = "",
  spanText2 = "",
  headingSize2 = "text-60px",
  bodyText,
  bodySize = "text-30px",
  bottomShadow = true,
  contentPadding = "pr-0 xl:pr-60",
  images = [], // Array of {src, alt, position, className, style}
}) => {
  return (
    <AnimatedBackground
      bottomShadow={bottomShadow}
      className={`relative flex flex-col w-full items-start justify-center ${height} ${theme.layoutPages.paddingHorizontal}`}
    >
      {/* Render all images if provided */}
      {images.map((img, idx) => {
        const isBottomRight = img.position === "bottom-right";
        const responsiveClass = isBottomRight ? "hidden xl:block" : "";
        return (
          <img
            key={idx}
            src={img.src}
            alt={img.alt || `Decorative image`}
            className={`z-10 ${positionClassMap[img.position] || ""} ${responsiveClass} ${img.className || ""}`}
            style={img.style}
          />
        );
      })}

      <div className="flex flex-col w-full">
        <Heading
          text={headingText}
          size={headingSize}
          spanText={spanText}
          color={headingColor}
          spanColor={headingspanColor}
          breakSpan={false}
          centered={false}
          className={`leading-tight text-left ${contentPadding}`}
        />

        {headingText2 && (
          <div className="w-full flex justify-start mt-4">
            <div className="border-4 rounded-full border-neon px-6 py-2 inline-block">
              <Heading
                text={headingText2}
                spanText={spanText2}
                color="text-black"
                spanColor="text-neon"
                size={headingSize2}
                fontWeight="font-medium"
                centered={false}
                className={`tracking-widest text-left ${contentPadding}`}
              />
            </div>
          </div>
        )}

        <BodyText
          text={bodyText}
          size={bodySize}
          centered={false}
          className={`mt-2 text-left leading-tight ${contentPadding}`}
        />
      </div>
    </AnimatedBackground>
  );
};

export default InnerHero;
