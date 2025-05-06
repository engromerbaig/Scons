import React, { useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utilities/apiUrl';
import FormTemplate from '../FormTemplate/FormTemplate';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';

const ChatModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  const handleFormSubmit = async (formData) => {
    const payload = {
      name: formData.name,
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

  const inputStyles = "m-1 py-2 px-4 rounded-full text-bodyText placeholder-bodyText border-neon bg-charcoal w-full focus:outline-none";

  return (
    <div
      className={`fixed inset-0 z-[20000] flex items-center justify-end bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black py-20 px-10 w-[500px] h-screen shadow-xl relative transform transition-transform duration-500 ease-in-out z-110
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-50px text-black bg-white hover:bg-white rounded-full w-8 h-8 flex items-center justify-center z-120"
        >
          ×
        </button>

        <Heading
          text="Coffee Break? Let's Talk"
          spanText="Let's Talk"
          spanColor="text-neon"
          color="text-white"
          size="text-40px"
          centered={false}
        />

        <BodyText
          text="We are here to help you with your project. Fill out the form below and we will get back to you as soon as possible."
          centered={false}
          color="text-grayText"
          size="text-20px"
          className="pb-10"
        />

        <FormTemplate
          handleFormSubmit={handleFormSubmit}
          inputStyles={inputStyles}
        />
      </div>
    </div>
  );
};

export default ChatModal;