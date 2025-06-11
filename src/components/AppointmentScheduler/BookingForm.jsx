import React, { useState } from 'react';
import moment from 'moment';
import FormField from '../FormSteps/modules/FormField';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingForm = ({ slot, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return; // Basic validation
    
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const inputStyles = "m-1 py-2 px-6 text-sm rounded-full text-white placeholder-gray-400 bg-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-neon";

  return (
    <div className="bg-charcoal rounded-lg shadow-sm border p-6 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <button
          onClick={onClose}
          className="flex items-center text-white hover:text-neon transition-colors duration-200 mr-4"
        >
          <ArrowLeft size={20} />
        </button>
        <h3 className="text-xl font-semibold text-white">Book Your Meeting</h3>
      </div>
      
      <div className="flex-1 space-y-6">
        <BodyText
          text={`Meeting Time: ${moment(slot.start).format('dddd, MMMM D, h:mm A')}`}
          centered={false}
          color="text-white"
          size="text-lg"
          className="font-medium"
        />
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className="w-full px-4 py-3 bg-neon text-charcoal font-bold rounded-full hover:bg-neon-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!formData.name || !formData.email || isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Book Slot'}
          </button>
        </form>
        
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
          color="text-gray-400"
          size="text-sm"
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default BookingForm;