import React, { useEffect, useState } from 'react';
import FormField from '../FormSteps/modules/FormField';

const FormTemplate = ({ handleFormSubmit, inputStyles, initialFormData = {} }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: '',
    ...initialFormData,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { firstName, lastName, email, phone, description } = formData;
    const isAllFieldsFilled = firstName && lastName && email && phone && description;
    setIsFormValid(!!isAllFieldsFilled);
  }, [formData]);

  const onSubmit = () => {
    if (!isFormValid) return;
    handleFormSubmit(formData);
  };

  return (
    <div className="flex flex-col gap-2 lg:gap-6">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10">
        <FormField
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          inputStyles={inputStyles}
        />
        <FormField
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          inputStyles={inputStyles}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10">
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
        rows={4}
      />

      <div className="flex justify-center mt-4">
        <div
          onClick={onSubmit}
          className={`
            cursor-pointer font-bold border-2 border-neon px-6 py-2 rounded-lg
            ${isFormValid ? 'bg-transparent hover:bg-neon' : 'bg-neon opacity-50 cursor-not-allowed'}
          `}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default FormTemplate;