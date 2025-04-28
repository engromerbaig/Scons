import React from 'react';
import ReusableFormStep from '../ReusableFormStep';

const Step3 = ({ formData, setFormData, handleNext, handleBack }) => {
    const briefDataBuilder = (formData, leadId) => ({
        lead_id: leadId,
        budget: formData.budget,
        lead_type: formData.lead_type,
        project_type: formData.project_type,
    });

    return (
        <ReusableFormStep
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
            handleBack={handleBack}
            currentStep={4}
            totalSteps={5}
            question="Let's catch up in detail, coffee's on us!"
            spanQuestion="coffee's on us!"
            briefDataBuilder={briefDataBuilder}
        />
    );
};

export default Step3;
