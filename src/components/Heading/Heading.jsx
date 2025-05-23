import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
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
  const headingRef = useRef(null);

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

  // Setup Intersection Observer for underline animation
  useEffect(() => {
    if (!showUnderline) return;

    const elements = headingRef.current.querySelectorAll('.underline-span');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const underline = entry.target.querySelector('.underline');
            gsap.fromTo(
              underline,
              { scaleX: 0, transformOrigin: 'left' },
              {
                scaleX: 1,
                duration: 0.8,
                ease: 'power2.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [showUnderline]);

  // Underline class for individual word spans
  const underlineClass = showUnderline
    ? 'underline-span relative'
    : '';

  // Render without animations if isAnimate is false
  if (!isAnimate) {
    return (
      <h1
        ref={headingRef}
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
            {showUnderline && (
              <span
                className="underline absolute bottom-[-6%] lg:bottom-[-10%] left-0 w-full h-[6px] lg:h-3 bg-neon rounded-none"
                style={{ transformOrigin: 'left', scaleX: 0 }}
              />
            )}
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
                  {showUnderline && (
                    <span
                      className="underline absolute bottom-[-6%] lg:bottom-[-10%] left-0 w-full h-[6px] lg:h-3 bg-neon rounded-none"
                      style={{ transformOrigin: 'left', scaleX: 0 }}
                    />
                  )}
                </span>
              ))}
            </span>
            {!breakSpan && parts[1] && !parts[1].startsWith(' ') && ' '}
          </>
        )}
        {parts[1] && splitIntoWords(parts[1]).map((word, wordIndex) => (
          <span key={`word-2-${wordIndex}`} className={underlineClass} style={{ display: 'inline-block' }}>
            {word}
            {showUnderline && (
              <span
                className="underline absolute bottom-[-6%] lg:bottom-[-10%] left-0 w-full h-[6px] lg:h-3 bg-neon rounded-none"
                style={{ transformOrigin: 'left', scaleX: 0 }}
              />
            )}
          </span>
        ))}
      </h1>
    );
  }

  // Render with animations if isAnimate is true
  return (
    <h1
      ref={headingRef}
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
          {showUnderline && (
            <span
              className="underline absolute bottom-[-6%] lg:bottom-[-10%] left-0 w-full h-[6px] lg:h-3 bg-neon rounded-none"
              style={{ transformOrigin: 'left', scaleX: 0 }}
            />
          )}
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
                {showUnderline && (
                  <span
                    className="underline absolute bottom-[-6%] lg:bottom-[-10%] left-0 w-full h-[6px] lg:h-3 bg-neon rounded-none"
                    style={{ transformOrigin: 'left', scaleX: 0 }}
                  />
                )}
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
          {showUnderline && (
            <span
              className="underline absolute bottom-[-6%] lg:bottom-[-10%] left-0 w-full h-[6px] lg:h-3 bg-neon rounded-none"
              style={{ transformOrigin: 'left', scaleX: 0 }}
            />
          )}
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