import React from 'react';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { theme } from '../../theme';
import caretDown from '../../assets/icons/caretdown.svg';


const FAQServiceItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div className={`faq-item border px-4 md:px-10 py-6 rounded-2xl border-black`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
        {/* Question */}
        <div className="flex items-center gap-4">
          <Heading
          text={question}
          size='text-40px'
          fontWeight='font-medium'
          centered={false}
          isAnimate={false}
          />
        </div>

        {/* Toggle icon */}
          <span 
                          className={`transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}
                      >
                          <img src={caretDown} alt="Caret Icon" className="w-12 aspect-square svg-blue" />
                      </span>
      </div>

      {/* Answer content */}
      {isActive && (
        <div className="pt-4">
          <BodyText
          text={answer}
          size='text-30px'
          lineHeight='leading-loose'
          centered={false}
          isAnimate={false}

          />
        </div>
      )}
    </div>
  );
};

export default FAQServiceItem;
