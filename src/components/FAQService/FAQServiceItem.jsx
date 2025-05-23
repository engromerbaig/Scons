import React from 'react';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQServiceItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div className="faq-item">
      <div className="flex justify-between items-start cursor-pointer" onClick={onClick}>
        {/* Question */}
        <div className="flex items-start gap-4">
          <Heading
            text={question}
            size="text-40px xl:text-30px"
            fontWeight="font-bold"
            centered={false}
            isAnimate={false}
          />
        </div>

        {/* Toggle icon with rotation animation */}
        <span
          className={`text-3xl text-neon mt-1 transition-transform duration-300 ${
            isActive ? 'rotate-180' : 'rotate-0'
          }`}
        >
          {isActive ? <FiMinus /> : <FiPlus />}
        </span>
      </div>

      {/* Answer content */}
      {isActive && (
        <div className="pt-2">
          <BodyText
            text={answer}
            lineHeight="leading-loose"
            centered={false}
            isAnimate={false}
          />
        </div>
      )}
    </div>
  );
};

export default FAQServiceItem;
