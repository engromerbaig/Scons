import React, { useState } from 'react';
import FormWindow from '../FormWindow/FormWindow';
import FileUpload from './modules/FileUpload';

const StepFour = ({ formData, setFormData, handleBack, handleSubmit, currentStep, totalSteps, errors, handleFileUpload, isLoading, handleUrlChange }) => {
  const [inputUrl, setInputUrl] = useState('');

  const handleNextStep = () => {
    handleSubmit();
  };

  return (
    <FormWindow
      question="Upload a Cover Letter"
      spanQuestion="Cover Letter"
      breakSpan={false}
      bodyQuestion="Additionally, you could add your cover letter to provide more context about your qualifications. While optional, it is highly recommended."
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
          url={inputUrl}
          onFileChange={(file) => {
            setFormData({ ...formData, coverLetterFile: file, coverLetterUrl: '' });
            setInputUrl(''); // Clear URL input
            if (file) handleFileUpload(file, 'coverLetter');
          }}
          onUrlChange={(url) => {
            setInputUrl(url);
            if (url) {
              setFormData({ ...formData, coverLetterUrl: url, coverLetterFile: null });
              handleUrlChange('coverLetter', url);
            } else {
              // Clear both when URL is empty (like when delete is clicked)
              setFormData({ ...formData, coverLetterUrl: '', coverLetterFile: null });
            }
          }}
          placeholderText="Type here..."
          infoText="We accept DOC, DOCX, PDF, RTF & TXT, up to 5MB"
          inputType="textarea"
          isLoading={isLoading}
          error={errors.coverLetterUrl ? 'Error uploading cover letter. Please try a valid file (DOC, DOCX, PDF, RTF, TXT, max 5MB).' : null}
          successMessage={
            formData.coverLetterUrl && !isLoading && !formData.coverLetterFile && inputUrl
              ? 'Cover letter text provided successfully!'
              : formData.coverLetterFile && !isLoading
              ? 'Cover letter uploaded successfully!'
              : null
          }
        />
      </div>
    </FormWindow>
  );
};

export default StepFour;