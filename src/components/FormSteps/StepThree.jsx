import React, { useState } from 'react';
import FormWindow from '../FormWindow/FormWindow';
import FileUpload from './modules/FileUpload';

const StepThree = ({ formData, setFormData, handleBack, handleSubmit, currentStep, totalSteps, errors, handleFileUpload, isLoading, handleUrlChange }) => {
  const [inputUrl, setInputUrl] = useState('');
  const isNextDisabled = !formData.resumeUrl || isLoading;

  const handleNextStep = () => {
    if (!isNextDisabled) {
      handleSubmit();
    } else {
      alert('Please upload a valid resume file or provide a URL to proceed.');
    }
  };

  return (
    <FormWindow
      question="Upload a Resume"
      spanQuestion="Resume"
      breakSpan={false}
      bodyQuestion="We’ll securely store your resume to make it easier for you to apply to suitable positions!"
      currentStep={currentStep}
      totalSteps={totalSteps}
      handleNext={handleNextStep}
      handleBack={handleBack}
      isLastStep={false}
      alignRHS="center"
      disableNext={isNextDisabled}
      showProgressBar={true}
    >
      <div className="flex flex-col w-full items-center gap-4 px-10">
        <FileUpload
          file={formData.resumeFile}
          url={inputUrl}
          onFileChange={(file) => {
            setFormData({ ...formData, resumeFile: file, resumeUrl: '' }); // Clear resumeUrl
            setInputUrl(''); // Clear URL input
            if (file) handleFileUpload(file, 'resume');
          }}
          onUrlChange={(url) => {
            setInputUrl(url);
            setFormData({ ...formData, resumeUrl: url, resumeFile: null }); // Clear resumeFile
            handleUrlChange('resume', url);
          }}
          placeholderText="Paste URL Here"
          infoText="We accept DOC, DOCX, PDF, RTF & TXT, up to 5MB"
          isLoading={isLoading}
          error={errors.resumeUrl ? 'Error uploading resume. Please try a valid file (DOC, DOCX, PDF, RTF, TXT, max 5MB) or provide a URL.' : null}
          successMessage={
            formData.resumeUrl && !isLoading && !formData.resumeFile && inputUrl
              ? 'Resume URL provided successfully!'
              : formData.resumeUrl && !isLoading && formData.resumeFile
              ? 'Resume uploaded successfully!'
              : null
          }
        />
      </div>
    </FormWindow>
  );
};

export default StepThree;