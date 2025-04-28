import React, { useState } from 'react';
import InnovateForm from '../../InnovateForm/InnovateForm';

const Step2 = ({ formData, setFormData, handleNext, handleBack }) => {
    const [selectedOptions, setSelectedOptions] = useState(formData.team_required || []);

    const handleOptionsSelect = (options) => {
        setSelectedOptions(options);
        setFormData({ ...formData, team_required: options }); // Save selected team roles in formData
    };

    return (
        <InnovateForm
            question="Which team players are you looking for? The best ones are onboard with us!"
            spanQuestion='The best ones are onboard with us!'
            options={[
                'Full-stack developers',
                'Mobile app developers',
                'UI/UX Design',
                'Frontend design',
                'Data Scientists',
                "I'm not sure",
            ]}
            selectedOption={selectedOptions}
            setSelectedOption={handleOptionsSelect}
            handleBack={handleBack}
            handleNext={handleNext}
            showNext={true}
            currentStep={3}
            totalSteps={7} // Adjust based on the flow
            isMultiSelect={true}
        />
    );
};

export default Step2;
