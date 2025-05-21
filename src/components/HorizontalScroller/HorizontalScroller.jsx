import React, { useLayoutEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "tailwindcss/tailwind.css";
import BusinessSuccess from "../BusinessSuccess/BusinessSuccess";
import ContainerComponent from "../ChildCards/modules/ContainerComponent";
import containersData from "../ChildCards/containersData";
gsap.registerPlugin(ScrollTrigger);
import { theme } from "../../theme";

const glowColors = [
  "glow-teal",
  "glow-magenta",
  "glow-lime",
  "glow-violet",
  "glow-orange",
  "glow-cyan"
];
// Custom hook for GSAP horizontal scroll animation
const useHorizontalScroll = (sliderRef, cardCount, isDesktop) => {
  useLayoutEffect(() => {
    if (!isDesktop) return; // Skip for mobile

    let ctx = gsap.context(() => {
      // Get the gap size in pixels to account for spacing
      const gapSize = 0; // 10 in tailwind translates to approximately 40px
      const windowWidth = window.innerWidth;
      const cardWidth = windowWidth > 1025 ? windowWidth * 0.33 : windowWidth * 0.5; // actual pixel width
      
      // Calculate total width including gaps
      const businessSectionWidth = windowWidth;
      const cardsWidth = cardCount * cardWidth;
      const gapsWidth = gapSize * (cardCount + 1); // +1 for gap between business section and first card
      
      const totalWidth = businessSectionWidth + cardsWidth + gapsWidth;
      
      // Set the slider width
      sliderRef.current.style.width = `${totalWidth}px`;

      // Create scroll animation
      gsap.to(sliderRef.current, {
        x: () => -(totalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sliderRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth - windowWidth}`,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
          // Add this to debug if needed
          // markers: true,
        },
      });
    }, sliderRef);

    return () => ctx.revert();
  }, [isDesktop, cardCount, sliderRef]);
};

const HorizontalScroller = ({ heading, spanHeading, bodyText }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const sliderRef = useRef();
  const componentRef = useRef();

  // Apply horizontal scroll only for desktop
  useHorizontalScroll(sliderRef, containersData.length, isDesktop);

  return (
    <div ref={componentRef} className="overflow-hidden">
      {isDesktop ? (
        // Desktop: Pinned horizontal scroll
        <div ref={sliderRef} className="flex h-screen items-center bg-black gap-0">
          <div className="flex-shrink-0 w-screen">
            <BusinessSuccess heading={heading} spanHeading={spanHeading} bodyText={bodyText} />
          </div>
          {containersData.map((data, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[33vw] h-[60vh] flex items-center justify-center"
            >
              <ContainerComponent
                logo={data.logo}
                heading={data.heading}
                number={data.number}
                text={data.text}
                        glowColor={glowColors[index % glowColors.length]} // Cycle through colors

              />
            </div>
          ))}
        </div>
      ) : (
        // Mobile: Vertical stack, no pinning, normal card height
        <div className={`flex flex-col bg-black ${theme.layoutPages.paddingVertical}`}>
          <BusinessSuccess heading={heading} spanHeading={spanHeading} bodyText={bodyText} />
          <div className="flex flex-col space-y-4 px-6 pb-4">
            {containersData.map((data, index) => (
              <div key={index} className="w-full">
                <ContainerComponent
                  logo={data.logo}
                  heading={data.heading}
                  number={data.number}
                  text={data.text}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HorizontalScroller;