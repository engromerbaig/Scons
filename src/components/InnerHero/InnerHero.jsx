import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";

const InnerHero = ({
  height = "min-h-screen",
  headingText,
  spanText,
  headingSize = "text-70px lg:text-90px",
  headingSize2 = "text-50px lg:text-60px",
  headingColor = "text-black",
  headingspanColor = "text-black",
  headingText2 = "",
  spanText2 = "",
  bodyText,
  bodySize = "text-35px",
  gap = "gap-0",
  bottomShadow = true,
  isCareer = false,
  image = null,
}) => {
  return (
    <AnimatedBackground
      isInner={true}
      bottomShadow={bottomShadow}
      className={`flex flex-col w-full items-start justify-center ${gap} ${height} ${theme.layoutPages.paddingHorizontal} ${
        isCareer ? "lg:flex-row" : ""
      }`}
    >
      <div
        className={`flex flex-col ${gap} ${isCareer ? "lg:w-[60%] w-full" : "w-full"}`}
      >
        <Heading
          text={headingText}
          size={headingSize}
          spanText={spanText}
          color={headingColor}
          spanColor={headingspanColor}
          breakSpan={false}
          centered={false} // Force left alignment
          className="leading-tight text-left"
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
                centered={false} // Force left alignment
                className="tracking-widest text-left"
              />
            </div>
          </div>
        )}

        <BodyText
          text={bodyText}
          size={bodySize}
          centered={false} // Force left alignment
          className="mt-2 text-left"
        />
      </div>

      {isCareer && image && (
        <div className="lg:w-[40%] w-full flex justify-center mt-8 lg:mt-0">
          <img src={image} alt="Career" className="w-3/4 h-auto" />
        </div>
      )}
    </AnimatedBackground>
  );
};

export default InnerHero;
