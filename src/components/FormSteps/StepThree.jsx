import React from 'react';
import FormWindow from '../FormWindow/FormWindow';
import FileUpload from './modules/FileUpload';

const StepThree = ({ formData, setFormData, handleBack, handleSubmit, currentStep, totalSteps }) => {
    const isNextDisabled = !formData.resumeFile && !formData.resumeUrl;

    const handleNextStep = () => {
        if (!isNextDisabled) {
            handleSubmit();
        } else {
            alert("Please upload a file or provide a URL to proceed.");
        }
    };

    return (
        <FormWindow
            question="Upload a Resume"
            spanQuestion="Resume"
            breakSpan={false}
            bodyQuestion="We’ll store your resume to enable you to instantly apply to jobs that match what you’re looking for!"
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
                    onFileChange={(file) => setFormData({ ...formData, resumeFile: file })}
                    onUrlChange={(url) => setFormData({ ...formData, resumeUrl: url })}
                    placeholderText="Paste URL Here"
                />
            </div>
        </FormWindow>
    );
};

export default StepThree;
