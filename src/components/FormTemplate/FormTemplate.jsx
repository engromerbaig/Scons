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
  isAudit = false,
  showPhoneNumber = true,
  btnText = 'Submit',
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topics: ['audit'], // Audit selected by default
    description: '',
    url: '',
    ...initialFormData,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    topics: false,
    description: false,
    url: false,
  });

  useEffect(() => {
    const { name, email, phone, description, topics, url } = formData;
    const isRequiredFieldsFilled = name && email && description && (!isAudit || url);
    const topicsValid = showSelect ? topics.length > 0 : true;
    setIsFormValid(!!(isRequiredFieldsFilled && (!showPhoneNumber || phone)));
  }, [formData, showSelect, isAudit, showPhoneNumber]);

  const handleTopicToggle = (topicValue) => {
    const updatedTopics = formData.topics.includes(topicValue)
      ? formData.topics.filter((t) => t !== topicValue)
      : [...formData.topics, topicValue];
    setFormData({ ...formData, topics: updatedTopics });
    setErrors({ ...errors, topics: false });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submit triggered', { formData });

    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      phone: showPhoneNumber ? !formData.phone : false,
      topics: showSelect ? formData.topics.length === 0 : false,
      description: !formData.description,
      url: isAudit ? !formData.url : false,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) {
      console.log('Validation errors:', newErrors);
      return;
    }

    try {
      setIsLoading(true);
      const submitData = {
        'form-name': formName,
        name: formData.name,
        email: formData.email,
        phone: showPhoneNumber ? formData.phone : undefined,
        description: formData.description,
      };
      if (isAudit) {
        submitData.topics = formData.topics;
        submitData.url = formData.url;
      }
      const response = await fetch('/.netlify/functions/send-contact-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
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
    } finally {
      setIsLoading(false);
    }
  };

  const topicOptions = [
    { value: 'audit', label: 'Audit' },
    { value: 'web_development', label: 'Web Development' },
    { value: 'mobile_app_dev', label: 'Mobile App Development' },
    { value: 'logo_design', label: 'Logo Design' },
    { value: 'ux_ui_design', label: 'UX/UI Design' },
    { value: 'digital_marketing', label: 'Digital Marketing' },
    { value: 'seo_service', label: 'SEO Service' },
    { value: 'ai_bot', label: 'AI Bot' },
  ];

  // Define margin classes based on isAudit
  const marginClasses = isAudit ? 'mb-2 xl:mb-4' : 'xl:mb-2';

  return (
    <div className="flex flex-col gap-20 lg:gap-40">
      <form
        name={formName}
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="form-name" value={formName} />

        {showSelect && (
          <div className="mb-6">
            <label className="block text-lg font-bold text-black mb-3">
              Desired Services
            </label>
            <div className="flex flex-wrap gap-3">
              {topicOptions.map((option) => {
                const isSelected = formData.topics.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleTopicToggle(option.value)}
                    className={`
                      relative px-4 py-2 pl-8 rounded-full border-2 border-neon
                      ${isSelected ? 'bg-neon' : 'bg-white'}
                      hover:bg-neon/80
                      transition-all duration-300 ease-in-out
                      flex items-center justify-center
                      text-sm font-medium text-black
                      min-w-[120px]
                    `}
                  >
                    {isSelected && (
                      <span className="absolute left-2 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
            {!hideErrorMessages && errors.topics && (
              <p className="text-red-500 text-sm mt-2">
                Please select at least one topic
              </p>
            )}
          </div>
        )}

        {isAudit && (
          <div className={marginClasses}>
            <FormField
              name="url"
              type="url"
              placeholder="Website URL"
              value={formData.url}
              onChange={(e) => {
                setFormData({ ...formData, url: e.target.value });
                setErrors({ ...errors, url: false });
              }}
              inputStyles={inputStyles}
              hideErrorMessages={hideErrorMessages}
            />
            {!hideErrorMessages && errors.url && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid URL</p>
            )}
          </div>
        )}

        <div className={marginClasses}>
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

        <div className={`flex flex-col ${showPhoneNumber ? 'lg:flex-row xl:gap-2' : ''} ${marginClasses}`}>
          <div className={showPhoneNumber ? 'flex-1' : 'w-full'}>
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
          {showPhoneNumber && (
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
          )}
        </div>

        <div className={marginClasses}>
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
            name={btnText}
            className={`${buttonWidth} py-2`}
            bgColor={isFormValid ? 'bg-neon' : 'bg-neon/60'}
            textColor="text-neon"
            hoverBgColor={isFormValid ? 'bg-neon' : 'bg-neon/60'}
            hoverTextColor="text-black"
            fontSize="text-sm"
            fontWeight="font-bold"
            textAlign="justify-center"
            type="submit"
            disabled={!isFormValid || isLoading}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default FormTemplate;