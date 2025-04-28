export const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: "easeInOut" }, // Increased duration for smoother transition
};

export const lhsImageAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } }, // Fade in first, then slide in
  exit: { y: -50, transition: { duration: 0.5, ease: "easeIn" } }, // Slide out first
  transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 }, // Increased duration and added a delay
};

export const rhsImageAnimation = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } }, // Fade in first, then slide in
  exit: { y: 50, transition: { duration: 0.5, ease: "easeIn" } }, // Slide out first
  transition: { duration: 0.6, ease: "easeInOut", delay: 0.3 }, // Smoother and slight delay
};
