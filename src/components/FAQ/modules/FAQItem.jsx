import React from 'react';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import BodyText from '../../BodyText/BodyText';
import Heading from '../../Heading/Heading';
import FadeWrapper from '../../../utilities/Animations/FadeWrapper';

const FAQItem = ({ question, answer, isActive, onClick }) => {
    return (
        <div className="faq-item">
            <div className="py-4 md:py-6 border-b border-black">
                <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
                    {/* Question */}
                    <Heading
                        text={question}
                        size='text-35px'
                        fontWeight='font-bold'
                        centered={false}
                        isAnimate={false}
                        className='pr-6 xl:pr-14'
                    />
                    {/* Toggle Icon */}
                    <span 
                        className={`transition-transform duration-500 ease-in-out ${isActive ? 'rotate-180' : 'rotate-0'}`}
                    >
                        {isActive ? (
                            <FaMinusCircle className="w-6 h-6 text-neon" />
                        ) : (
                            <FaPlusCircle className="w-6 h-6 text-neon" />
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
                            className='pr-6 xl:pr-14'
                        />
                    </FadeWrapper>
                )}
            </div>
        </div>
    );
};

export default FAQItem;