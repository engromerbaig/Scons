import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { theme } from '../../theme';

const FAQBox = ({ question, answer, isActive, isHovered, onClick }) => {
  const boxRef = useRef(null);
  const answerRef = useRef(null);
  const questionRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const answer = answerRef.current;
    const question = questionRef.current;

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf([box, answer, question]);

    // Common properties for hovered and active states
    const expandedProps = {
      width: 300,
      backgroundColor: '#00c5ff',
      opacity: 1,
    };

    if (isActive || isHovered) {
      const tl = gsap.timeline();

      // Expand box with neon outline for active state
      tl.to(box, {
        ...expandedProps,
        ...(isActive ? { boxShadow: '0 0 0 2px #00c5ff' } : {}), // Neon outline for active state
        duration: 0.5,
        ease: 'power3.out',
      })
      // Move question to top
      .to(
        question,
        {
          y: 20,
          color: '#ffffff',
          duration: 0.5,
          ease: 'power3.out',
        },
        0
      )
      // Show answer
      .to(
        answer,
        {
          height: 'auto',
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
        0.2
      );
    } else {
      const tl = gsap.timeline();

      // Hide answer
      tl.to(answer, {
        height: 0,
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.inOut',
      })
      // Move question down
      .to(
        question,
        {
          y: 'calc(100% - 4rem)',
          color: '#000000',
          duration: 0.4,
          ease: 'power3.out',
        },
        0.1
      )
      // Shrink box and remove outline
      .to(
        box,
        {
          width: 250,
          backgroundColor: '#E5E7EB',
          opacity: 0.7,
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power3.out',
        },
        0.1
      );
    }

    // Cleanup on unmount
    return () => {
      gsap.killTweensOf([box, answer, question]);
    };
  }, [isActive, isHovered]);

  return (
    <div
      ref={boxRef}
      className={`faq-box rounded-3xl shadow-md overflow-hidden cursor-pointer flex flex-col transition-all ${isActive ? 'ring-2 ring-neon' : ''}`}
      style={{
        minWidth: 250, // Changed from width to minWidth for smoother transitions
        height: 350,
        backgroundColor: '#E5E7EB',
        opacity: 0.6,
        padding: '1.5rem',
        transformOrigin: 'left', // Anchor expansion to the left side
      }}
      onClick={onClick}
      onMouseEnter={() => !isActive && onClick('hover')}
      onMouseLeave={() => !isActive && onClick('leave')}
    >
      <div className="flex-1" />
      <div
        ref={questionRef}
        style={{
          transform: 'translateY(calc(100% - 4rem))',
          width: '200px',
          flexShrink: 0,
        }}
      >
        <Heading
          text={question}
          size="text-2xl"
          centered={false}
          showUnderline={false}
          className={`mb-4 transition-colors duration-300 ${isActive || isHovered ? 'text-white' : 'text-black'}`}
          style={{
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            lineHeight: '1.2',
          }}
        />
      </div>
      <div
        ref={answerRef}
        style={{
          height: 0,
          opacity: 0,
          overflow: 'hidden',
          transform: 'translateY(20px)',
        }}
      >
        <BodyText
          text={answer}
          centered={false}
          color="text-white"
          size="text-base"
          fontWeight="font-medium"
          className="mt-2 max-w-[200px] leading-loose" // Increased max-width to accommodate wider card
        />
      </div>
    </div>
  );
};

export default FAQBox;