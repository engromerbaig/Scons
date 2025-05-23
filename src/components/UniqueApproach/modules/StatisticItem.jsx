import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom'; // import Link from react-router-dom
import BodyText from '../../BodyText/BodyText';
import Heading from '../../Heading/Heading';

const StatisticItem = ({ title, icon, value, link = '/' }) => {
  const isOneKPlus = value === '1k+';
  const numericValue = isOneKPlus ? 999 : parseInt(value, 10);
  const hasPlusSign = value.endsWith('+');

  const [displayValue, setDisplayValue] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2;
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
          setDisplayValue('1k+');
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, numericValue, isOneKPlus]);

  return (
    <Link
      to={link}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-start justify-center space-y-0 cursor-pointer"
    >
      <motion.p
        className={`text-90px font-manrope font-semibold transition-colors duration-300 ${
          hovered ? 'text-neon' : 'text-black'
        }`}
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
        className={`text-start transition-all duration-300 ${hovered ? 'underline' : ''}`}
        color="text-black"
        fontWeight="font-medium"
      />
    </Link>
  );
};

export default StatisticItem;
