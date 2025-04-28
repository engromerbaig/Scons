import React from 'react';
import axios from 'axios';
import FormWindow from '../FormWindow/FormWindow';
import InnovateContactForm from '../InnovateContactForm/InnovateContactForm';
import { apiUrl } from '../../utilities/apiUrl';

const ReusableFormStep = ({
    formData,
    setFormData,
    handleNext,
    handleBack,
    currentStep,
    totalSteps,
    question,
    spanQuestion,
    spanColor,
    briefDataBuilder, // Function to build brief data
}) => {
    const handleSubmit = async (leadId) => {
        // Build Brief Data dynamically
        const briefData = briefDataBuilder(formData, leadId);

        // Lead Data is the same for all steps
        const leadData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phonenumber: formData.phone,
            description: formData.description,
        };

        try {
            console.log("Lead Data:", leadData);

            // Post Brief Data
            const response = await axios.post(`${apiUrl}/api/briefdata`, briefData);
            console.log("Brief Data API Response:", response.data);
        } catch (error) {
            console.error("Error posting Brief Data:", error.response?.data || error.message);
        }

        console.log("Brief Data:", briefData);

        handleNext(); // Proceed to next step
    };

    return (
        <FormWindow
            question={question}
            spanQuestion={spanQuestion}
            spanColor={spanColor}
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleBack={handleBack}
            handleNext={handleNext}
            showNext={false}
            alignRHS="center"
        >
            <InnovateContactForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
            />
        </FormWindow>
    );
};

export default ReusableFormStep;
