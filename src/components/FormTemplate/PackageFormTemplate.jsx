import React, { useState, useEffect } from 'react';
import FormField from '../FormSteps/modules/FormField';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';

const PackageFormTemplate = ({
  packageName,
  packagePrice,
  handleFormSubmit,
  inputStyles,
  hideErrorMessages = false,
  onSuccess,
  formName = 'package-inquiry',
}) => {
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

    // Simple validation
    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      phone: !formData.phone,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    try {
      setIsLoading(true);

      const response = await fetch('/.netlify/functions/send-package-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'form-name': formName,
          packageName,
          packagePrice,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit package inquiry');

      const result = await response.json();
      console.log('Package inquiry submission:', result);

      handleFormSubmit(formData);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting package inquiry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form name={formName} onSubmit={onSubmit} className="flex flex-col gap-4">
 <div className="">
  <input
    type="text"
    value={packageName}
    readOnly
    size={packageName.length } // slight buffer
    className="cursor-not-allowed text-xs font-bold px-4 text-center border-2 border-neon rounded-full text-neon"
    style={{ backgroundColor: 'transparent' }}
  />
</div>


      <div>
        <input
          type="text"
          value={packagePrice}
          readOnly
    className={`cursor-not-allowed text-40px font-black w-full text-white`}
        style={{ backgroundColor: 'transparent', border: 'none' }}

        />
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
  );
};

export default PackageFormTemplate;
