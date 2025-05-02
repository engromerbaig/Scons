import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const INITIAL_WIDTH = "80%";
const FINAL_WIDTH = "100%";
const INITIAL_SCALE = 0.92;
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

  // Only trigger when the top of the box enters/leaves the viewport
  const inView = useInView(ref, { margin: "-20% 0px -60% 0px", once: false });

  return (
    <motion.div
      ref={ref}
      initial={{
        scale: INITIAL_SCALE,
        width: INITIAL_WIDTH,
        opacity: 0.7,
      }}
      animate={{
        scale: inView ? FINAL_SCALE : INITIAL_SCALE,
        width: inView ? FINAL_WIDTH : INITIAL_WIDTH,
        opacity: inView ? 1 : 0.7,
        transition: { type: "spring", stiffness: 120, damping: 20 }
      }}
      className="border-[#181818] border-2 rounded-xl shadow-lg p-8 flex flex-col gap-4 w-full max-w-xl mx-auto bg-[#181818]"
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
          className="w-12 h-12 rounded-full border-2 border-green-400 mr-4"
        />
        <div>
          <div className="font-semibold text-white">{name}</div>
          <div className="text-gray-400 text-sm">{position}, {company}</div>
          {/* Star Rating */}
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? "text-green-400" : "text-gray-600"}>★</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialBox;
