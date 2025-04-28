import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormWindow from '../FormWindow/FormWindow';
import CustomButton from '../CustomButton/CustomButton';

const RootOption = ({ formData, setFormData, handleFlowSelection, currentStep }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); // Navigate to /careers if no previous page exists
    };

    const handleOptionSelect = (option) => {
        // Update formData with lead_type
        setFormData({ 
            ...formData, 
            lead_type: option, // Save the selected option as lead_type
        });

        handleFlowSelection(option); // Trigger flow selection logic
    };

    return (
        <FormWindow
            question="How big can you dream? Let’s get started!"
            spanQuestion='Let’s get started!'
            currentStep={currentStep}
            totalSteps={1} // Adjust as needed for dynamic flow
            handleBack={handleBack}
            alignRHS="end"
            showNext={false}
            opaqueBack={false}
        >
            {/* rhs */}
            <div className="flex flex-col space-y-4 md:space-y-10 px-10">
                {['Start a project', 'Build a Smart Team', 'Drop a quick word', 'Book a Discovery Call'].map((option, index) => (
                    <CustomButton
                        key={index}
                        option={option}
                        isSelected={formData.lead_type === option} // Compare with Lead_Type
                        onClick={() => handleOptionSelect(option)} // Pass the option to handler
                    />
                ))}
            </div>
        </FormWindow>
    );
};

export default RootOption;
