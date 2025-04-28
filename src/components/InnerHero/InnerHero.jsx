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
  headingspanColor = "text-blue",
  headingText2 = "",
  spanText2 = "",
  bodyText,
  bodySize = "text-35px",
  gap = "gap-4",
  bottomShadow = true,
  centeredHeading1 = true,
  centeredHeading2 = true,
  centeredbodyText = true,
  breakSpan1 = false,
  isCareer = false,
  image = null,
}) => {
  return (
    <AnimatedBackground
      isInner={true}
      bottomShadow={bottomShadow}
      className={`flex flex-col w-full items-center justify-center ${gap} ${height} ${
        theme.layoutPages.paddingHorizontal
      } ${isCareer ? "lg:flex-row" : ""}`}
    >
      <div
        className={`flex flex-col ${gap} ${
          isCareer ? "lg:w-[60%] w-full items-start" : "w-full items-center"
        }`}
      >
        <Heading
          text={headingText}
          size={headingSize}
          spanText={spanText}
          color={headingColor}
          spanColor={headingspanColor}
          breakSpan={breakSpan1}
          centeredHeading1={!isCareer && centeredHeading1}
          className={`leading-tight ${isCareer ? "text-start" : "text-center"}`}
        />

        {headingText2 && (
          <div className={`w-full flex ${isCareer ? "justify-start" : "justify-center"}`}>
            <div className="border-4 rounded-full border-blue px-6 py-2 inline-block">
              <Heading
                text={headingText2}
                spanText={spanText2}
                color="text-black"
                spanColor="text-blue"
                size={headingSize2}
                fontWeight="font-medium"
                centeredHeading2={!isCareer && centeredHeading2}
                className="tracking-widest"
              />
            </div>
          </div>
        )}

        <BodyText
          text={bodyText}
          size={bodySize}
          centeredbodyText={!isCareer && centeredbodyText}
        />
      </div>

      {isCareer && image && (
        <div className={`${isCareer ? "lg:w-[40%] w-full" : ""} flex justify-center`}>
          <img src={image} alt="Career" className="w-3/4 h-auto" />
        </div>
      )}
    </AnimatedBackground>
  );
};

export default InnerHero;
