import React, { useState } from 'react';
import InnovateForm from '../../InnovateForm/InnovateForm';

const Step1 = ({ formData, setFormData, handleNext, handleBack }) => {
    const [selectedOption, setSelectedOption] = useState(formData.project_type || ''); // Use project_type for tracking

    const handleOptionSelect = (option) => {
        setSelectedOption(option); // Update the selected option
        setFormData({ ...formData, project_type: option }); // Save the project_type in formData
        handleNext(); // Automatically proceed to the next step
    };

    return (
        <InnovateForm
            question="We create projects that have it all: beauty and brains. Discover what’s possible."
            spanQuestion='beauty and brains. Discover what’s possible.'
            
            options={[
                'Product Discovery',
                'Branding',
                'UI/UX Design',
                'Web Development',
                'Mobile App Development',
                'Growth Marketing',
            ]}
            selectedOption={selectedOption}
            setSelectedOption={handleOptionSelect}
            handleBack={handleBack} // Allow going back to the previous step
            showNext={false} // No explicit "Next" button, since selecting an option moves forward
            currentStep={2}
            totalSteps={5} // Adjust based on the total steps of the flow
        />
    );
};

export default Step1;
