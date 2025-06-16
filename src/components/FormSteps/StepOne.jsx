import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormWindow from '../FormWindow/FormWindow';
import CustomButton from '../CustomButton/CustomButton';

const StepOne = ({ formData, setFormData, handleNext, currentStep, totalSteps }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // local state to trigger next

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/careers');
    }
  };

  const handleOptionSelect = (option) => {
    setFormData(prev => ({ ...prev, source: option }));
    setSelected(option); // triggers useEffect
  };

  // This will run AFTER formData.source is updated
  useEffect(() => {
    if (selected !== null && formData.source === selected) {
      handleNext(); // go to next step
    }
  }, [formData.source, selected, handleNext]);

  return (
    <FormWindow
      question="Word got around! But who told you we're the number one pick?"
      spanQuestion="But who told you we're the number one pick?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      handleNext={handleNext}
      isLastStep={false}
      handleBack={handleBack}
      alignRHS="end"
      alignRHSBelowMd="center"
      showNext={false}
      opaqueBack={false}
    >
      <div className="space-y-4 md:space-y-10">
        {['Social Media', 'A Project We Did', 'Our Website', 'Referral'].map((option, index) => (
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
