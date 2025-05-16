import React from 'react';
import Heading from '../Heading/Heading';
import ProgressBar from './modules/ProgressBar';
import BodyText from '../BodyText/BodyText';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import { theme } from '../../theme';

const FormWindow = ({ 
    children, 
    question, 
    bodyQuestion = '', 
    spanQuestion = '', 
    currentStep, 
    totalSteps, 
    handleNext, 
    isLastStep, 
    handleBack, 
    alignRHS = 'end', 
    alignRHSBelowMd = 'center', 
    disableNext, 
    breakSpan=true,
    showNext = true, 
    spanColor="text-black",
    showProgressBar = false, 
    opaqueBack = true, 
    showBack = true 
}) => {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    // Helper function to determine alignment classes
    const getAlignmentClasses = () => {
        let alignmentClass = '';
        if (alignRHSBelowMd === 'end') alignmentClass += 'justify-end';
        else if (alignRHSBelowMd === 'start') alignmentClass += 'justify-start';
        else alignmentClass += 'justify-center';

        if (alignRHS === 'end') alignmentClass += ' md:justify-end';
        else if (alignRHS === 'start') alignmentClass += ' md:justify-start';
        else alignmentClass += ' md:justify-center';

        return alignmentClass;
    };

    return (
        <div className={`flex ${theme.layoutPages.paddingVertical} gap-1 md:gap-3 lg:gap-4 py-20 flex-col md:flex-row w-full h-screen relative`}>
            {/* Left Section (LHS) */}
            <div className="w-full md:w-2/5 lg:w-1/2 h-auto md:h-full flex flex-col justify-center items-start   md:py-0">
                <div className={`flex  flex-col items-start gap-y-2 `}>
                    <Heading 
                        text={question} 
                        spanText={spanQuestion} 
                        spanColor={spanColor}
                        breakSpan={breakSpan} 
                        // size="text-40px" 
                        size="text-60px" 
                        lineHeight="leading-none"

                        centered={false} 
                        isAnimate={false} 
                    />
                    <BodyText 
                        text={bodyQuestion} 
                        size="text-28px" 
                        centered={false} 
                        isAnimate={false} 
                        lineHeight="leading-loose" 
                    />
                </div>
            </div>

            {/* Right Section (RHS) */}
            <div className="w-full md:w-3/5 lg:w-1/2  h-auto md:h-full flex flex-col py-6 md:py-0 relative">
                {/* Progress Bar */}
                {showProgressBar && (
                    <div className="hidden md:flex w-full justify-center mb-4 md:mb-6">      
                        <ProgressBar progressPercentage={progressPercentage} />
                    </div>
                )}

                {/* RHS Content */}
                <div className={`w-full flex-grow flex items-center ${getAlignmentClasses()}`}>
                    {children}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-4 left-0 right-0">
                <NavigationButtons
                    handleBack={handleBack}
                    handleNext={handleNext}
                    showNext={showNext}
                    showBack={showBack}
                    opaqueBack={opaqueBack}
                    isLastStep={isLastStep}
                    disableNext={disableNext}
                    currentStep={currentStep}
                    buttonClass="w-full" // Ensures buttons occupy full width below md
                />
            </div>
        </div>
    );
};

export default FormWindow;
