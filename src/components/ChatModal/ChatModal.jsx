import React, { useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utilities/apiUrl';
import FormTemplate from '../FormTemplate/FormTemplate';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';

const ChatModal = ({ isOpen, onClose }) => {
useEffect(() => {
  let showBtnTimer;
  let hideScrollTimer;

  if (isOpen) {
    showBtnTimer = setTimeout(() => setShowCloseButton(true), 500); // Adjust as needed
    hideScrollTimer = setTimeout(() => {
      document.body.style.overflow = 'hidden';
    }, 0); // Slight delay prevents layout shift
  } else {
    document.body.style.overflow = '';
  }

  return () => {
    clearTimeout(showBtnTimer);
    clearTimeout(hideScrollTimer);
    document.body.style.overflow = '';
  };
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

  const inputStyles = "m-1 py-2 px-6 text-sm rounded-full text-white placeholder-bodyText  bg-charcoal w-full focus:outline-none";

  return (
    <div
      className={`fixed inset-0 h-screen  z-[9999] flex items-center justify-end bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black py-12 px-8 w-[500px] h-screen shadow-xl relative transform transition-transform duration-500 ease-in-out z-110
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-50px text-black bg-white hover:bg-white rounded-full w-8 h-8 flex items-center justify-center z-120"
        >
          ×
        </button>


      <div className="flex flex-col justify-start  text-start gap-6">

      <Heading
          text="Coffee Break?"
          spanText="Break?"
          spanColor="text-neon"
          color="text-white"
          size="text-50px"
          centered={false}
        />

        <BodyText
          text="Let's chat! We are here to help you with your project. Fill out the form below and we will get back to you as soon as possible."
          centered={false}
          color="text-white"
          size="text-20px"
        />
    <FormTemplate
          handleFormSubmit={handleFormSubmit}
          inputStyles={inputStyles}
          hideErrorMessages={true}
        />
  


      </div>

  

     
      </div>
    </div>
  );
};

export default ChatModal;