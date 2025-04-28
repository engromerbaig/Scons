import React from 'react';
import Step1 from './Step1';

const QuickWordSteps = ({ formData, setFormData, currentStep, setStep }) => {
    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    return (
        <>
            {currentStep === 2 && (
                <Step1
                    formData={formData}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}
           
        </>
    );
};

export default QuickWordSteps;
