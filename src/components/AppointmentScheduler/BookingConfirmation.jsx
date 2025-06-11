import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import Button from '../Button/Button';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { theme } from '../../theme';

const BookingConfirmation = ({ slot, bookingResult, onClose }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  // Return null if slot is invalid
  if (!slot || !slot.start) {
    return null;
  }

  const isSuccess = bookingResult && bookingResult.success;

  useEffect(() => {
    if (!isSuccess) return;
    
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
  }, [slot.start, isSuccess]);

  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 h-full flex flex-col justify-center">
        <div className="text-center space-y-4">
          <CheckCircle size={64} className="text-green-500 mx-auto" />
          <Heading
            text="Booking Confirmed!"
            color="text-black"
            centered={true}
            className="leading-none"
            size="text-2xl"
          />
          <BodyText
            text="We've confirmed your booking! You'll receive a confirmation email shortly."
            centered={true}
            color="text-gray-600"
            className="max-w-sm mx-auto"
            size="text-base"
          />
          <BodyText
            text={timeRemaining}
            centered={true}
            color="text-green-600"
            className="max-w-sm mx-auto font-semibold"
            size="text-base"
          />
          <BodyText
            text={`Meeting Time: ${moment(slot.start).tz('Asia/Karachi').format('dddd, MMMM D, h:mm A')}`}
            centered={true}
            color="text-gray-800"
            className="max-w-sm mx-auto font-medium"
            size="text-base"
          />
          <div className="flex flex-col gap-3 pt-4">
            <Button
              name="Book Another Slot"
              bgColor="bg-neon"
              textColor="text-charcoal"
              hoverBgColor="bg-neon-dark"
              hoverTextColor="text-charcoal"
              fontSize="text-sm"
              fontWeight="font-bold"
              className="px-4 py-2 rounded-full w-full"
              onClick={() => (window.location.href = '/schedule')}
            />
            <Button
              name="Back to Home"
              bgColor="bg-gray-100"
              textColor="text-gray-700"
              hoverBgColor="bg-gray-200"
              hoverTextColor="text-gray-800"
              fontSize="text-sm"
              fontWeight="font-medium"
              className="px-4 py-2 rounded-full w-full"
              onClick={() => (window.location.href = '/')}
            />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 h-full flex flex-col justify-center">
      <div className="text-center space-y-4">
        <XCircle size={64} className="text-neon mx-auto" />
        <Heading
          text="Booking Failed"
          color="text-red-600"
          centered={true}
          className="leading-none"
          size="text-2xl"
        />
        <BodyText
          text={bookingResult?.error || "Something went wrong while booking your appointment. Please try again."}
          centered={true}
          color="text-gray-600"
          className="max-w-sm mx-auto"
          size="text-base"
        />
        <BodyText
          text={`Attempted Time: ${moment(slot.start).format('dddd, MMMM D, h:mm A')}`}
          centered={true}
          color="text-gray-500"
          className="max-w-sm mx-auto"
          size="text-sm"
        />
        <div className="flex flex-col gap-3 pt-4">
          <Button
            name="Try Again"
            bgColor="bg-red-500"
            textColor="text-white"
            hoverBgColor="bg-red-600"
            hoverTextColor="text-white"
            fontSize="text-sm"
            fontWeight="font-bold"
            className="px-4 py-2 rounded-full w-full"
            onClick={onClose}
          />
          <Button
            name="Back to Calendar"
            bgColor="bg-gray-100"
            textColor="text-gray-700"
            hoverBgColor="bg-gray-200"
            hoverTextColor="text-gray-800"
            fontSize="text-sm"
            fontWeight="font-medium"
            className="px-4 py-2 rounded-full w-full"
            onClick={() => (window.location.href = '/schedule')}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;