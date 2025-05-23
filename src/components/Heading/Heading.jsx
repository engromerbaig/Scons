import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import useTypingAnimation from '../../utilities/Animations/useTypingAnimation.js';

const Heading = ({
  text = '',
  spanText = '',
  spanColor = 'text-black',
  spanSize = '',
  spanFontWeight = 'font-black',
  color = 'text-black',
  size = 'text-60px',
  centered = true,
  fontFamily = 'font-manrope',
  fontWeight = 'font-black',
  isAnimate = false,
  order = 0,
  speedMultiplier = 0.7,
  onAnimationComplete,
  className = '',
  breakSpan = false,
  inActiveHeading = false,
  showUnderline = false,
}) => {
  const parts = spanText ? text.split(spanText) : [text];
  const { controls, ref, characterVariants } = useTypingAnimation({
    text,
    isAnimate,
    order,
    speedMultiplier,
  });

  // Split text into words while preserving spaces
  const splitIntoWords = (string) => {
    return string.split(/(\s+)/).filter((word) => word.length > 0);
  };

  // Split words into characters for animation
  const splitWordIntoChars = (word) => {
    return word.split('').map((char) => (char === ' ' ? '\u00A0' : char));
  };

  const totalLength = text.length;
  let charCount = 0;

  // Function to apply 20% opacity if inActiveHeading is true
  const getColorWithOpacity = (colorClass) => {
    if (!inActiveHeading) return colorClass;
    const colorName = colorClass.replace('text-', '');
    return `text-${colorName}/20`;
  };

  // Underline class for individual word spans
  const underlineClass = showUnderline
    ? 'relative after:content-[""] after:absolute after:bottom-[-6%] lg:after:bottom-[-10%] after:left-0 after:w-full after:h-[6px] lg:after:h-3 after:bg-neon after:rounded-none'
    : '';

  // Render without animations if isAnimate is false
  if (!isAnimate) {
    return (
      <h1
        className={`${centered ? 'text-center' : ''} ${getColorWithOpacity(color)} ${size} ${fontFamily} ${fontWeight} ${className}`}
        style={{
          wordBreak: 'normal',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {parts[0] && splitIntoWords(parts[0]).map((word, wordIndex) => (
          <span key={`word-1-${wordIndex}`} className={underlineClass} style={{ display: 'inline-block' }}>
            {word}
          </span>
        ))}
        {spanText && (
          <>
            {!breakSpan && parts[0] && !parts[0].endsWith(' ') && ' '}
            <span
              className={`${getColorWithOpacity(spanColor)} ${spanSize} ${spanFontWeight} ${
                breakSpan ? 'block mt-0' : 'inline-block'
              }`}
            >
              {splitIntoWords(spanText).map((word, wordIndex) => (
                <span key={`word-span-${wordIndex}`} className={underlineClass} style={{ display: 'inline-block' }}>
                  {word}
                </span>
              ))}
            </span>
            {!breakSpan && parts[1] && !parts[1].startsWith(' ') && ' '}
          </>
        )}
        {parts[1] && splitIntoWords(parts[1]).map((word, wordIndex) => (
          <span key={`word-2-${wordIndex}`} className={underlineClass} style={{ display: 'inline-block' }}>
            {word}
          </span>
        ))}
      </h1>
    );
  }

  // Render with animations if isAnimate is true
  return (
    <h1
      ref={ref}
      className={`${centered ? 'text-center' : ''} ${getColorWithOpacity(color)} ${size} ${fontFamily} ${fontWeight} ${className}`}
      style={{
        wordBreak: 'normal',
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
      }}
    >
      {splitIntoWords(parts[0]).map((word, wordIndex) => (
        <span key={`word-1-${wordIndex}`} className={underlineClass} style={{ display: 'inline-block' }}>
          {splitWordIntoChars(word).map((char, charIndex) => {
            const currentCharIndex = charCount++;
            return (
              <motion.span
                key={`char-1-${wordIndex}-${charIndex}`}
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
      {spanText && (
        <>
          {!breakSpan && parts[0] && !parts[0].endsWith(' ') && (
            <span style={{ display: 'inline-block' }}>{'\u00A0'}</span>
          )}
          <span
            className={`${getColorWithOpacity(spanColor)} ${spanSize} ${spanFontWeight} ${
              breakSpan ? 'block mt-0' : 'inline-block'
            }`}
          >
            {splitIntoWords(spanText).map((word, wordIndex) => (
              <span key={`word-span-${wordIndex}`} className={underlineClass} style={{ display: 'inline-block' }}>
                {splitWordIntoChars(word).map((char, charIndex) => {
                  const currentCharIndex = charCount++;
                  return (
                    <motion.span
                      key={`char-span-${wordIndex}-${charIndex}`}
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
          </span>
          {!breakSpan && parts[1] && !parts[1].startsWith(' ') && (
            <span style={{ display: 'inline-block' }}>{'\u00A0'}</span>
          )}
        </>
      )}
      {parts[1] && splitIntoWords(parts[1]).map((word, wordIndex) => (
        <span key={`word-2-${wordIndex}`} className={underlineClass} style={{ display: 'inline-block' }}>
          {splitWordIntoChars(word).map((char, charIndex) => {
            const currentCharIndex = charCount++;
            return (
              <motion.span
                key={`char-2-${wordIndex}-${charIndex}`}
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
    </h1>
  );
};

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  spanText: PropTypes.string,
  spanColor: PropTypes.string,
  spanSize: PropTypes.string,
  spanFontWeight: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  centered: PropTypes.bool,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.string,
  isAnimate: PropTypes.bool,
  order: PropTypes.number,
  speedMultiplier: PropTypes.number,
  onAnimationComplete: PropTypes.func,
  className: PropTypes.string,
  breakSpan: PropTypes.bool,
  inActiveHeading: PropTypes.bool,
  showUnderline: PropTypes.bool,
};

Heading.defaultProps = {
  showUnderline: false,
};

export default Heading;