import React from 'react';
import ReusableFormStep from '../ReusableFormStep';

const Step5 = ({ formData, setFormData, handleNext, handleBack }) => {
    const briefDataBuilder = (formData, leadId) => ({
        lead_id: leadId,
        lead_type: formData.lead_type,
        workforce: formData.workforce,
        team_required: formData.team_required,
        investment_duration: formData.investment_duration,
        source: formData.source,
    });

    return (
        <ReusableFormStep
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
            handleBack={handleBack}
            currentStep={6}
            totalSteps={7}
            question="Let's catch up in detail, coffee's on us!"
            spanQuestion="coffee's on us!"
            briefDataBuilder={briefDataBuilder}
        />
    );
};

export default Step5;
