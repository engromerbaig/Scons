import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import useTypingAnimation from '../../utilities/Animations/useTypingAnimation';

const BodyText = ({
  text ='',
  color = 'text-grayText',
  size = 'text-35px',
  lineHeight = 'leading-normal',
  fontFamily = 'font-clash',
  fontWeight = 'font-normal',
  centered = true,
  isAnimate = false,
  delay = 0,
  onAnimationComplete = null,
  className = '',
}) => {
  // Initialize typing animation hook
  const { controls, ref, characterVariants } = useTypingAnimation({
    text,
    isAnimate,
    order: delay, // Use delay as the order for staggered animation
    speedMultiplier: 0.2, // Adjust speed as needed
  });

  // Split text into words while preserving spaces
  const splitIntoWords = (string) => {
    return string.split(/(\s+)/).filter(word => word.length > 0);
  };

  // Split words into characters for animation
  const splitWordIntoChars = (word) => {
    return word.split('').map((char) => (char === ' ' ? '\u00A0' : char));
  };

  const totalLength = text.length;
  let charCount = 0;

  // Render without animation if `isAnimate` is false
  if (!isAnimate) {
    return (
      <p
        className={`${centered ? 'text-center' : ''} ${color} ${size} ${lineHeight} ${fontFamily} ${fontWeight} ${className}`}
      >
        {text}
      </p>
    );
  }

  // Render with typing animation
  return (
    <p
      ref={ref}
      className={`${centered ? 'text-center' : ''} break-words ${color} ${size} ${lineHeight} ${fontFamily} ${fontWeight} ${className}`}
    >
      {splitIntoWords(text).map((word, wordIndex) => (
        <span
          key={`word-${wordIndex}`}
          style={{ display: 'inline-block' }}
        >
          {splitWordIntoChars(word).map((char, charIndex) => {
            const currentCharIndex = charCount++;
            return (
              <motion.span
                key={`char-${wordIndex}-${charIndex}`}
                custom={currentCharIndex}
                initial="hidden"
                animate={controls}
                variants={characterVariants}
                style={{ display: 'inline-block' }}
                onAnimationComplete={
                  currentCharIndex === totalLength - 1 && onAnimationComplete
                    ? onAnimationComplete
                    : undefined
                }
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </p>
  );
};

BodyText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  lineHeight: PropTypes.string,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.string,
  centered: PropTypes.bool,
  isAnimate: PropTypes.bool,
  delay: PropTypes.number,
  onAnimationComplete: PropTypes.func,
  className: PropTypes.string,
};

export default BodyText;