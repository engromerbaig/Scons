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
      onClose(); // close modal on success
    } catch (error) {
      console.error('Error submitting to CRM:', error.response || error.message);
    }
  };

  const inputStyles = "m-1 p-2 lg:p-3 border-b text-bodyText placeholder-bodyText border-neon bg-transparent w-full focus:outline-none";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-[#111] rounded-lg w-full max-w-xl p-6 relative shadow-xl z-50">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-3xl text-gray-400 hover:text-white">&times;</button>

        <h2 className="text-xl font-bold mb-4 text-neon">Let's Talk</h2>

        {/* Form Start */}
        <div className="flex flex-col gap-2 lg:gap-6">
          {/* Row 1 */}
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

          {/* Row 2 */}
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

          {/* Row 3 */}
          <FormField
            name="description"
            type="textarea"
            placeholder="What would you like to discuss?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            inputStyles={inputStyles}
            rows={4}
          />

          {/* Submit Button */}
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
