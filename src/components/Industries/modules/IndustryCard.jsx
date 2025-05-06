import React, { useRef } from "react";
import gsap from "gsap";
import BodyText from "../../BodyText/BodyText";

const CARD_HEIGHT = 320;
const CARD_WIDTH = 260;

const IndustryCard = ({ industry }) => {
  const overlayRef = useRef(null);
  const detailsRef = useRef(null);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      gsap.to(overlayRef.current, { background: "rgba(0,0,0,0.85)", duration: 0.3 });
      gsap.to(detailsRef.current, { y: 0, opacity: 1, duration: 0.4 });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      gsap.to(overlayRef.current, { background: "rgba(0,0,0,0.4)", duration: 0.3 });
      gsap.to(detailsRef.current, { y: "-100%", opacity: 0, duration: 0.3 });
    }
  };

  // On mobile, overlay is always dark and details always visible
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="relative rounded-2xl shadow-lg overflow-hidden flex-shrink-0 mx-2 cursor-pointer group"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundImage: `url(${industry.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: isMobile ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.4)",
          zIndex: 1
        }}
      />

      {/* Title at bottom */}
      <div className="absolute bottom-0 left-0 w-full z-10 p-4 flex items-end" style={{minHeight: 80}}>
        <BodyText
          text={industry.name}
          size="text-2xl"
          color="text-white"
          fontWeight="font-bold"
          className="drop-shadow-lg"
        />
      </div>

      {/* Details slide from top */}
      <div
        ref={detailsRef}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-6 text-white text-center z-20 pointer-events-none"
        style={{
          background: "transparent",
          transform: isMobile ? "translateY(0%)" : "translateY(-100%)",
          opacity: isMobile ? 1 : 0,
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)"
        }}
      >
        <BodyText
          text={industry.details}
          size="text-base"
          color="text-white"
        />
      </div>
    </div>
  );
};

export default IndustryCard;
