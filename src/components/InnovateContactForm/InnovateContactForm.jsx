import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormField from '../FormSteps/modules/FormField';
import { apiUrl } from '../../utilities/apiUrl';

const InnovateContactForm = ({ formData, setFormData, handleSubmit }) => {
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        const { firstName, lastName, email, phone, description } = formData;

        // Check if all fields are filled and email is valid
        const isAllFieldsFilled =
            firstName &&
            lastName &&
            email &&
            phone &&
            description;

        // Basic email validation
        setIsFormValid(!!isAllFieldsFilled);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const submitToCRM = async () => {
        try {
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`, // Combine firstName and lastName
                email: formData.email,
                phonenumber: formData.phone,
                description: formData.description,
                source: "1", // Match the API requirements
                status: "1", // Match the API requirements
            };

            // Post to your backend proxy endpoint
            const response = await axios.post(`${apiUrl}/api/leads`, payload);

            const leadId = response.data.lead_id; // Extract lead_id from response
            console.log('CRM Response in contact form:', response.data);

            // Pass lead_id to parent component
            handleSubmit(leadId); // Call handleSubmit with lead_id
        } catch (error) {
            console.error('Error submitting to CRM:', error.response || error.message);
        }
    };

    const handleFormSubmit = () => {
        if (isFormValid) {
            submitToCRM();
        }
    };

    const customInputStyles =
        "m-1 p-2 lg:p-3 border-b text-bodyText placeholder-bodyText border-neon bg-transparent w-full focus:outline-none";

    return (
        <div className="flex flex-col gap-2 lg:gap-6 lg:px-10 items-start w-full">
            {/* Row 1: First Name and Last Name */}
            <div className="flex flex-col lg:flex-row w-full gap-2 lg:gap-10">
                <FormField
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    inputStyles={customInputStyles}
                />
                <FormField
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    inputStyles={customInputStyles}
                />
            </div>
            {/* Row 2: Email and Phone Number */}
            <div className="flex flex-col lg:flex-row w-full gap-2 lg:gap-10">
                <FormField
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    inputStyles={customInputStyles}
                />
                <FormField
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    inputStyles={customInputStyles}
                />
            </div>
            {/* Row 3: Description */}
            <div className="w-full">
                <FormField
                    name="description"
                    type="textarea"
                    placeholder="Description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    inputStyles={customInputStyles}
                    rows={4}
                    style={{ zIndex: 1, position: "relative" }}
                />
            </div>
            {/* Submit Button */}
            <div 
                className="flex w-full lg:w-auto justify-center lg:justify-start mt-2"
            >
                <div
                    className={`
                        border-neon cursor-pointer font-bold text-bodyText border-2 px-6 lg:px-10 py-2  rounded-lg
                        ${isFormValid 
                            ? 'bg-transparent hover:bg-neon' 
                            : 'bg-neon opacity-50 cursor-not-allowed'
                        }
                    `}
                    onClick={handleFormSubmit}
                    style={{ zIndex: 2, position: "relative" }}
                >
                    Submit
                </div>
            </div>
        </div>
    );
};

export default InnovateContactForm;
