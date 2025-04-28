import React from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';


const TeamSteps = ({ formData, setFormData, currentStep, setStep }) => {
    const handleNext = () => setStep((prev) => prev + 1);

    // Prevents going back to RootOption (step 1)
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
            {currentStep === 3 && (
                <Step2
                    formData={formData}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}

            {currentStep === 4 && (
                <Step3
                    formData={formData}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}

{currentStep === 5 && (
                <Step4
                    formData={formData}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}


{currentStep === 6 && (
                <Step5
                    formData={formData}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}
        </>
    );
};

export default TeamSteps;
