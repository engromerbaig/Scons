// NavigationButtons.jsx
import React from 'react';
import { theme } from '../../theme';

const NavigationButtons = ({ 
    handleBack, 
    handleNext, 
    showNext = true, 
    showBack = true, 
    isLastStep = false, 
    disableNext = false, 
    opaqueBack = true
}) => {
    return (
        <div className="w-full px-4 md:px-12 py-6 flex justify-between items-center">
            {/* Back Button */}
            {showBack && (
                <button
                    onClick={handleBack}
                    className={`text-blue text-lg font-medium transition uppercase  ${
                        opaqueBack ? 'opacity-50' : 'opacity-100'
                    }`}
                >
                    Back
                </button>
            )}

            {/* Next Button */}
            {showNext && (
                <button
                    onClick={handleNext}
                    disabled={disableNext}
                    className={`text-lg font-medium transition uppercase ${
                        disableNext 
                            ? 'text-gray-500 cursor-not-allowed'
                            : 'text-blue cursor-pointer'
                    }`}
                >
                    {isLastStep ? 'APPLY' : 'Next'}
                </button>
            )}
        </div>
    );
};

export default NavigationButtons;