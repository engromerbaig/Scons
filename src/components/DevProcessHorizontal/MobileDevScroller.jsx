import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureBox from "./modules/FeatureBox";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { featureData } from "./modules/featureData";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";

gsap.registerPlugin(ScrollTrigger);

const MobileDevScroller = () => {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const totalWidth = 100 + featureData.length * 100; // Pinned section (100vw) + cards (100vw each)
      slider.current.style.width = `${totalWidth}vw`;

      // Horizontal scrolling for cards
      gsap.to(slider.current, {
        x: () => -(slider.current.offsetWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          start: "top top", // Pin when the top of the slider reaches the top of the viewport
          end: () => `+=${slider.current.scrollWidth - window.innerWidth}`, // Ends after the whole content is scrolled
          invalidateOnRefresh: true,
          onEnter: () => {
            // Set z-index high when pinned
            component.current.style.zIndex = 10;
          },
          onLeave: () => {
            // Reset z-index when unpinned
            component.current.style.zIndex = 1;
          },
        },
      });
    }, component);

    return () => ctx.revert();
  }, [featureData]);

  return (
    <AnimatedBackground bgSizeMob="cover" ref={component} className="relative">
      <div ref={slider} className="flex h-screen">
        {/* Pinned Section */}
        <div className="flex-shrink-0 w-screen text-white flex flex-col justify-center items-start p-10">
          <Heading
            text="Crafted for Your Ambition"
            spanText="Ambition"
            size="text-70px"
            centered={false}
          />
          <BodyText
            text="At Tyfora, we understand your industry, challenges, and aspirations. Our solutions are tailored to fuel growth and deliver excellence, designed specifically for businesses like yours."
            centered={false}
            lineHeight="leading-loose"
          />
        </div>

        {/* Cards Section */}
        {featureData.map((data, index) => {
          const borderColor = index % 2 === 0 ? "#14FF8A" : "black"; // Alternate border color
          return (
            <div key={index} className="w-screen h-screen flex-shrink-0">
              <FeatureBox
                number={data.number}
                title={data.title}
                description={data.description}
                borderColor={borderColor} // Pass borderColor prop
              />
            </div>
          );
        })}
      </div>
    </AnimatedBackground>
  );
};

export default MobileDevScroller;