import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const useTypingAnimation = ({ text, isAnimate, speedMultiplier = 0.8 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const characterDelay = 0.06 * speedMultiplier;

  useEffect(() => {
    if (inView && isAnimate) {
      controls.start('visible');
    }
  }, [inView, isAnimate, controls]);

  const characterVariants = {
    hidden: {
      opacity: 0,
    },
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * characterDelay,
        duration: 0.05 * speedMultiplier,
      },
    }),
  };

  return { controls, ref, characterVariants };
};

export default useTypingAnimation;
