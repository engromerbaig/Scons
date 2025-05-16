import React, { useEffect, useState } from 'react';
import FormField from '../FormSteps/modules/FormField';
import Button from '../Button/Button';

const FormTemplate = ({ handleFormSubmit, inputStyles, initialFormData = {}, hideErrorMessages = false , buttonWidth="w-full" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    ...initialFormData,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    description: false,
  });

  useEffect(() => {
    const { name, email, phone, description } = formData;
    const isAllFieldsFilled = name && email && phone && description;
    setIsFormValid(!!isAllFieldsFilled);
  }, [formData]);

  const onSubmit = () => {
    if (!isFormValid) {
      setErrors({
        name: !formData.name,
        email: !formData.email,
        phone: !formData.phone,
        description: !formData.description,
      });
      return;
    }
    handleFormSubmit(formData);
  };

  return (
    <div className="flex flex-col gap-2 lg:gap-4">
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

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-2">
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

      <div>
        <FormField
          name="description"
          type="textarea"
          placeholder="What would you like to discuss?"
          rows={1}
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
          bgColor={isFormValid ? "bg-neon" : "bg-neon/90"}
          textColor="text-neon"
          hoverBgColor={isFormValid ? "bg-neon" : "bg-neon"}
          hoverTextColor="text-black"
          fontSize="text-sm"
          fontWeight="font-bold"
          textAlign="justify-center"
          onClick={onSubmit}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default FormTemplate;