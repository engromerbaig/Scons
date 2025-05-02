import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const INITIAL_WIDTH = "85%";  // Less dramatic width change
const FINAL_WIDTH = "100%";
const INITIAL_SCALE = 0.95;   // Less dramatic scale change
const FINAL_SCALE = 1;

const TestimonialBox = ({
  quote,
  name,
  position,
  company,
  rating,
  clientImg,
  quoteImg,
}) => {
  const ref = useRef(null);

  // More gradual threshold for smoother transitions
  const inView = useInView(ref, { 
    margin: "-10% 0px -40% 0px", 
    once: false,
    amount: 0.3  // Triggers earlier for smoother transition
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        scale: INITIAL_SCALE,
        width: INITIAL_WIDTH,
        opacity: 0.8,  // Higher starting opacity
      }}
      animate={{
        scale: inView ? FINAL_SCALE : INITIAL_SCALE,
        width: inView ? FINAL_WIDTH : INITIAL_WIDTH,
        opacity: inView ? 1 : 0.8,
        // Smoother transition with lower stiffness and higher damping
        transition: { 
          type: "spring", 
          stiffness: 70,  // Lower stiffness for smoother motion
          damping: 25,    // Higher damping to reduce oscillation
          mass: 1.2,      // Slightly higher mass for more inertia
          duration: 0.8   // Ensure minimum duration
        }
      }}
      className="border-[#181818] border-2 rounded-xl shadow-lg p-8 flex flex-col gap-4 w-full max-w-3xl mx-auto bg-[#181818]"
      style={{ willChange: "transform, width, opacity" }}
    >
      {/* Quote Icon */}
      <div className="flex items-center">
        <img src={quoteImg} alt="Quote" className="w-8 h-8 mr-2" />
        <span className="text-white text-lg italic">{quote}</span>
      </div>
      {/* Client Info */}
      <div className="flex items-center mt-4">
        <img
          src={clientImg}
          alt={name}
          className="w-12 h-12 rounded-full border-2 border-neon mr-4"
        />
        <div>
          <div className="font-semibold text-white">{name}</div>
          <div className="text-gray-400 text-sm">{position}, {company}</div>
          {/* Star Rating */}
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? "text-neon" : "text-gray-600"}>★</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialBox;
