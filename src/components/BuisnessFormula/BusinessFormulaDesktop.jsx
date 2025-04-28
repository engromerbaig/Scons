import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../Heading/Heading";
import { theme } from "../../theme";
import BodyText from "../BodyText/BodyText";
import businessSteps from "./businessSteps";
import LineIntersection from "./LineIntersection";
import TypedText from "./TypedText";

gsap.registerPlugin(ScrollTrigger);

const BusinessFormulaDesktop = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const previousDirectionRef = useRef(1); // Default direction (down)

  const totalSteps = businessSteps.length;

  // Clean up ScrollTrigger when component unmounts
  useEffect(() => {
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Make sure previous ScrollTrigger is killed before creating a new one
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      
      // Pin the section while scrolling
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        scrub: 0.8, // Increased for even smoother animations
        start: "top top",
        end: `+=${totalSteps * 100}%`, 
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => {
          setIsComplete(false);
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const direction = self.direction;
          previousDirectionRef.current = direction;
          
          // Calculate the step index based on progress
          const calculatedStepIndex = Math.floor(progress * totalSteps);
          const clampedStepIndex = Math.min(Math.max(calculatedStepIndex, 0), totalSteps - 1);
          
          // Update step if changed and not currently animating
          if (clampedStepIndex !== stepIndex && !isAnimating) {
            setIsAnimating(true);
            setStepIndex(clampedStepIndex);
            
            // Allow more time for animations to complete before accepting new transitions
            setTimeout(() => setIsAnimating(false), 800);
          }
          
          // Handle completion states
          if (progress >= 0.98 && !isComplete) {
            // Complete when at the end
            setIsComplete(true);
          } else if (progress <= 0.02 && direction === -1) {
            // This ensures we don't unpin too early when scrolling up
            // Only when we've reached step 0 (and showing step 0)
            if (stepIndex === 0 && !isAnimating) {
              // Delay unpinning slightly to allow animations to complete
              setTimeout(() => {
                setIsComplete(true);
              }, 500);
            }
          } else {
            // Reset completion state when in the middle
            setIsComplete(false);
          }
        },
        onLeaveBack: (self) => {
          // This handles when we scroll above the section
          // Only unpin if we're at step 0
          if (stepIndex === 0) {
            setIsComplete(true);
          }
        }
      });
    }, sectionRef);

    return () => {
      // Properly clean up the context and ScrollTrigger
      ctx.revert();
    };
  }, [totalSteps, stepIndex, isAnimating]); // Include stepIndex to properly handle unpinning

  // Safely access the current step
  const step = businessSteps[stepIndex] || businessSteps[0];

  // Animation variants for smoother transitions
  const imageVariants = {
    leftEnter: {
      opacity: 0,
      y: 40,
    },
    leftVisible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] // cubic-bezier easing function for smooth motion
      }
    },
    leftExit: {
      opacity: 0,
      y: -40,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    rightEnter: {
      opacity: 0,
      y: -40,
    },
    rightVisible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    rightExit: {
      opacity: 0,
      y: 40,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    textEnter: {
      opacity: 0,
    },
    textVisible: {
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    textExit: {
      opacity: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`flex bg-blueLight h-screen flex-col items-center justify-center overflow-hidden ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
      style={{
        position: "relative",
        zIndex: 10,
      }}
    >
      <Heading text="Formula For Business Success" spanText="Business Success" centered={true} />

      <BodyText
        text="Tyfora combines innovation, strategy, and flawless execution to deliver tech solutions that fuel growth and guarantee lasting success for your business."
        centered={true}
      />

      {/* Content container with fixed height to prevent layout shifts */}
      <div className="flex items-center justify-between pt-10 w-full" style={{ minHeight: "400px" }}>
        {/* Number and Heading with typing animation */}
        <div className="flex flex-col gap-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`number-${stepIndex}`}
              variants={imageVariants}
              initial="textEnter"
              animate="textVisible"
              exit="textExit"
              className="text-250px outlined-text-2 font-bold flex justify-center text-center font-poppins text-blue leading-none"
              style={{ display: "flex", alignItems: "center", minHeight: "250px" }}
            >
              <TypedText text={step.number} className="min-h-[250px] flex items-center" isNumber={true} />
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`heading-${stepIndex}`}
              variants={imageVariants}
              initial="textEnter"
              animate="textVisible"
              exit="textExit"
              className="min-h-[120px] flex items-center justify-center"
            >
              <TypedText
                text={step.heading}
                className="text-black text-100px leading-none text-center "
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrow Image Centered */}
        <LineIntersection stepIndex={stepIndex} />

        {/* Two Images Side by Side with fixed container size */}
        <div className="flex gap-0 flex-1 justify-end" style={{ height: "400px" }}>
          <div className="w-full relative flex items-center justify-end" style={{ maxWidth: "300px" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={`lhs-${stepIndex}`}
                src={step.lhsImage}
                alt={step.heading}
                className="object-cover max-h-full max-w-full absolute"
                variants={imageVariants}
                initial="leftEnter"
                animate="leftVisible"
                exit="leftExit"
              />
            </AnimatePresence>
          </div>
          <div className="w-full relative flex items-center justify-start" style={{ maxWidth: "300px" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={`rhs-${stepIndex}`}
                src={step.rhsImage}
                alt={step.heading}
                className="object-cover max-h-full max-w-full absolute"
                variants={imageVariants}
                initial="rightEnter"
                animate="rightVisible"
                exit="rightExit"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessFormulaDesktop;