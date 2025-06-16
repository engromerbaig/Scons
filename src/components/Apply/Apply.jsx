import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepOne from '../FormSteps/StepOne';
import StepTwo from '../FormSteps/StepTwo';
import StepThree from '../FormSteps/StepThree';
import StepFour from '../FormSteps/StepFour';
import StepFive from '../FormSteps/StepFive';
import { theme } from '../../theme';
import Button from '../Button/Button';
import FormField from '../FormSteps/modules/FormField';

// Hardcoded Cloudinary configuration for testing
const CLOUDINARY_CLOUD_NAME = 'dnagiscbn';
const CLOUDINARY_UPLOAD_PRESET = 'career_uploads';

const Apply = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState({
    source: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    linkedin: '',
    role: '',
    resumeFile: null,
    resumeUrl: '',
    coverLetterFile: null,
    coverLetterUrl: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    source: false,
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    role: false,
    resumeUrl: false,
    coverLetterUrl: false,
  });

  // Validate form data
  useEffect(() => {
    const { firstName, lastName, email, phone, role, resumeUrl, source } = formData;
    const isRequiredFieldsFilled = firstName && lastName && email && phone && role && resumeUrl && source;
    setIsFormValid(!!isRequiredFieldsFilled);
  }, [formData]);

  const handleNext = () => {
    let newErrors = {};
    if (step === 1) {
      newErrors = { source: !formData.source };
    } else if (step === 2) {
      newErrors = {
        firstName: !formData.firstName,
        lastName: !formData.lastName,
        email: !formData.email,
        phone: !formData.phone,
        role: !formData.role,
      };
    } else if (step === 3) {
      newErrors = { resumeUrl: !formData.resumeUrl };
    }
    setErrors({ ...errors, ...newErrors });

    if (Object.values(newErrors).some((e) => e)) {
      return;
    }

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFileUpload = async (file, type) => {
    if (!file) return;

    // Validate file type and size
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/rtf',
      'text/plain',
    ];
    if (!validTypes.includes(file.type)) {
      setErrors({ ...errors, [`${type}Url`]: true });
      alert('Invalid file type. Only DOC, DOCX, PDF, RTF, and TXT are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, [`${type}Url`]: true });
      alert('File size exceeds 5MB.');
      return;
    }

    try {
      setIsLoading(true);
      const formDataToUpload = new FormData();
      formDataToUpload.append('file', file);
      formDataToUpload.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formDataToUpload.append('folder', 'career_uploads');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
        {
          method: 'POST',
          body: formDataToUpload,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to upload ${type}: ${errorData.error.message || response.statusText}`);
      }

      const data = await response.json();
      const fileUrl = data.secure_url;
      console.log(`Uploaded ${type} URL:`, fileUrl);

      setFormData({
        ...formData,
        [`${type}File`]: file,
        [`${type}Url`]: fileUrl,
      });
      setErrors({ ...errors, [`${type}Url`]: false }); // Clear error on success
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      setErrors({ ...errors, [`${type}Url`]: true });
      alert(`Error uploading ${type}: ${error.message}. Please try again or provide a URL/text.`);
    } finally {
      setIsLoading(false);
    }
  };

  // New function to handle URL changes and clear errors
  const handleUrlChange = (type, url) => {
    setFormData({
      ...formData,
      [`${type}Url`]: url,
      [`${type}File`]: null,
    });
    // Clear error when a valid URL is provided
    if (url) {
      setErrors({ ...errors, [`${type}Url`]: false });
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      source: !formData.source,
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email,
      phone: !formData.phone,
      role: !formData.role,
      resumeUrl: !formData.resumeUrl,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) {
      return;
    }

    try {
      setIsLoading(true);
      const submitData = {
        'form-name': 'career',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        role: formData.role,
        source: formData.source,
        resumeUrl: formData.resumeUrl,
        coverLetterUrl: formData.coverLetterUrl,
      };

      const response = await fetch('/.netlify/functions/send-career-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Submission result:', result);
      setStep(totalSteps);
      window.gtag('event', 'career_submission', {
        event_category: 'Form',
        event_label: 'Career Application',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`h-screen ${theme.layoutPages.paddingHorizontal} overflow-hidden`}>
      <form
        name="career"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={(e) => e.preventDefault()}
        className="w-full h-full flex"
      >
        <input type="hidden" name="form-name" value="career" />
        {step === 1 && (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
            currentStep={step}
            totalSteps={totalSteps - 1}
            errors={errors}
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
            errors={errors}
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
            errors={errors}
            handleFileUpload={(file) => handleFileUpload(file, 'resume')}
            isLoading={isLoading}
            handleUrlChange={(url) => handleUrlChange('resume', url)} // New prop
          />
        )}
        {step === 4 && (
          <StepFour
            formData={formData}
            setFormData={setFormData}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            currentStep={step}
            totalSteps={totalSteps - 1}
            errors={errors}
            handleFileUpload={(file) => handleFileUpload(file, 'coverLetter')}
            isLoading={isLoading}
            handleUrlChange={(url) => handleUrlChange('coverLetter', url)} // New prop
          />
        )}
        {step === 5 && <StepFive />}
      </form>
    </div>
  );
};

export default Apply;