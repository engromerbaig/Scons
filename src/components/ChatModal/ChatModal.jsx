import React from 'react';
import ModalWrapper from './ModalWrapper';
import FormTemplate from '../FormTemplate/FormTemplate';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { Link } from 'react-router-dom';

const ChatModal = ({ isOpen, onClose }) => {
  const handleFormSubmit = (formData) => {
    console.log('Form Submitted with Data:', formData);
  };

  const inputStyles = "m-1 py-2 px-6 text-sm rounded-full text-white placeholder-bodyText bg-charcoal w-full focus:outline-none";

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Heading
        text="Coffee Break?"
        spanText="Break?"
        spanColor="text-neon"
        color="text-white"
        size="text-70px xl:text-50px"
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
    </ModalWrapper>
  );
};

export default ChatModal;