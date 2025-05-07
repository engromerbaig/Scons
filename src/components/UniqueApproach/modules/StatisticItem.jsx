import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BodyText from '../../BodyText/BodyText';
import Heading from '../../Heading/Heading';

const StatisticItem = ({ title, icon, value }) => {
  // Check if value is specifically "1k+" for special handling
  const isOneKPlus = value === '1k+';
  const numericValue = isOneKPlus ? 999 : parseInt(value, 10); // Set to 999 if "1k+", otherwise parse as a number
  const hasPlusSign = value.endsWith('+'); // Check if there's a "+" sign

  const [displayValue, setDisplayValue] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2; // Duration in seconds
      const start = 0;
      const end = numericValue;
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        const current = Math.min(start + (end - start) * progress, end);

        setDisplayValue(Math.floor(current));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (isOneKPlus) {
          // Display "1k+" specifically after reaching 999
          setDisplayValue('1k+');
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, numericValue, isOneKPlus]);

  return (
    <div ref={ref} className="flex flex-col  items-start justify-center space-y-0">


      <motion.p
        className="text-90px font-manrope font-semibold   "
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
        {!isOneKPlus && hasPlusSign && displayValue === numericValue && '+'}
      </motion.p>
    
      <BodyText
        text={title}
        size="text-30px"
        className="text-start" // Center-align the text
        color='text-black'
        fontWeight='font-medium'
      />
    </div>
  );
};

export default StatisticItem;