import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { gsap } from 'gsap';
import FormField from '../FormSteps/modules/FormField';
import ModalWrapper from '../ChatModal/ModalWrapper';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { Link } from 'react-router-dom';

const BookingPopUp = ({ slot, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [timeRemaining, setTimeRemaining] = useState('');
  const formRef = useRef(null);
  const thankYouRef = useRef(null);

  useEffect(() => {
    // Calculate time remaining for Thank You step
    if (step === 2) {
      const updateCountdown = () => {
        const now = moment();
        const meetingTime = moment(slot.start);
        const duration = moment.duration(meetingTime.diff(now));
        if (duration.asSeconds() <= 0) {
          setTimeRemaining('Meeting is now!');
          return;
        }
        const days = Math.floor(duration.asDays());
        const hours = Math.floor(duration.asHours()) % 24;
        const minutes = Math.floor(duration.asMinutes()) % 60;
        setTimeRemaining(
          `${days > 0 ? `${days} day${days > 1 ? 's' : ''}, ` : ''}${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`
        );
      };
      updateCountdown();
      const interval = setInterval(updateCountdown, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [step, slot.start]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return; // Basic validation
    onSubmit(slot); // Call handleBookSlot to reserve the booking
    gsap.to(formRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        setStep(2);
        gsap.from(thankYouRef.current, {
          opacity: 0,
          x: 50,
          duration: 0.3,
          ease: 'power2.out',
        });
      },
    });
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const inputStyles = "m-1 py-2 px-6 text-sm rounded-full text-white placeholder-bodyText bg-charcoal w-full focus:outline-none";

  return (
    <ModalWrapper isOpen={true} onClose={onClose}>
      {step === 1 ? (
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
              Submit
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
      ) : (
        <div ref={thankYouRef} className="thank-you-content space-y-6">
          <Heading
            text="Booking"
            spanText="Confirmed"
            spanColor="text-neon"
            color="text-white"
            size="text-50px"
            centered={false}
          />
          <BodyText
            text="Your meeting is scheduled. Time remaining until your meeting:"
            centered={false}
            color="text-white"
            size="text-20px"
          />
          <BodyText
            text={timeRemaining}
            centered={false}
            color="text-white"
            size="text-20px"
            className="font-semibold"
          />
          <BodyText
            text={`Meeting Time: ${moment(slot.start).format('dddd, MMMM D, h:mm A')}`}
            centered={false}
            color="text-white"
            size="text-20px"
          />
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-neon text-charcoal font-bold rounded-full hover:bg-neon-dark transition-colors duration-200"
          >
            Close
          </button>
        </div>
      )}
    </ModalWrapper>
  );
};

export default BookingPopUp;