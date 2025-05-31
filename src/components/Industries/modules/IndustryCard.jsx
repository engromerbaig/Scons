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
  bgColor = '',
  hoverBgColor = '',
  showOverlay = true,
  showBorder = true,
  titleColor = 'text-white',
  topTitleColor = 'text-white',
  answerFontSize ='text-sm',
  answerLineHeight = 'leading-normal',
  CARD_HEIGHT = 400,
  CARD_WIDTH = 350,
  responsiveSizes = {
    sm: { width: 250, height: 350 },
    md: { width: 250, height: 350 },
    xl: { width: 300, height: 400 },
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

  const isMobile = windowWidth < 640;
  const isActive = isMobile ? isDetailsVisible : active;

  useEffect(() => {
    if (showOverlay && overlayRef.current) {
      gsap.to(overlayRef.current, {
        background: isActive
          ? "rgba(0,0,0,0.85)"
          : "rgba(0,0,0,0.65)",
        duration: 0.3,
        ease: "power3.out",
      });
    }

    gsap.to(titleBottomRef.current, {
      y: isActive ? 40 : 0,
      opacity: isActive ? 0 : 1,
      duration: 0.3,
      ease: "power3.out",
    });

    gsap.to(detailsContainerRef.current, {
      y: isActive ? 0 : -100,
      opacity: isActive ? 1 : 0,
      duration: 0.4,
      ease: "power3.out",
      pointerEvents: isActive ? "auto" : "none",
    });
  }, [isActive, showOverlay]);

  const toggleDetails = () => {
    setIsDetailsVisible((prev) => !prev);
  };

  let width = CARD_WIDTH;
  let height = CARD_HEIGHT;

  if (windowWidth < 640 && responsiveSizes.sm) {
    width = responsiveSizes.sm.width;
    height = responsiveSizes.sm.height;
  } else if (windowWidth >= 640 && windowWidth < 1024 && responsiveSizes.md) {
    width = responsiveSizes.md.width;
    height = responsiveSizes.md.height;
  } else if (windowWidth >= 1280 && windowWidth < 1536 && responsiveSizes.xl) {
    width = responsiveSizes.xl.width;
    height = responsiveSizes.xl.height;
  }

  return (
    <div
      className={`relative rounded-3xl overflow-hidden flex-shrink-0 mx-2 cursor-pointer group transition-all duration-300
        ${showBorder ? "hover:border-2 hover:border-neon" : ""} ${bgColor}`}
      style={{
        width,
        height,
        backgroundImage: `url(${industry.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
backgroundColor:
  isActive && hoverBgColor?.startsWith("#")
    ? hoverBgColor
    : !isActive && bgColor?.startsWith("#")
    ? bgColor
    : undefined,        transition: "background-color 0.4s ease",
      }}
      onMouseEnter={isMobile ? null : onHover}
      onMouseLeave={isMobile ? null : onLeave}
      onClick={isMobile ? toggleDetails : null}
    >
      {/* Overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: "rgba(0,0,0,0.65)",
            zIndex: 1,
          }}
        />
      )}

      {/* Eye Icon for Mobile */}
      {isMobile && (
        <div
          className="absolute top-4 right-4 z-30 text-white text-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
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
            color={titleColor}
            fontWeight="font-bold"
            className="drop-shadow-lg text-left transition-colors duration-300"
            style={{
              maxWidth: `calc(${width}px - 100px - 2rem)`,
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
            centered={false}
          />
        )}
      </div>

      {/* Details Container */}
      <div
        ref={detailsContainerRef}
        className="absolute top-6 left-0 w-full h-auto z-20"
        style={{
          opacity: 0,
          transform: "translateY(-100px)",
        }}
      >
        <div className="flex items-start px-6">
          <BodyText
            text={industry.name}
            size="text-35px"
            color={topTitleColor}
            fontWeight="font-bold"
            className="drop-shadow-lg pr-6 text-left transition-colors duration-300"
            style={{
              maxWidth: `calc(${width}px - 2rem)`,
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
            centered={false}
          />
        </div>

        <div className="mt-4 px-6 text-left">
          <BodyText
            text={industry.details}
            size={answerFontSize}
            color="text-white"
            className={`text-left ${answerLineHeight} xl:leading-loose`}
            style={{
              maxWidth: `calc(${width}px - 2rem)`,
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
            centered={false}
          />
        </div>
      </div>
    </div>
  );
};

export default IndustryCard;
