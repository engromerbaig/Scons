// AnimationSequence.js
import React, { useState, useEffect } from 'react';

const AnimationSequence = ({ steps, children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Automatically proceed to the next step after a delay if needed
    if (currentStep < steps.length && steps[currentStep].autoProceed) {
      const timeout = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, steps[currentStep].delay || 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, steps]);

  const handleComplete = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Pass `isAnimate` and `onAnimationComplete` to children based on the step
  return React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      isAnimate: currentStep === index,
      onAnimationComplete: handleComplete,
    })
  );
};

export default AnimationSequence;
