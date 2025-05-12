import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import SplideTextCarousel from "../SplideCarousel/SplideTextCarousel";
import { theme } from "../../theme";
import patternImage from "../../assets/icons/pattern.svg";
import "./index.css";
import InfiniteMarquee from "../InfiniteMarquee/InfiniteMarquee";

const InnerHero = ({
  logoImage,
  illustrationImage,
  headingText,
  spanText,
  bodyText,
  height = "h-screen",
  headingSize = "text-70px",
  bodySize = "text-25px",
  showCarousel = true,
  carouselItems = [],
}) => {
  return (
    <section
      className={`
        relative flex items-center justify-center w-full bg-black z-10
        ${height}
        ${theme.layoutPages.paddingHorizontal}
        ${theme.layoutPages.paddingVertical}
        shadow-custom-bottom
      `}
    >
      {/* Pattern Image Overlay */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-full h-full bg-no-repeat bg-bottom bg-contain opacity-40 pointer-events-none z-0"
        style={{ backgroundImage: `url(${patternImage})` }}
      />

      {/* Main Content */}
      <div className="relative flex flex-col-reverse xl:flex-row items-center justify-between w-full gap-8 z-10 text-white">
        {/* Left Side: Logo, Heading, Body */}
        <div className="flex flex-col items-start justify-center flex-1 gap-4 text-left">
          {logoImage && (
            <img
              src={logoImage}
              alt="Logo"
              className="w-40 h-16 mb-0 object-contain svg-white"
            />
          )}
          <Heading
            text={headingText}
            spanText={spanText}
            size={headingSize}
            color="text-white"
            spanColor="text-neon"
            fontWeight="font-black"
            spanFontWeight="font-black"
            centered={false}
            className="leading-none"
          />
          <BodyText
            text={bodyText}
            size={bodySize}
            color="text-white"
            centered={false}
            className="mt-2 leading-none"
          />
        </div>

        {/* Right Side: Illustration (visible only on xl and above) */}
        <div className="hidden xl:flex flex-1 items-center justify-center">
          {illustrationImage && (
            <img
              src={illustrationImage}
              alt="Hero Illustration"
              className="w-full max-w-lg object-contain"
            />
          )}
        </div>
      </div>

      {/* Optional Carousel */}
      {showCarousel && carouselItems.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full z-20">
          <InfiniteMarquee speed={70} items={carouselItems} textColor="text-white" />
        </div>
      )}
    </section>
  );
};

export default InnerHero;
