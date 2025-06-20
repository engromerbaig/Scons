import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import FormField from '../FormSteps/modules/FormField';
import Button from '../Button/Button';

const PackageFormTemplate = ({
  packageName,
  packagePrice,
  handleFormSubmit,
  inputStyles,
  hideErrorMessages = false,
  onSuccess,
  formName = 'package-inquiry', // Use static formName to match index.html
}) => {
  const navigate = useNavigate(); // Add navigate hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    const { name, email, phone } = formData;
    setIsFormValid(name && email && phone);
  }, [formData]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      phone: !formData.phone,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) {
      console.log('Validation errors:', newErrors);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('/.netlify/functions/send-package-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'form-name': formName, // Ensure form-name is included
          packageName,
          packagePrice,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Package inquiry submission:', {
        packageName,
        packagePrice,
        ...formData,
        result,
      });

      handleFormSubmit(formData);
      if (onSuccess) onSuccess();
      navigate('/thank-you'); // Add navigation to thank-you page
    } catch (error) {
      console.error('Error submitting package inquiry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        name={formName}
        method="POST"
        data-netlify="true" // Add Netlify attributes
        data-netlify-honeypot="bot-field"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="form-name" value={formName} /> {/* Add hidden form-name input */}
        <div>
          <input
            type="text"
            value={packageName}
            readOnly
            size={packageName.length}
            className="cursor-not-allowed text-xs font-bold px-4 text-center border-2 border-neon rounded-full text-neon"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>

        <div
          className="w-full justify-center text-white text-90px lg:text-60px font-black cursor-not-allowed flex items-baseline"
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          <span className="text-xs mr-1">{packagePrice?.match(/[^\d\s]+/)}</span>
          <span>{packagePrice?.match(/[\d.,]+/)}</span>
        </div>

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

        <div className="flex justify-center mt-4">
          <Button
            name="Submit Query"
            className="w-full py-2"
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

export default PackageFormTemplate;