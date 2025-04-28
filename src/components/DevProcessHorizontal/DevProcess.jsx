import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import AnimatedDevProcess from "./AnimatedDevProcess";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import { theme } from "../../theme";
import MobileDevScroller from "./MobileDevScroller";

gsap.registerPlugin(ScrollTrigger);

const DevProcess = ({featureData, faqSpanText, processText}) => {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  if (isMobile) {
    return <MobileDevScroller featureData={featureData} processText={processText} />;
  }


  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isPinning, setIsPinning] = useState(false);
  const scrollTriggerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the section while scrolling
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=350%", // Increased scroll length to accommodate all animations
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => {
          console.log("Pinned the screen");
          setIsPinning(true);
        },
        onLeaveBack: () => {
          console.log("Scrolled back up");
        },
        onUpdate: (self) => {
          // Only allow unpinning if all card animations are complete
          if (isComplete && self.progress >= 0.95) {
            console.log("Unpinning the screen - all animations complete");
            setIsPinning(false);
            ScrollTrigger.refresh();
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isComplete]);

  const handleCardAnimationComplete = () => {
    console.log("All cards animation complete - setting isComplete");
    setIsComplete(true);
  };

  return (
    <AnimatedBackground 
      showBlob={false}
      ref={sectionRef} 
      className={`relative h-screen grid grid-cols-12 items-center ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
    >
      {/* updated */}
      <div className="col-span-5 flex flex-col items-start space-y-0"> {/* LHS takes 5 columns */}
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
      <div className="col-span-7 relative"> {/* RHS takes 7 columns */}
        <AnimatedDevProcess 
          onComplete={handleCardAnimationComplete} 
          isPinning={isPinning}
          featureData={featureData}
        />
      </div>
    </AnimatedBackground>
  );
};

export default DevProcess;