import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormWindow from '../FormWindow/FormWindow';
import CustomButton from '../CustomButton/CustomButton';

const StepOne = ({ formData, setFormData, handleNext, currentStep, totalSteps }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1); // Go to the last visited page
        } else {
            navigate('/careers'); // Navigate to /careers if no previous page exists
        }
    };

    const handleOptionSelect = (option) => {
        setFormData({ ...formData, source: option });
        handleNext(); // Automatically proceed to the next step
    };

    return (
        <FormWindow
            question="Did the news circulate…who let you know we're the top choice?"
            spanQuestion="who let you know we're the top choice?"
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            isLastStep={false}
            handleBack={handleBack}
            alignRHS = "end" 
            alignRHSBelowMd = 'center' // Dynamic alignment
            showNext={false}
            opaqueBack={false}
        >
            {/* RHS Content */}
            <div className={`  space-y-4 md:space-y-10 `}>
                {['Social Media', 'A Project We Did', 'A Friend', 'Word on Street'].map((option, index) => (
                    <CustomButton
                        key={index}
                        option={option}
                        isSelected={formData.source === option}
                        onClick={handleOptionSelect}
                    />
                ))}
            </div>
        </FormWindow>
    );
};

export default StepOne;
