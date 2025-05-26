import React, { useEffect, useState } from 'react';
import FormTemplate from '../FormTemplate/FormTemplate';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { Link } from 'react-router-dom';
const ChatModal = ({ isOpen, onClose }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

useEffect(() => {
  let showBtnTimer;

  if (isOpen) {
    showBtnTimer = setTimeout(() => setShowCloseButton(true), 500);
    document.body.style.overflow = 'hidden'; // Disable scroll immediately

  } else {
    document.body.style.overflow = ''; // Re-enable scroll

    setShowCloseButton(false);
  }

  return () => {
    clearTimeout(showBtnTimer);
    document.body.style.overflow = ''; // Ensure scroll is reset
  };
}, [isOpen]);


  const handleFormSubmit = (formData) => {
    console.log('Form Submitted with Data:', formData);
  };

  const inputStyles = "m-1 py-2 px-6 text-sm rounded-full text-white placeholder-bodyText bg-charcoal w-full focus:outline-none";

  return (
    <div
      className={`fixed inset-0 h-screen z-[9999] flex items-center justify-end bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black py-12 px-8 w-[500px] h-screen shadow-xl relative transform transition-transform duration-500 ease-in-out z-110 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-50px text-black bg-white hover:bg-white rounded-full w-8 h-8 flex items-center justify-center z-120"
          >
            ×
          </button>
        )}

        <div className="flex flex-col justify-start text-start gap-6">
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
            onSuccess={onClose}
            formName="contact"
          />

        <BodyText
  text={
    <>
      We will store your responses in our secure database. Please consult our{' '}
      <span className="text-neon">
        <Link to="/privacy-policy" onClick={onClose}>Privacy Policy</Link>
      </span>.
    </>
  }
  centered={false}
  color="text-grayText"
  size="text-sm"
  className="mt-2 xl:mt-4"
/>

        </div>
      </div>
    </div>
  );
};

export default ChatModal;