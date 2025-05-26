import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../FormSteps/modules/FormField';
import Button from '../Button/Button';

const FormTemplate = ({
  handleFormSubmit,
  inputStyles,
  initialFormData = {},
  hideErrorMessages = false,
  buttonWidth = 'w-full',
  textAreaRows = 1,
  showSelect = false,
  onSuccess,
  formName = 'contact',
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    description: '',
    ...initialFormData,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    topic: false,
    description: false,
  });

  useEffect(() => {
    const { name, email, phone, description } = formData;
    const isAllFieldsFilled = name && email && phone && description;
    const topicValid = showSelect ? formData.topic : true;
    setIsFormValid(!!(isAllFieldsFilled && topicValid));
  }, [formData, showSelect]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submit triggered', { formData });

    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      phone: !formData.phone,
      topic: showSelect ? !formData.topic : false,
      description: !formData.description,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) {
      console.log('Validation errors:', newErrors);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/send-contact-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'form-name': formName,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Submission result:', result);
      handleFormSubmit(formData);
      if (onSuccess) onSuccess();
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const topicOptions = [
    { value: 'web_development', label: 'Web Development' },
    { value: 'mobile_app_dev', label: 'Mobile App Development' },
    { value: 'logo_design', label: 'Logo Design' },
    { value: 'ux_ui_design', label: 'UX/UI Design' },
    { value: 'digital_marketing', label: 'Digital Marketing' },
    { value: 'seo_service', label: 'SEO Service' },
    { value: 'ai_bot', label: 'AI Bot' },
    { value: 'consultancy', label: 'Consultancy' },
  ];

  return (
    <div className="flex flex-col gap-2 lg:gap-6">
      <form
        name={formName}
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="form-name" value={formName} />
        <div>
          <FormField
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: false });
            }}
            inputStyles={inputStyles}
            hideErrorMessages={hideErrorMessages}
          />
          {!hideErrorMessages && errors.name && (
            <p className="text-red-500 text-sm mt-1">Please enter your name</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex-1">
            <FormField
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: false });
              }}
              inputStyles={inputStyles}
              hideErrorMessages={hideErrorMessages}
            />
            {!hideErrorMessages && errors.email && (
              <p className="text-red-500 text-sm mt-1">Please enter your email</p>
            )}
          </div>
          <div className="flex-1">
            <FormField
              name="phone"
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                setErrors({ ...errors, phone: false });
              }}
              inputStyles={inputStyles}
              hideErrorMessages={hideErrorMessages}
            />
            {!hideErrorMessages && errors.phone && (
              <p className="text-red-500 text-sm mt-1">Please enter your phone number</p>
            )}
          </div>
        </div>

        {showSelect && (
          <div>
            <FormField
              name="topic"
              type="select"
              placeholder="Desired Service?"
              value={formData.topic}
              onChange={(e) => {
                setFormData({ ...formData, topic: e.target.value });
                setErrors({ ...errors, topic: false });
              }}
              options={topicOptions}
              inputStyles={inputStyles}
              hideErrorMessages={hideErrorMessages}
            />
            {!hideErrorMessages && errors.topic && (
              <p className="text-red-500 text-sm mt-1">Please select a topic</p>
            )}
          </div>
        )}

        <div>
          <FormField
            name="description"
            type="textarea"
            placeholder="What would you like to discuss?"
            rows={textAreaRows}
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              setErrors({ ...errors, description: false });
            }}
            inputStyles={inputStyles}
            hideErrorMessages={hideErrorMessages}
          />
          {!hideErrorMessages && errors.description && (
            <p className="text-red-500 text-sm mt-1">Please enter a description</p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <Button
            name="Submit"
            className={`${buttonWidth} py-2`}
            bgColor={isFormValid ? 'bg-neon' : 'bg-neon/90'}
            textColor="text-neon"
            hoverBgColor={isFormValid ? 'bg-neon' : 'bg-neon'}
            hoverTextColor="text-black"
            fontSize="text-sm"
            fontWeight="font-bold"
            textAlign="justify-center"
            type="submit"
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};

export default FormTemplate;