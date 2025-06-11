import React, { useState, useRef } from 'react';
import moment from 'moment';
import { gsap } from 'gsap';
import FormField from '../FormSteps/modules/FormField';
import ModalWrapper from '../ChatModal/ModalWrapper';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { Link } from 'react-router-dom';

const BookingPopUp = ({ slot, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return; // Basic validation
    gsap.to(formRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        onSubmit(slot); // Call handleBookSlot and open confirmation
      },
    });
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const inputStyles = "m-1 py-2 px-6 text-sm rounded-full text-white placeholder-bodyText bg-charcoal w-full focus:outline-none";

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div ref={formRef} className="form-content space-y-6">
        <Heading
          text="Book Your"
          spanText="Meeting"
          spanColor="text-neon"
          color="text-white"
          size="text-50px"
          centered={false}
        />
        <BodyText
          text={`Meeting Time: ${moment(slot.start).format('dddd, MMMM D, h:mm A')}`}
          centered={false}
          color="text-white"
          size="text-20px"
        />
        <div className="space-y-4">
          <FormField
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange('name')}
            inputStyles={inputStyles}
            hideErrorMessages={true}
          />
          <FormField
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange('email')}
            inputStyles={inputStyles}
            hideErrorMessages={true}
          />
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-neon text-charcoal font-bold rounded-full hover:bg-neon-dark transition-colors duration-200"
            disabled={!formData.name || !formData.email}
          >
            Book Slot
          </button>
        </div>
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
          className="mt-4"
        />
      </div>
    </ModalWrapper>
  );
};

export default BookingPopUp;