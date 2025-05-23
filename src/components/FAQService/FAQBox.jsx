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
      gsap.to(box, {
        width: 330,
        backgroundColor: '#00c5ff', // Neon color
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(question, {
        y: 0,
        color: '#ffffff',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(answer, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(box, {
        width: 250,
        backgroundColor: '#E5E7EB', // gray-200
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(question, {
        y: 'calc(100% - 2rem)',
        color: '#000000',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isActive]);

  return (
    <div
      ref={boxRef}
      className="faq-box rounded-3xl shadow-md overflow-hidden cursor-pointer flex flex-col transition-all duration-300"
      style={{
        width: 250,
        height: 350,
        backgroundColor: '#9CA3AF', // gray-400
        opacity: 0.6,
        padding: '1.5rem',
      }}
      onClick={onClick}
      onMouseEnter={() => !isActive && onClick()}
      onMouseLeave={() => isActive && onClick()}
    >
      <div className="flex-1" />
      <div ref={questionRef} style={{ transform: 'translateY(calc(100% - 2rem))' }}>
        <Heading
          text={question}
          size="text-2xl"
          centered={false}
          showUnderline={false}
          className={`mb-4 max-w-[250px] transition-colors duration-300 ${isActive ? 'text-white' : 'text-black'}`}
        />
      </div>
      <div
        ref={answerRef}
        style={{ height: 0, opacity: 0, overflow: 'hidden' }}
      >
        <BodyText
          text={answer}
          centered={false}
          color="text-white"
          size="text-base"
          className="mt-2 max-w-[300px]"
        />
      </div>
    </div>
  );
};

export default FAQBox;
