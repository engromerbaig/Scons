import React from 'react';
import FormWindow from '../FormWindow/FormWindow';
import FileUpload from './modules/FileUpload';

const StepFour = ({ formData, setFormData, handleBack, handleSubmit, currentStep, totalSteps, errors, handleFileUpload, isLoading }) => {
  const handleNextStep = () => {
    handleSubmit(); // Cover letter is optional
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
          onUrlChange={(url) => setFormData({ ...formData, coverLetterUrl: url, coverLetterFile: null })}
          placeholderText="Type here..."
          infoText="We accept DOC, DOCX, PDF, RTF & TXT, up to 5MB"
          inputType="textarea"
        />
        {errors.coverLetterUrl && (
          <p className="text-red-500 text-sm">Error uploading cover letter. Please try a valid file (DOC, DOCX, PDF, RTF, TXT, max 5MB).</p>
        )}
        {formData.coverLetterUrl && !isLoading && !formData.coverLetterFile && (
          <p className="text-green-500 text-sm">Cover letter text provided successfully!</p>
        )}
        {formData.coverLetterUrl && !isLoading && formData.coverLetterFile && (
          <p className="text-green-500 text-sm">Cover letter uploaded successfully!</p>
        )}
        {isLoading && <p className="text-gray-500 text-sm">Uploading...</p>}
      </div>
    </FormWindow>
  );
};

export default StepFour;