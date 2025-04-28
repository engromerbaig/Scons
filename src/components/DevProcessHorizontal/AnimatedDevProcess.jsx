import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureBox from "./modules/FeatureBox";
import { featureData } from "./modules/featureData";

gsap.registerPlugin(ScrollTrigger);

const AnimatedDevProcess = ({ onComplete, isPinning }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;

    // Set initial position of cards off-screen to the right and slightly up
    gsap.set(cards, {
      x: "100vw",
      y: "-50vh",
      opacity: 0,
      rotateZ: -5,
    });

    // Create timeline for cards animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "+=300%",
        scrub: 1,
        onStart: () => {
          console.log("Starting 1st card");
        },
        onComplete: () => {
          if (onComplete) {
            onComplete();
            isPinning(false);
          }
        },
      },
    });

    // Add card animations to timeline with cascading effect
    cards.forEach((card, index) => {
      console.log(`Starting card ${index + 1}`);
      
      // Calculate the final position for this card
      const xOffset = index * 4; // Negative value to move left
      const yOffset = index * 20; // Negative value to move up
      
      // Animate each card directly to its final position
      tl.to(
        card,
        {
          x: `${xOffset}%`,
          y: `${yOffset}px`,
          opacity: 1,
          rotateZ: 0,
          duration: 2,
          ease: "power2.out",
        },
        index === 0 ? 0 : "-=0.5" // Slight overlap in animations
      );
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="relative feature-cards h-full flex items-center md:justify-start">
      <div className="relative w-full h-full">
        {featureData.map((data, index) => {
          const borderColor = index % 2 === 0 ? "#14FF8A" : "black";
          return (
            <div
              key={data.number}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute  left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                zIndex: index + 1,
              }}
            >
              <FeatureBox 
                number={data.number} 
                title={data.title} 
                description={data.description} 
                borderColor={borderColor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedDevProcess;