import React, { useState } from 'react';
import FormWindow from '../FormWindow/FormWindow';
import FormField from './modules/FormField';
import jobListings from "../../data/jobListings.json"

const StepTwo = ({ formData, setFormData, handleNext, handleBack, currentStep, totalSteps }) => {
    const [errors, setErrors] = useState({});

    // Extract job types from jobListings
    const jobOptions = jobListings.flatMap((listing) =>
        listing.childItems.map((child) => child.jobType)
    );

    // Validate all required fields
    const validateFields = () => {
        const newErrors = {};

        if (!formData.firstName || !/^[a-zA-Z\s]+$/.test(formData.firstName)) {
            newErrors.firstName = "First name is required and must contain only letters";
        }
        if (!formData.lastName || !/^[a-zA-Z\s]+$/.test(formData.lastName)) {
            newErrors.lastName = "Last name is required and must contain only letters";
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Valid email is required";
        }
        if (!formData.phone || !/^\d+$/.test(formData.phone)) {
            newErrors.phone = "Phone number is required and must contain only digits";
        }
        if (!formData.role) {
            newErrors.role = "Please select a role";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateFields()) {
            handleNext();
        } else {
            alert("Please complete all required fields to proceed.");
        }
    };

    return (
        <FormWindow
            question="Ok, now give us more details about yourself."
            spanQuestion="details about yourself."
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNextStep}
            handleBack={handleBack}
            isLastStep={false}
            alignRHS="center" // Dynamic alignment
            showProgressBar={true}
        >
            {/* Right-hand side form */}
            <div className="flex flex-col gap-1 md:gap-2 md:px-4 lg:gap-4 lg:px-10 items-start w-full">
    {/* Row 1: First Name and Last Name */}
    <div className="flex flex-col lg:flex-row w-full gap-1 md:gap-2  lg:gap-4">
        <FormField
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required={true}
            validationMessage={errors.firstName}
        />
        <FormField
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required={true}
            validationMessage={errors.lastName}
        />
    </div>

    {/* Row 2: Email and Phone Number */}
    <div className="flex flex-col lg:flex-row w-full gap-1 md:gap-2  lg:gap-4">
        <FormField
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required={true}
            validationMessage={errors.email}
        />
        <FormField
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required={true}
            validationMessage={errors.phone}
        />
    </div>

    {/* Row 3: LinkedIn Profile and Role */}
    <div className="flex flex-col lg:flex-row w-full gap-1 md:gap-2  lg:gap-4">
        <FormField
            type="text"
            placeholder="LinkedIn Profile"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            required={false} // Optional field
        />

        {/* Dropdown for Roles */}
        <FormField
            type="select"
            placeholder="Select Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required={true}
            validationMessage={errors.role}
            options={jobOptions} // Use extracted job options
        />
    </div>
</div>

        </FormWindow>
    );
};

export default StepTwo;
