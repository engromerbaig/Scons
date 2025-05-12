import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import InfiniteMarquee from "../InfiniteMarquee/InfiniteMarquee";
import patternImage from "../../assets/icons/pattern.svg"; // default
import "./index.css";
import { theme } from "../../theme";

const InnerHero = ({
  logoImage,
  illustrationImage,
  headingText,
  spanText,
  bodyText,
  height = "h-screen",
  headingSize = "text-70px",
  bodySize = "text-25px",
  headingColor = "text-white",
  bodyTextColor = "text-white",
  showCarousel = true,
  carouselItems = [],
  showBottomShadow = false,
  logoIsWhite = false,
  children,
  bgColor = "bg-black",
  showPattern = true,
  patternSrc = patternImage,
}) => {
  const patternRef = useRef(null);

  useEffect(() => {
    if (showPattern && patternRef.current) {
      gsap.to(patternRef.current, {
        opacity: 0.2,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        onStart: () => {
          gsap.set(patternRef.current, { opacity: 0.1 });
        },
      });
    }
  }, [showPattern]);

  return (
    <section
      className={`
        relative flex items-center justify-center w-full z-10
        ${theme.layoutPages.paddingVertical}
        ${theme.layoutPages.paddingHorizontal}
        ${bgColor}
        ${height}
        ${showBottomShadow ? "shadow-custom-bottom" : ""}
      `}
    >
      {/* Optional Pattern Image Overlay */}
      {showPattern && (
        <div
          ref={patternRef}
          aria-hidden
          className="absolute bottom-0 left-0 w-full h-full bg-no-repeat bg-bottom bg-cover pointer-events-none z-0"
          style={{ backgroundImage: `url(${patternSrc})` }}
        />
      )}

      {/* Main Content */}
      <div className="relative flex flex-col-reverse xl:flex-row items-center justify-between w-full gap-8 z-10 text-white">
        {/* Left Side */}
        <div className="flex flex-col items-start justify-center flex-1 gap-4 text-left">
          {logoImage && (
            <img
              src={logoImage}
              alt="Logo"
              className={`w-40 h-16 mb-0 object-contain ${logoIsWhite ? "svg-white" : ""}`}
            />
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
        </div>

        {/* Right Side: Illustration */}
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
