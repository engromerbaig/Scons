import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { theme } from '../../theme';

const FAQBox = ({ question, answer, isActive, onClick }) => {
  const boxRef = useRef(null);
  const answerRef = useRef(null);
  const questionRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const answer = answerRef.current;
    const question = questionRef.current;

    if (isActive) {
      // Create a timeline for smooth sequencing
      const tl = gsap.timeline();
      
      // First: Expand the box and change background color
      tl.to(box, {
        width: 330,
        backgroundColor: '#00c5ff',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      // Simultaneously: Move question up and change color
      .to(question, {
        y: 0,
        color: '#ffffff',
        duration: 0.4,
        ease: 'power2.out',
      }, 0) // Start at the same time as box animation
      // Then: Animate answer sliding up from bottom (after box expansion)
      .to(answer, {
        height: 'auto',
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.3); // Start after box expansion completes
      
    } else {
      // Reverse animation timeline
      const tl = gsap.timeline();
      
      // First: Hide answer
      tl.to(answer, {
        height: 0,
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
      // Then: Move question down and change color
      .to(question, {
        y: 'calc(100% - 2rem)',
        color: '#000000',
        duration: 0.4,
        ease: 'power2.out',
      }, 0.1)
      // Finally: Shrink box and change background
      .to(box, {
        width: 250,
        backgroundColor: '#E5E7EB',
        opacity: 0.6,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.1);
    }
  }, [isActive]);

  return (
    <div
      ref={boxRef}
      className="faq-box rounded-3xl shadow-md overflow-hidden cursor-pointer flex flex-col transition-all duration-300"
      style={{
        width: 250,
        height: 350,
        backgroundColor: '#9CA3AF',
        opacity: 0.6,
        padding: '1.5rem',
      }}
      onClick={onClick}
      onMouseEnter={() => !isActive && onClick()}
      onMouseLeave={() => isActive && onClick()}
    >
      <div className="flex-1" />
      
      {/* Question container with fixed width to maintain wrap */}
      <div 
        ref={questionRef} 
        style={{ 
          transform: 'translateY(calc(100% - 2rem))',
          width: '200px', // Fixed width to maintain text wrap
          flexShrink: 0,
        }}
      >
        <Heading
          text={question}
          size="text-2xl"
          centered={false}
          showUnderline={false}
          className={`mb-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-black'}`}
          style={{ 
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            lineHeight: '1.2',
          }}
        />
      </div>
      
      {/* Answer container */}
      <div
        ref={answerRef}
        style={{ 
          height: 0, 
          opacity: 0, 
          overflow: 'hidden',
          transform: 'translateY(20px)', // Start slightly below
        }}
      >
        <BodyText
          text={answer}
          centered={false}
          color="text-white"
          size="text-base"
          className="mt-2"
          style={{
            width: '150px', // Fixed width to prevent rewrapping
            lineHeight: '1.4',
          }}
        />
      </div>
    </div>
  );
};

export default FAQBox;