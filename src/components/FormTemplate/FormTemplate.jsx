import React, { useEffect, useState } from 'react';
import FormField from '../FormSteps/modules/FormField';
import Button from '../Button/Button';

const FormTemplate = ({ handleFormSubmit, inputStyles, initialFormData = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    ...initialFormData,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name, email, phone, description } = formData;
    const isAllFieldsFilled = name && email && phone && description;
    setIsFormValid(!!isAllFieldsFilled);
  }, [formData]);

  const onSubmit = () => {
    if (!isFormValid) return;
    handleFormSubmit(formData);
  };

  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      <FormField
        name="name"
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        inputStyles={inputStyles}
      />

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-2">
        <FormField
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          inputStyles={inputStyles}
        />
        <FormField
          name="phone"
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          inputStyles={inputStyles}
        />
      </div>

      <FormField
        name="description"
        type="textarea"
        placeholder="What would you like to discuss?"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        inputStyles={inputStyles}
        rows={1}
      />

      <div className="flex justify-center mt-4">
        <Button
          name="Submit"
          className="w-full py-2"
          bgColor={isFormValid ? "bg-transparent" : "bg-neon"}
          textColor="text-neon"
          hoverBgColor={isFormValid ? "bg-neon" : "bg-neon"}
          hoverTextColor="text-black"
          fontSize="text-20px"
          fontWeight="font-bold"
          textAlign='justify-center'
          onClick={onSubmit}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default FormTemplate;