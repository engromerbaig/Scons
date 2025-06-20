import React, { useRef } from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import "./index.css";
import { theme } from "../../theme";
import FadeWrapper from "../../utilities/Animations/FadeWrapper";
import { useVhVariable } from "../../utilities/useVhVariable";
const InnerHero = ({
  logoImages = [],
  illustrationImage,
  headingText,
  spanText,
  bodyText,
  height = "h-screen",
  headingSize = "text-70px",
  bodySize = "text-25px",
  headingColor = "text-black",
  bodyTextColor = "text-black",
  illustrationImageWidth = "w-4/5 md:w-3/5 xl:w-full xl:max-w-lg",
  showCarousel = true,
  carouselItems = [],
  showBottomShadow = true,
  children,
  bgColor = "bg-white",
  logoWidth="w-32",
  showPattern = true,
  patternSrc = "/iso.webp",
}) => {
  const patternRef = useRef(null);

    const heroRef = useRef(null);
    useVhVariable(heroRef);

  return (
    <section
    ref={heroRef}
      className={`
        relative flex items-center justify-center w-full z-10
        ${theme.layoutPages.paddingVertical}
        ${theme.layoutPages.paddingHorizontal}
        ${bgColor}
        ${height}
        ${showBottomShadow ? "shadow-custom-bottom" : ""}
      `}
    >
      {showPattern && (
        <div
          ref={patternRef}
          aria-hidden
          className="absolute bottom-0 left-0 w-full h-full bg-no-repeat bg-bottom bg-cover pointer-events-none z-0 opacity-100"
          style={{ backgroundImage: `url(${patternSrc})`, opacity: 0.04 }}
        />
      )}

      <div className="relative flex flex-col xl:flex-row items-center justify-between w-full gap-8 z-10 text-white">
        {/* Left Side */}
        <FadeWrapper
          order={1}
          className="flex flex-col items-start justify-center flex-1 gap-4 text-left"
        >
          {logoImages.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 mb-2">
              {logoImages.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className={`${logoWidth}  object-contain`}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          <Heading
            text={headingText}
            spanText={spanText}
            size={headingSize}
            color={headingColor}
            spanColor="text-neon"
            fontWeight="font-black"
            spanFontWeight="font-black"
            centered={false}
            className="leading-none"
          />
          <BodyText
            text={bodyText}
            size={bodySize}
            color={bodyTextColor}
            centered={false}
            className="mt-2 leading-none"
          />
          {children && <div className="mt-4">{children}</div>}
        </FadeWrapper>

        {/* Right Side: Illustration */}
        <FadeWrapper
          order={2}
          className="flex flex-1 items-center justify-center"
        >
          {illustrationImage && (
            <img
              src={illustrationImage}
              alt="Hero Illustration"
              className={`${illustrationImageWidth} aspect-[4/3] object-contain`}
              loading="eager"
            />
          )}
        </FadeWrapper>
      </div>
    </section>
  );
};

export default InnerHero;
