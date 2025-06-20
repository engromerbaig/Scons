import React, { useState } from 'react';
import moment from 'moment';
import 'moment-timezone';
import ModalWrapper from '../ChatModal/ModalWrapper';
import FormField from '../FormSteps/modules/FormField';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { Link } from 'react-router-dom';
import { CiTimer } from 'react-icons/ci';
import Button from '../Button/Button';

const BookingForm = ({ slot, onSubmit, onClose, isOpen }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure slot and onSubmit are valid to prevent errors
  if (!slot || !slot.start || !onSubmit) {
    console.error('BookingForm: Invalid slot or onSubmit prop', { slot, onSubmit });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      console.warn('BookingForm: Name or email is empty');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await onSubmit(formData);
      setFormData({ name: '', email: '' });
      return result;
    } catch (error) {
      console.error('BookingForm: Submission failed', error);
      return { success: false, error: 'An error occurred during submission.' };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const inputStyles = 'm-1 py-2 px-6 text-sm rounded-full text-white placeholder-bodyText bg-charcoal w-full focus:outline-none';

  // Format slot time with time zone and handle localDate
  const slotDate = slot.localDate || moment(slot.start).format('YYYY-MM-DD');
  const displayDateTime = moment(`${slotDate} ${slot.time}`, 'YYYY-MM-DD h:mm A')
    .tz(slot.timeZone || 'Asia/Karachi')
    .format('dddd, MMMM D, h:mm A');
  const displayTimeZone = slot.timeZone || 'PKT';

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center mb-4">
        <Heading
          text="Book Your"
          spanText="Slot"
          spanColor="text-neon"
          color="text-white"
          size="text-70px xl:text-50px"
          centered={false}
        />
      </div>

      <div className="flex items-center mb-2">
        <CiTimer size={20} className="text-white   mr-2" />
        <BodyText
          text={`${displayDateTime} ${displayTimeZone}`}
          centered={false}
          color="text-white"
          size="text-xl"
          fontWeight="font-semibold"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 my-6">
        <FormField
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange('name')}
          inputStyles={inputStyles}
          hideErrorMessages={true}
          required
        />
        <FormField
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange('email')}
          inputStyles={inputStyles}
          hideErrorMessages={true}
          required
        />
        <Button
          name="Book Now"
          type="submit"
          bgColor="bg-neon"
          textColor="text-charcoal"
          hoverBgColor="bg-neon-dark"
          hoverTextColor="text-charcoal"
          fontWeight="font-bold"
          className="w-full"
          textAlign="justify-center"
          isLoading={isSubmitting}
          buttonLoadingText="Booking..."
          disabled={!formData.name.trim() || !formData.email.trim() || isSubmitting}
        />
      </form>
      <BodyText
        text={
          <>
            We will store your responses in our secure database. Please consult our{' '}
            <span className="text-neon">
              <Link to="/privacy-policy" onClick={onClose}>
                Privacy Policy
              </Link>
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

export default BookingForm;