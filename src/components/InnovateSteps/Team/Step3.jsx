import React from 'react';
import FormWindow from '../../FormWindow/FormWindow';
import CustomButton from '../../CustomButton/CustomButton';

const Step3 = ({ formData, setFormData, handleNext, handleBack }) => {
    const handleOptionSelect = (option) => {
        setFormData({ ...formData, investment_duration: option }); // Save Investment Duration in formData
        handleNext(); // Automatically proceed to the next step
    };

    return (
        <FormWindow
            question="Every penny you spend is a safe investment. Don’t hesitate, more is better than less!"
            spanQuestion='Don’t hesitate, more is better than less!'
            breakSpan={true}
            currentStep={4}
            totalSteps={7} // Adjust based on the flow
            handleBack={handleBack}
            alignRHS="end"
            showNext={false}
        >
            <div className="flex flex-col space-y-4 md:space-y-10 px-10">
                {['Short term', 'Long term', "I'm Not Sure"].map((option, index) => (
                    <CustomButton
                        key={index}
                        option={option}
                        isSelected={formData.investment_duration === option}
                        onClick={() => handleOptionSelect(option)}
                    />
                ))}
            </div>
        </FormWindow>
    );
};

export default Step3;
