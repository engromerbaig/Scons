import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BusinessSuccess from "../BusinessSuccess/BusinessSuccess";
import ContainerComponent from "../ChildCards/modules/ContainerComponent";
import containersData from "../ChildCards/containersData";

gsap.registerPlugin(ScrollTrigger);

const DesktopScroller = () => {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Calculate the total width based on screen size
      const totalWidth = window.innerWidth > 1025
        ? 100 + containersData.length * 33.33 // For lg and above, cards are 33.33vw
        : 100 + containersData.length * 50;   // For md, cards are 50vw

      // Set the width of the scrollable area
      slider.current.style.width = `${totalWidth}vw`;

      // Set the ScrollTrigger to animate the horizontal scrolling
      gsap.to(slider.current, {
        x: () => -(slider.current.offsetWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          start: "top top",  // Pin when top of slider reaches top of the viewport
          end: () => `+=${slider.current.scrollWidth - window.innerWidth}`, // Ends after the whole content is scrolled
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
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
            className="card-container w-screen h-screen flex-shrink-0 md:w-[50vw] lg:w-[33.33vw]"
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

export default DesktopScroller;