import React from 'react';
import Heading from '../Heading/Heading';
import CustomButton from '../CustomButton/CustomButton';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import { theme } from '../../theme';

const InnovateForm = ({ 
  question, 
  spanQuestion='',
  options,
  selectedOption,
  setSelectedOption,
  handleNext,
  handleBack,
  currentStep,
  totalSteps,
  showNext = false,
  showBack = true,
  opaqueBack = true,
  isMultiSelect = false
}) => {
  const handleOptionSelect = (option) => {
    if (isMultiSelect) {
      const currentSelections = Array.isArray(selectedOption) ? selectedOption : [];
      const newSelections = currentSelections.includes(option)
        ? currentSelections.filter(item => item !== option)
        : [...currentSelections, option];
      setSelectedOption(newSelections);
    } else {
      setSelectedOption(option);
      if (showNext) {
        handleNext();
      }
    }
  };

  const buttonsPerRow = 3;
  const rows = options.reduce((acc, option, index) => {
    const rowIndex = Math.floor(index / buttonsPerRow);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(option);
    return acc;
  }, []);

  const isOptionSelected = (option) => {
    if (isMultiSelect) {
      return Array.isArray(selectedOption) && selectedOption.includes(option);
    }
    return selectedOption === option;
  };

  return (
    <div className={`w-full h-screen ${theme.layoutPages.paddingVertical}  flex flex-col items-start justify-start lg:justify-center  relative`}>
      <div className={`w-full text-left  py-4 lg:mb-10`}>
        <Heading text={question} 
        spanText={spanQuestion}
        // size="text-40px"
        size="text-70px" color="text-black" centered={false} isAnimate={false} />
      </div>

      <div className="w-full flex flex-col py-6 lg:pt-10 space-y-4 lg:space-y-10">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`w-full flex flex-col items-center  lg:flex-row lg:items-stretch space-y-4 lg:space-x-4 lg:space-y-0 ${
              row.length < buttonsPerRow ? 'lg:justify-start lg:gap-x-10' : 'lg:justify-between'
            }`}
          >
            {row.map((option, index) => (
              <CustomButton
                key={index}
                option={option}
                isSelected={isOptionSelected(option)}
                onClick={handleOptionSelect}
                isMultiSelect={isMultiSelect}
                className=""
              />
            ))}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0">
      <NavigationButtons
          handleBack={handleBack}
          handleNext={handleNext}
          showNext={showNext || isMultiSelect}
          showBack={showBack}
          opaqueBack={opaqueBack}
          currentStep={currentStep}
          isLastStep={currentStep === totalSteps}
        />
      </div>
    </div>
  );
};

export default InnovateForm;
