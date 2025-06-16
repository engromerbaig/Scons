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
    opaqueBack = true,
    isSubmitting = false // New prop for submission state
}) => {
    return (
        <div className="w-full px-4 md:px-12 py-6 flex justify-between items-center">
            {/* Back Button */}
            {showBack && (
                <button
                    onClick={handleBack}
                    disabled={isSubmitting} // Disable during submission
                    className={`text-neon text-lg font-medium transition uppercase ${
                        opaqueBack ? 'opacity-50' : 'opacity-100'
                    } ${isSubmitting ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                    Back
                </button>
            )}

            {/* Next/Apply Button */}
            {showNext && (
                <button
                    onClick={handleNext}
                    disabled={disableNext || isSubmitting}
                    className={`text-lg font-medium transition uppercase flex items-center gap-2 ${
                        disableNext || isSubmitting
                            ? 'text-gray-500 cursor-not-allowed'
                            : 'text-neon cursor-pointer'
                    }`}
                >
                    {/* Show spinner during submission */}
                    {isSubmitting && isLastStep && (
                        <svg
                            className="h-4 w-4 "
                                        style={{ animation: 'spin 1s linear infinite' }}

                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    )}
                    
                    {/* Button text with color change during submission */}
                    <span className={isSubmitting && isLastStep ? 'text-neon' : ''}>
                        {isSubmitting && isLastStep 
                            ? 'Applying' 
                            : isLastStep 
                                ? 'APPLY' 
                                : 'Next'
                        }
                    </span>
                </button>
            )}
        </div>
    );
};

export default NavigationButtons;