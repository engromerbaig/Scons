import React, { useEffect, useState } from 'react';
import FormField from '../FormSteps/modules/FormField';
import axios from 'axios';
import { apiUrl } from '../../utilities/apiUrl';

const ChatModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { firstName, lastName, email, phone, description } = formData;
    const isAllFieldsFilled = firstName && lastName && email && phone && description;
    setIsFormValid(!!isAllFieldsFilled);
  }, [formData]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  const handleFormSubmit = async () => {
    if (!isFormValid) return;

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phonenumber: formData.phone,
      description: formData.description,
      source: "1",
      status: "1",
    };

    try {
      const response = await axios.post(`${apiUrl}/api/leads`, payload);
      const leadId = response.data.lead_id;
      console.log("CRM Lead Created:", leadId);
      onClose();
    } catch (error) {
      console.error('Error submitting to CRM:', error.response || error.message);
    }
  };

  const inputStyles = "m-1 p-2 lg:p-3 border-b text-bodyText placeholder-bodyText border-neon bg-transparent w-full focus:outline-none";

  return (
    <div
      className={`fixed inset-0 z-[20000] flex items-center justify-end bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-[#111] w-xl h-screen shadow-xl relative transform transition-transform duration-500 ease-in-out z-110
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-3xl text-gray-400 hover:text-white z-120"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-neon">Let's Talk</h2>

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
              onClick={handleFormSubmit}
              className={`
                cursor-pointer font-bold border-2 border-neon px-6 py-2 rounded-lg
                ${isFormValid ? 'bg-transparent hover:bg-neon' : 'bg-neon opacity-50 cursor-not-allowed'}
              `}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;