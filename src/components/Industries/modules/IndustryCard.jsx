import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import BodyText from "../../BodyText/BodyText";
import Heading from "../../Heading/Heading";

const IndustryCard = ({ industry, active, onHover, onLeave, CARD_HEIGHT = 340, CARD_WIDTH = 300 }) => {
  const overlayRef = useRef(null);
  const detailsRef = useRef(null);
  const titleBottomRef = useRef(null);
  const titleTopRef = useRef(null);

  useEffect(() => {
    // Animate overlay
    gsap.to(overlayRef.current, {
      background: active ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.65)",
      duration: 0.3,
      ease: "power3.out"
    });
    // Animate details
    gsap.to(detailsRef.current, {
      y: active ? 0 : -30,
      opacity: active ? 1 : 0,
      duration: 0.3,
      ease: "power3.out",
      pointerEvents: active ? "auto" : "none"
    });
    // Animate bottom title out
    gsap.to(titleBottomRef.current, {
      y: active ? 40 : 0,
      opacity: active ? 0 : 1,
      duration: 0.3,
      ease: "power3.out"
    });
    // Animate top title in
    gsap.to(titleTopRef.current, {
      y: active ? 0 : -30,
      opacity: active ? 1 : 0,
      duration: 0.3,
      ease: "power3.out"
    });
  }, [active]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex-shrink-0 mx-2 cursor-pointer group transition-all duration-300 hover:border-2 hover:border-neon"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundImage: `url(${industry.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={onHover}
      onTouchEnd={onLeave}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 transition-all duration-200"
        style={{
          background: "rgba(0,0,0,0.65)",
          zIndex: 1
        }}
      />

      {/* Bottom Title */}
      <div
        ref={titleBottomRef}
        className="absolute bottom-0 left-0 w-full z-10 p-4 flex flex-row items-start gap-4"
        style={{ minHeight: 100 }}
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
            className="drop-shadow-lg text-left max-w-[calc(100%-100px)]"
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
          opacity: 0,
          y: -30,
          transition: "all 0.3s cubic-bezier(.4,0,.2,1)"
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