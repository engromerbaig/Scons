import React from 'react';
import FormWindow from '../FormWindow/FormWindow';
import FileUpload from './modules/FileUpload';

const StepThree = ({ formData, setFormData, handleBack, handleSubmit, currentStep, totalSteps, errors, handleFileUpload, isLoading }) => {
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
          url={formData.resumeUrl}
          onFileChange={(file) => {
            setFormData({ ...formData, resumeFile: file, resumeUrl: file ? formData.resumeUrl : '' });
            if (file) handleFileUpload(file, 'resume');
          }}
          onUrlChange={(url) => setFormData({ ...formData, resumeUrl: url, resumeFile: null })}
          placeholderText="Paste URL Here"
          infoText="We accept DOC, DOCX, PDF, RTF & TXT, up to 5MB"
        />
        {errors.resumeUrl && (
          <p className="text-red-500 text-sm">Error uploading resume. Please try a valid file (DOC, DOCX, PDF, RTF, TXT, max 5MB) or provide a URL.</p>
        )}
        {formData.resumeUrl && !isLoading && !formData.resumeFile && (
          <p className="text-green-500 text-sm">Resume URL provided successfully!</p>
        )}
        {formData.resumeUrl && !isLoading && formData.resumeFile && (
          <p className="text-green-500 text-sm">Resume uploaded successfully!</p>
        )}
        {isLoading && <p className="text-gray-500 text-sm">Uploading...</p>}
      </div>
    </FormWindow>
  );
};

export default StepThree;