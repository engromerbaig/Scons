import React, { useState } from 'react';
import StepOne from '../FormSteps/StepOne';
import StepTwo from '../FormSteps/StepTwo';
import StepThree from '../FormSteps/StepThree';
import StepFour from '../FormSteps/StepFour';
import StepFive from '../FormSteps/StepFive';
import { theme } from '../../theme';
import { apiUrl } from '../../utilities/apiUrl';

const Apply = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 5; // Include StepFive
    const [formData, setFormData] = useState({
        source: '',
        firstName: '', // Add firstName
        lastName: '',  // Add lastName
        phone: '',
        email: '',
        linkedin: '', // Add LinkedIn if needed
        role: '', // Add role for validation in StepTwo
        resumeFile: null, // For StepThree
        resumeUrl: '', // For StepThree
        coverLetterFile: null, // For StepFour
        coverLetterUrl: '', // For StepFour
    });

    const handleNext = async () => {
        // console.log('FRONTEND ENV:', import.meta.env.VITE_API_URL);

        if (step < totalSteps) {
            setStep((prev) => prev + 1);
    
            if (step === totalSteps - 1) {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('firstName', formData.firstName);
                    formDataToSend.append('lastName', formData.lastName);
                    formDataToSend.append('email', formData.email);
                    formDataToSend.append('phone', formData.phone);
                    formDataToSend.append('role', formData.role);
                    formDataToSend.append('linkedin', formData.linkedin);
                    formDataToSend.append('source', formData.source); 
                    // textbox data
                    formDataToSend.append('resumeUrl', formData.resumeUrl);
                    formDataToSend.append('coverLetterUrl', formData.coverLetterUrl);
                    // Make sure source is appended
                    if (formData.resumeFile) {
                        formDataToSend.append('resumeFile', formData.resumeFile);
                    }
                    if (formData.coverLetterFile) {
                        formDataToSend.append('coverLetterFile', formData.coverLetterFile);
                    }
    
                    const response = await fetch(`${apiUrl}/api/forms/career`, {
                    method: 'POST',
                    body: formDataToSend,
                    });

                    const data = await response.json();
                    if (response.ok) {
                        console.log('Form submitted and emails sent:', data.message);
                    } else {
                        console.error('Error:', data.message);
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                }
            }
        }
    };
    
    
    

    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className={`h-screen ${theme.layoutPages.paddingHorizontal}  overflow-hidden`}>
            <div className="w-full h-full flex">
                {step === 1 && (
                    <StepOne
                        formData={formData}
                        setFormData={setFormData}
                        handleNext={handleNext}
                        currentStep={step}
                        totalSteps={totalSteps - 1}
                    />
                )}
                {step === 2 && (
                    <StepTwo
                        formData={formData}
                        setFormData={setFormData}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        currentStep={step}
                        totalSteps={totalSteps - 1}
                    />
                )}
                {step === 3 && (
                    <StepThree
                        formData={formData}
                        setFormData={setFormData}
                        handleBack={handleBack}
                        handleSubmit={handleNext}
                        currentStep={step}
                        totalSteps={totalSteps - 1}
                    />
                )}
                {step === 4 && (
                    <StepFour
                        formData={formData}
                        setFormData={setFormData}
                        handleBack={handleBack}
                        handleSubmit={handleNext}
                        currentStep={step}
                        totalSteps={totalSteps - 1}
                    />
                )}
                {step === 5 && <StepFive />}
            </div>
        </div>
    );
};

export default Apply;
