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
  size = 'text-70px',
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

  // Split text into words while preserving trailing spaces WITH the word
  const splitIntoWordsWithSpaces = (string) => {
    // Split by spaces but keep the space with the preceding word
    const words = [];
    const parts = string.split(' ');
    
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) { // Skip empty parts
        // Add space to word if it's not the last word
        words.push(i === parts.length - 1 ? parts[i] : parts[i] + ' ');
      }
    }
    
    return words;
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

  // Function to reconstruct text with proper spacing
  const reconstructTextWithSpacing = () => {
    let result = parts[0] || '';
    if (spanText) {
      // Add space before span if needed
      if (!breakSpan && result && !result.endsWith(' ') && !spanText.startsWith(' ')) {
        result += ' ';
      }
      result += spanText;
      // Add space after span if needed
      if (!breakSpan && parts[1] && !spanText.endsWith(' ') && !parts[1].startsWith(' ')) {
        result += ' ';
      }
      result += parts[1] || '';
    }
    return result;
  };

  // Function to get word styling based on position
  const getWordStyling = (wordText, wordStartIndex, fullText) => {
    if (!spanText) {
      return {
        color: getColorWithOpacity(color),
        size: '',
        weight: '',
        isSpan: false
      };
    }

    const spanStart = fullText.indexOf(spanText);
    const spanEnd = spanStart + spanText.length;
    
    const isSpanWord = wordStartIndex >= spanStart && wordStartIndex < spanEnd;
    
    return {
      color: isSpanWord ? getColorWithOpacity(spanColor) : getColorWithOpacity(color),
      size: isSpanWord ? spanSize : '',
      weight: isSpanWord ? spanFontWeight : '',
      isSpan: isSpanWord
    };
  };

  // Render without animations if isAnimate is false
  if (!isAnimate) {
    const fullText = reconstructTextWithSpacing();
    const allWords = splitIntoWordsWithSpaces(fullText);
    let currentIndex = 0;
    
    return (
      <h1
        ref={headingRef}
        className={`${centered ? 'text-center' : ''} ${getColorWithOpacity(color)} ${size} ${fontFamily} ${fontWeight} ${className}`}
        style={{
          wordBreak: 'normal',
          overflowWrap: 'break-word',
          whiteSpace: 'normal', // Changed from pre-wrap to normal
        }}
      >
        {allWords.map((word, wordIndex) => {
          const styling = getWordStyling(word, currentIndex, fullText);
          const wordToRender = word.replace(/\s+$/, ''); // Remove trailing space for display
          const hasTrailingSpace = word !== wordToRender;
          
          const element = (
            <span 
              key={`word-${wordIndex}`} 
              className={`${underlineClass} ${styling.color} ${styling.size} ${styling.weight} ${styling.isSpan && breakSpan ? 'block mt-0' : ''}`} 
              style={{ display: 'inline-block' }}
            >
              {wordToRender}
              {hasTrailingSpace && '\u00A0'}
              {showUnderline && (
                <span
                  className="underline absolute bottom-[-6%] lg:bottom-[-10%] left-0 w-full h-[6px] lg:h-3 bg-neon rounded-none"
                  style={{ transformOrigin: 'left', scaleX: 0 }}
                />
              )}
            </span>
          );
          
          currentIndex += word.length;
          return element;
        })}
      </h1>
    );
  }

  // Render with animations if isAnimate is true
  const fullText = reconstructTextWithSpacing();
  const allWords = splitIntoWordsWithSpaces(fullText);
  charCount = 0; // Reset for animated version
  let currentIndex = 0;
  
  return (
    <h1
      ref={headingRef}
      className={`${centered ? 'text-center' : ''} ${getColorWithOpacity(color)} ${size} ${fontFamily} ${fontWeight} ${className}`}
      style={{
        wordBreak: 'normal',
        overflowWrap: 'break-word',
        whiteSpace: 'normal', // Changed from pre-wrap to normal
      }}
    >
      {allWords.map((word, wordIndex) => {
        const styling = getWordStyling(word, currentIndex, fullText);
        const wordToRender = word.replace(/\s+$/, ''); // Remove trailing space for display
        const hasTrailingSpace = word !== wordToRender;
        
        const element = (
          <span 
            key={`word-${wordIndex}`} 
            className={`${underlineClass} ${styling.color} ${styling.size} ${styling.weight} ${styling.isSpan && breakSpan ? 'block mt-0' : ''}`} 
            style={{ display: 'inline-block' }}
          >
            {splitWordIntoChars(wordToRender).map((char, charIndex) => {
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
            {hasTrailingSpace && (
              <motion.span
                key={`space-${wordIndex}`}
                custom={charCount++}
                initial="hidden"
                animate={controls}
                variants={characterVariants}
                style={{ display: 'inline-block' }}
              >
                {'\u00A0'}
              </motion.span>
            )}
            {showUnderline && (
              <span
                className="underline absolute bottom-[-6%] lg:bottom-[-10%] left-0 w-full h-[6px] lg:h-3 bg-neon rounded-none"
                style={{ transformOrigin: 'left', scaleX: 0 }}
              />
            )}
          </span>
        );
        
        currentIndex += word.length;
        return element;
      })}
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