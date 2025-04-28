import React from 'react';
import FormWindow from '../../FormWindow/FormWindow';
import CustomButton from '../../CustomButton/CustomButton';

const Step4 = ({ formData, setFormData, handleNext, handleBack }) => {
    const handleOptionSelect = (option) => {
        setFormData({ ...formData, source: option }); // Save source in formData
        handleNext(); // Automatically proceed to the next step
    };

    return (
        <FormWindow
            question="Who sent you to scout around for the best?"
            spanQuestion='around for the best?'
            breakSpan={true}
            currentStep={5}
            totalSteps={7} // Adjust based on the flow
            handleBack={handleBack}
            alignRHS="end"
            showNext={false}
        >
            <div className="flex flex-col space-y-4 md:space-y-10 px-10">
                {['Social Media', 'A Project We Did', 'A Friend', 'Word on Street'].map((option, index) => (
                    <CustomButton
                        key={index}
                        option={option}
                        isSelected={formData.source === option}
                        onClick={() => handleOptionSelect(option)}
                    />
                ))}
            </div>
        </FormWindow>
    );
};

export default Step4;
