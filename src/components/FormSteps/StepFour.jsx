// StepFour.jsx
import React from 'react';
import FormWindow from '../FormWindow/FormWindow';
import FileUpload from './modules/FileUpload';

const StepFour = ({ formData, setFormData, handleBack, handleSubmit, currentStep, totalSteps, errors, handleFileUpload, isLoading, handleUrlChange }) => {
  const handleNextStep = () => {
    handleSubmit();
  };

  return (
    <FormWindow
      question="Upload a Cover Letter"
      spanQuestion="Cover Letter"
      breakSpan={false}
      bodyQuestion="We’ll securely store your cover letter to make it easier for you to apply to suitable positions! (Optional)"
      currentStep={currentStep}
      totalSteps={totalSteps}
      handleNext={handleNextStep}
      handleBack={handleBack}
      isLastStep={true}
      alignRHS="center"
      disableNext={isLoading}
      showProgressBar={true}
    >
      <div className="flex flex-col w-full items-center gap-4 px-10">
        <FileUpload
          file={formData.coverLetterFile}
          url={formData.coverLetterUrl}
          onFileChange={(file) => {
            setFormData({ ...formData, coverLetterFile: file, coverLetterUrl: file ? formData.coverLetterUrl : '' });
            if (file) handleFileUpload(file, 'coverLetter');
          }}
          onUrlChange={handleUrlChange} // Updated to use handleUrlChange
          placeholderText="Type here..."
          infoText="We accept DOC, DOCX, PDF, RTF & TXT, up to 5MB"
          inputType="textarea"
          isLoading={isLoading}
          error={errors.coverLetterUrl ? 'Error uploading cover letter. Please try a valid file (DOC, DOCX, PDF, RTF, TXT, max 5MB).' : null}
          successMessage={
            formData.coverLetterUrl && !isLoading && !formData.coverLetterFile
              ? 'Cover letter text provided successfully!'
              : formData.coverLetterUrl && !isLoading && formData.coverLetterFile
              ? 'Cover letter uploaded successfully!'
              : null
          }
        />
      </div>
    </FormWindow>
  );
};

export default StepFour;