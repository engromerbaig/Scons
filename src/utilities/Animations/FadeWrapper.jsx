import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const fadeVariants = (delay = 0) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,  // Duration for the fade-in effect
      ease: 'easeInOut',
      delay,       // Delay before the animation starts
    },
  },
});

const FadeWrapper = ({
  children,
  order = 0,
  initial = 'hidden',
  animate = 'visible',
  className,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.02,  //changed from 0.2 Trigger animation when 100% of the component is visible
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      variants={fadeVariants(order * 0.3)}  // Adjust the delay based on the order
      className={className}
   
    >
      {children}
    </motion.div>
  );
};

export default FadeWrapper;
