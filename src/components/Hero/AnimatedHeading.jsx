import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedHeading = ({
  prefixText = "",
  animatedWords = [],
  suffixText = "",
  color = "text-black",
  fontWeight = "font-black",
  size = "text-70px",
  className = "",
  centered = false,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (animatedWords.length === 0) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [animatedWords]);

  const wordVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${
        centered ? "justify-center" : "justify-start"
      } ${className}`}
    >
      {prefixText && (
        <span className={`${color} ${fontWeight} ${size}`}>{prefixText}</span>
      )}

      {animatedWords.length > 0 && (
        <div className="relative ml-2 xl:w-60 xl:h-14 2xl:h-16  w-40 h-10 px-4 py-2 bg-neon rounded-full overflow-hidden text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={animatedWords[currentWordIndex]}
              variants={wordVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center text-black font-black text-50px"
            >
              {animatedWords[currentWordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {suffixText && (
        <span className={`${color} ${fontWeight} ${size}`}>{suffixText}</span>
      )}
    </div>
  );
};

export default AnimatedHeading;
