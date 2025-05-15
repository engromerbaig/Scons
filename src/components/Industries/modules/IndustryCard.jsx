import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import BodyText from "../../BodyText/BodyText";
import Heading from "../../Heading/Heading";

const IndustryCard = ({ industry, active, onHover, onLeave, CARD_HEIGHT = 340, CARD_WIDTH = 300 }) => {
  const overlayRef = useRef(null);
  const detailsRef = useRef(null);
  const titleBottomRef = useRef(null);
  const titleTopRef = useRef(null);

  // Mobile always shows details
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    // Animate overlay
    gsap.to(overlayRef.current, {
      background: active ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.65)",
      duration: 0.3, // Increased duration for smoother transition
      ease: "power3.out" // Smoother easing
    });
    // Animate details
    gsap.to(detailsRef.current, {
      y: active ? 0 : -30,
      opacity: active ? 1 : 0,
      duration: 0.3, // Increased duration
      ease: "power3.out", // Smoother easing
      pointerEvents: active ? "auto" : "none"
    });
    // Animate bottom title out
    gsap.to(titleBottomRef.current, {
      y: active ? 40 : 0,
      opacity: active ? 0 : 1,
      duration: 0.3, // Increased duration
      ease: "power3.out" // Smoother easing
    });
    // Animate top title in
    gsap.to(titleTopRef.current, {
      y: active ? 0 : -30,
      opacity: active ? 1 : 0,
      duration: 0.3, // Increased duration
      ease: "power3.out" // Smoother easing
    });
  }, [active, isMobile]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex-shrink-0 mx-2 cursor-pointer group"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundImage: `url(${industry.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      onMouseEnter={() => !isMobile && onHover()}
      onMouseLeave={() => !isMobile && onLeave()}
      onTouchStart={() => isMobile && onHover()}
      onTouchEnd={() => isMobile && onLeave()}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 transition-all duration-200"
        style={{
          background: isMobile ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.4)",
          zIndex: 1
        }}
      />

      {/* Bottom Title */}
      <div
        ref={titleBottomRef}
        className="absolute bottom-0 left-0 w-full z-10 p-4 flex flex-row items-start gap-4"
        style={{ minHeight: 100 }} // Increased minHeight to accommodate multi-line text
      >
        {industry.number && (
          <Heading
            text={industry.number}
            size="text-70px"
            color="text-neon"
            fontWeight="font-black"
            className="text-left vertical-text"
            centered={false}
          />
        )}
        {industry.name && (
          <BodyText
            text={industry.name}
            size="text-2xl"
            color="text-white"
            fontWeight="font-bold"
            className="drop-shadow-lg text-left max-w-[calc(100%-100px)]" // Adjust width to prevent overlap
            centered={false}
          />
        )}
      </div>

      {/* Top Title (slides in above description) */}
      <div
        ref={titleTopRef}
        className="absolute top-6 left-0 w-full z-20 flex items-start px-6"
        style={{
          opacity: 0,
          y: -50
        }}
      >
        <BodyText
          text={industry.name}
          size="text-2xl"
          color="text-white"
          fontWeight="font-bold"
          className="drop-shadow-lg text-left"
          centered={false}
        />
      </div>

      {/* Details slide from top */}
      <div
        ref={detailsRef}
        className="absolute top-24 left-0 w-full h-auto flex items-start justify-start px-6 text-white text-left z-20 pointer-events-none"
        style={{
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : -30,
          transition: "all 0.3s cubic-bezier(.4,0,.2,1)" // Match GSAP duration
        }}
      >
        <BodyText
          text={industry.details}
          size="text-base"
          color="text-white"
          className="text-left"
          centered={false}
        />
      </div>
    </div>
  );
};

export default IndustryCard;