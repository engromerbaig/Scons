import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BusinessSuccess from "../BusinessSuccess/BusinessSuccess";
import ContainerComponent from "../ChildCards/modules/ContainerComponent";
import containersData from "../ChildCards/containersData";

gsap.registerPlugin(ScrollTrigger);

const MobileScroller = () => {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const totalWidth = 100 + containersData.length * 100; // Business section (100vw) + cards (33.33vw each)
      slider.current.style.width = `${totalWidth}vw`;

      // Set the scrollTrigger
      gsap.to(slider.current, {
        x: () => -(slider.current.offsetWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          start: "top top",  // Pin when top of slider reaches top of the viewport
          end: () => `+=${slider.current.scrollWidth - window.innerWidth}`, // Ends after the whole content is scrolled
          invalidateOnRefresh: true,
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={component}>
      <div ref={slider} className="flex h-screen">
        {/* Business Section */}
        <div className="flex-shrink-0 w-screen">
          <BusinessSuccess />
        </div>

        {/* Cards Section */}
        {containersData.map((containerData, index) => (
          <div
            key={index}
            className="card-container md:w-[33.33vw] w-screen h-screen flex-shrink-0"
          >
            <ContainerComponent
              logo={containerData.logo}
              heading={containerData.heading}
              number={containerData.number}
              text={containerData.text}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileScroller;
