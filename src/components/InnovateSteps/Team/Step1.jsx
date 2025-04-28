import React from 'react';
import FormWindow from '../../FormWindow/FormWindow';
import CustomButton from '../../CustomButton/CustomButton';

const Step1 = ({ formData, setFormData, handleNext, handleBack }) => {
    const handleOptionSelect = (option) => {
        setFormData({ ...formData, workforce: option }); // Save workforce in formData
        handleNext(); // Automatically proceed to the next step
    };

    return (
        <FormWindow
            question="Ready to meet your optimum workforce?"
            spanQuestion='optimum workforce'
            bodyQuestion="How many experts do you require?"
            currentStep={2}
            totalSteps={7} // Adjust based on the flow
            handleBack={handleBack}
            alignRHS="end"
            showNext={false}
        >
            <div className="flex flex-col space-y-4 md:space-y-10 px-10">
                {['1-5', '5-15', '15-40', '40+'].map((option, index) => (
                    <CustomButton
                        key={index}
                        option={option}
                        isSelected={formData.workforce === option}
                        onClick={() => handleOptionSelect(option)}
                    />
                ))}
            </div>
        </FormWindow>
    );
};

export default Step1;
