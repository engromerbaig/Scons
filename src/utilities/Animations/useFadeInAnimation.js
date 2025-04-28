import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const useFadeInAnimation = ({ isAnimate = true, delay = 0.3, duration = 1, threshold = 0.5 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Only animate once when in view
    threshold, // Controls when the animation is triggered (default 50% visibility)
  });

  useEffect(() => {
    if (inView && isAnimate) {
      controls.start('visible');
    }
  }, [inView, isAnimate, controls]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay, duration,       ease: 'easeInOut',
      },
    },
  };

  return { controls, ref, fadeInVariants };
};

export default useFadeInAnimation;
