import React from 'react';
import FormWindow from '../FormWindow/FormWindow';
import FileUpload from './modules/FileUpload';

const StepFour = ({ formData, setFormData, handleBack, handleSubmit, currentStep, totalSteps }) => {
    const isNextDisabled =
        (!formData.coverLetterFile && !formData.coverLetterUrl) ||
        (formData.coverLetterUrl && formData.coverLetterUrl.length < 10);

    const handleNextStep = () => {
        if (!isNextDisabled) {
            handleSubmit();
        } else {
            if (formData.coverLetterUrl && formData.coverLetterUrl.length < 10) {
                alert("Cover letter must be at least 10 characters long.");
            } else {
                alert("Please upload a file or provide a valid cover letter URL to proceed.");
            }
        }
    };

    return (
        <FormWindow
            question="Upload a Cover Letter"
            spanQuestion='Cover Letter'
            breakSpan={false}
            bodyQuestion="We’ll store your cover letter to enable you to instantly apply to jobs that match what you’re looking for!"
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNextStep}
            handleBack={handleBack}
            isLastStep={true}
            alignRHS="center"
            disableNext={isNextDisabled}
            showProgressBar={true}

        >
            <div className="flex flex-col w-full items-center gap-4 px-10">
                <FileUpload
                    file={formData.coverLetterFile}
                    url={formData.coverLetterUrl}
                    onFileChange={(file) => setFormData({ ...formData, coverLetterFile: file })}
                    onUrlChange={(url) => setFormData({ ...formData, coverLetterUrl: url })}
                    placeholderText="Type here..."
                    inputType="textarea"
                />
            </div>
        </FormWindow>
    );
};

export default StepFour;
