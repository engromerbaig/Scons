import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FadeInSection = ({ children, disabled = false }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    if (!disabled && inView) {
      controls.start("visible");
    }
  }, [controls, inView, disabled]);

  const variants = {
    hidden: { opacity: 0, y: 20 }, // smoother entry
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" // more natural easing
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={disabled ? false : "hidden"}
      animate={disabled ? false : controls}
      variants={disabled ? {} : variants}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
