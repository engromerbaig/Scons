import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import BodyText from '../../BodyText/BodyText';
import Heading from '../../Heading/Heading';
import FadeWrapper from '../../../utilities/Animations/FadeWrapper';

const FAQItem = ({ question, answer, isActive, onClick }) => {
    return (
        <div className="faq-item">
            <div className=" py-4 md:py-6 border-b border-black">
                <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
                    {/* Question */}
                    <Heading
                        text={question}
                        size='text-35px'
                        fontWeight='font-bold'
                        centered={false}
                        isAnimate={false}
                    />
                    {/* Toggle Icon */}
                    <span 
                        className={`transition-transform duration-300 ease-in-out ${isActive ? 'rotate-0' : 'rotate-0'}`}
                    >
                        {isActive ? (
                            <FiMinus className="w-6 h-6 text-neon" />
                        ) : (
                            <FiPlus className="w-6 h-6 text-neon" />
                        )}
                    </span>
                </div>

                {/* Answer */}
                {isActive && (
                    <FadeWrapper
                        key={question}
                        className="pt-4"
                    >
                        <BodyText
                            text={answer}
                            centered={false}
                            isAnimate={false}
                        />
                    </FadeWrapper>
                )}
            </div>
        </div>
    );
};

export default FAQItem;