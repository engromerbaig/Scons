import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import BodyText from "../../BodyText/BodyText";
import Heading from "../../Heading/Heading";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const IndustryCard = ({
  industry,
  active,
  onHover,
  onLeave,
  CARD_HEIGHT = 400,
  CARD_WIDTH = 350,
  responsiveSizes = {
    sm: { width: 250, height: 350 }, // <640px
    md: { width: 250, height: 350 }, // 640px to <1024px
  },
}) => {
  const overlayRef = useRef(null);
  const detailsContainerRef = useRef(null);
  const titleBottomRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if mobile view (less than 640px)
  const isMobile = windowWidth < 640;

  // Use active state for desktop, isDetailsVisible for mobile
  const isActive = isMobile ? isDetailsVisible : active;

  useEffect(() => {
    // Animate overlay
    gsap.to(overlayRef.current, {
      background: isActive ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.65)",
      duration: 0.3,
      ease: "power3.out",
    });

    // Animate bottom title out
    gsap.to(titleBottomRef.current, {
      y: isActive ? 40 : 0,
      opacity: isActive ? 0 : 1,
      duration: 0.3,
      ease: "power3.out",
    });

    // Animate details container (title and description together)
    gsap.to(detailsContainerRef.current, {
      y: isActive ? 0 : -100,
      opacity: isActive ? 1 : 0,
      duration: 0.4,
      ease: "power3.out",
      pointerEvents: isActive ? "auto" : "none",
    });
  }, [isActive]);

  // Toggle details visibility for mobile
  const toggleDetails = () => {
    setIsDetailsVisible((prev) => !prev);
  };

  // Determine responsive width and height based on window width
  let width = CARD_WIDTH;
  let height = CARD_HEIGHT;

  if (windowWidth < 640 && responsiveSizes.sm) {
    width = responsiveSizes.sm.width;
    height = responsiveSizes.sm.height;
  } else if (windowWidth >= 640 && windowWidth < 1024 && responsiveSizes.md) {
    width = responsiveSizes.md.width;
    height = responsiveSizes.md.height;
  }

  return (
    <div
      className="relative rounded-3xl overflow-hidden flex-shrink-0 mx-2 cursor-pointer group transition-all duration-300 hover:border-2 hover:border-neon"
      style={{
        width,
        height,
        backgroundImage: `url(${industry.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={isMobile ? null : onHover}
      onMouseLeave={isMobile ? null : onLeave}
      onClick={isMobile ? toggleDetails : null}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 transition-all duration-200"
        style={{
          background: "rgba(0,0,0,0.65)",
          zIndex: 1,
        }}
      />

      {/* Eye Icon for Mobile */}
      {isMobile && (
        <div
          className="absolute top-4 right-4 z-30 text-white text-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering when clicking the eye icon
            toggleDetails();
          }}
        >
          {isDetailsVisible ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}

      {/* Bottom Title */}
      <div
        ref={titleBottomRef}
        className="absolute bottom-0 left-0 w-full z-10 p-4 flex flex-row items-start justify-start xl:gap-4"
        style={{ minHeight: 100 }}
      >
        {industry.number && (
          <Heading
            text={industry.number}
            size="text-100px xl:text-70px"
            color="text-neon"
            fontWeight="font-black"
            className="text-left vertical-text"
            centered={false}
          />
        )}
        {industry.name && (
          <BodyText
            text={industry.name}
            size="text-50px xl:text-35px"
            color="text-white"
            fontWeight="font-bold"
            className="drop-shadow-lg text-left max-w-[calc(100%-100px)]"
            centered={false}
          />
        )}
      </div>

      {/* Details Container (Top Title + Description) */}
      <div
        ref={detailsContainerRef}
        className="absolute top-6 left-0 w-full h-auto z-20"
        style={{
          opacity: 0,
          transform: "translateY(-100px)",
        }}
      >
        {/* Top Title */}
        <div className="flex items-start px-6">
          <BodyText
            text={industry.name}
            size="text-35px"
            color="text-white"
            fontWeight="font-bold"
            className="drop-shadow-lg pr-6 text-left"
            centered={false}
          />
        </div>

        {/* Description */}
        <div className="mt-4 px-6 text-white text-left">
          <BodyText
            text={industry.details}
            size="text-sm"
            color="text-white"
            className="text-left leading-normal xl:leading-loose"
            centered={false}
          />
        </div>
      </div>
    </div>
  );
};

export default IndustryCard;