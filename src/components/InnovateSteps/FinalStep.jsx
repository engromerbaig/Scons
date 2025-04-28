import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormWindow from '../FormWindow/FormWindow';
import CustomButton from '../CustomButton/CustomButton';

const FinalStep = ({ formData, handleBack }) => {
    const navigate = useNavigate();

    const handleStartOver = () => {
        window.location.reload(); // Force a refresh to clear state (optional, based on requirements)
    };

    return (
        <FormWindow
            question="Thank you for your trust. We will get back to you soon!"
            spanQuestion='We will get back to you soon!'
            currentStep={formData.currentStep}
            totalSteps={formData.totalSteps}
            handleBack={handleBack}
            showNext={false}
            showBack={false}

            alignRHS="end"
        >
            {/* RHS */}
            <div className="flex flex-col justify space-y-4 md:space-y-10 px-10">
                {/* Start Over Button */}
                <CustomButton
                    option="Start Over"
                    isSelected={false}
                    onClick={handleStartOver} // Explicit handler for Start Over
                />

                {/* Back to Website Button */}
                <CustomButton
                    option="Back to Website"
                    isSelected={false}
                    link="/" // Use Link for routing
                />
            </div>
        </FormWindow>
    );
};

export default FinalStep;
