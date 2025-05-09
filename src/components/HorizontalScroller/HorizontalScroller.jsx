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

// Custom hook for GSAP horizontal scroll animation
const useHorizontalScroll = (sliderRef, cardCount, isDesktop) => {
  useLayoutEffect(() => {
    if (!isDesktop) return; // Skip for mobile

    let ctx = gsap.context(() => {
      const cardWidth = window.innerWidth > 1025 ? 33.33 : 50; // vw per card
      const totalWidth = 100 + cardCount * cardWidth; // Business section + cards

      sliderRef.current.style.width = `${totalWidth}vw`;

      gsap.to(sliderRef.current, {
        x: () => -(sliderRef.current.offsetWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sliderRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${sliderRef.current.scrollWidth - window.innerWidth}`,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    }, sliderRef);

    return () => ctx.revert();
  }, [isDesktop, cardCount, sliderRef]);
};

const HorizontalScroller = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const sliderRef = useRef();
  const componentRef = useRef();

  // Apply horizontal scroll only for desktop
  useHorizontalScroll(sliderRef, containersData.length, isDesktop);

  return (
    <div ref={componentRef} className="overflow-hidden">
      {isDesktop ? (
        // Desktop: Pinned horizontal scroll
        <div ref={sliderRef} className="flex h-screen">
          <div className="flex-shrink-0 w-screen">
            <BusinessSuccess />
          </div>
          {containersData.map((data, index) => (
            <div
              key={index}
              className={`card-container h-screen flex-shrink-0 ${
                window.innerWidth > 1025 ? "lg:w-[33.33vw]" : "md:w-[50vw]"
              }`}
            >
              <ContainerComponent
                logo={data.logo}
                heading={data.heading}
                number={data.number}
                text={data.text}
              />
            </div>
          ))}
        </div>
      ) : (
        // Mobile: Vertical stack, no pinning, normal card height
        <div className={`flex flex-col bg-black ${theme.layoutPages.paddingVertical}`}>
          <BusinessSuccess />
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