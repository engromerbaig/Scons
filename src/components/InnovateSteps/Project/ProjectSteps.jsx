import React, { useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const ProjectSteps = ({ formData, setFormData, currentStep, setStep }) => {
    const handleNext = () => {
        // Check if the current step is Step 2 and log the collected data
      
        setStep((prev) => prev + 1);
    };

    const handleBack = () => setStep((prev) => prev - 1);

    // useEffect(() => {
    //     console.log('Updated formData:', formData);
    // }, [formData]);

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
        </>
    );
};

export default ProjectSteps;
