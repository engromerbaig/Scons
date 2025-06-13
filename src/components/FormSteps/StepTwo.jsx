import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FormWindow from '../FormWindow/FormWindow';
import FormField from './modules/FormField';
import jobListings from "../../data/jobListings.json";
import { slugify } from '../../utilities/slugify';

const StepTwo = ({ formData, setFormData, handleNext, handleBack, currentStep, totalSteps }) => {
    const [errors, setErrors] = useState({});
    const location = useLocation();

    // Extract job types from jobListings and format for FormField
    const jobOptions = jobListings.map((job) => ({
        label: job.jobType,
        value: job.jobType
    }));

    // Pre-fill role from query parameter
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const queryJobType = queryParams.get('jobType');

        if (queryJobType && !formData.role) {
            // Find the jobType that matches the slugified query parameter
            const matchingJob = jobListings.find(
                (job) => slugify(job.jobType) === queryJobType
            );
            if (matchingJob) {
                setFormData((prev) => ({
                    ...prev,
                    role: matchingJob.jobType,
                }));
            }
        }
    }, [location.search, formData.role, setFormData]);

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
            alignRHS="center"
            showProgressBar={true}
        >
            {/* Right-hand side form */}
            <div className="flex flex-col gap-1 md:gap-2 md:px-4 lg:gap-4 lg:px-10 items-start w-full">
                {/* Row 1: First Name and Last Name */}
                <div className="flex flex-col lg:flex-row w-full gap-1 md:gap-2 lg:gap-4">
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
                <div className="flex flex-col lg:flex-row w-full gap-1 md:gap-2 lg:gap-4">
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
                <div className="flex flex-col lg:flex-row w-full gap-1 md:gap-2 lg:gap-4">
                    <FormField
                        type="text"
                        placeholder="LinkedIn Profile"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        required={false}
                    />
                    <FormField
                        type="select"
                        placeholder="Select Role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required={true}
                        validationMessage={errors.role}
                        options={jobOptions}
                    />
                </div>
            </div>
        </FormWindow>
    );
};

export default StepTwo;