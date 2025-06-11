import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import Button from '../Button/Button';
import { theme } from '../../theme';

const BookingConfirmation = ({ slot }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  // Return null if slot is invalid
  if (!slot || !slot.start) {
    return null;
  }

  useEffect(() => {
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
  }, [slot.start]);

  return (
    <div className={`flex flex-col ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} h-screen justify-center items-center gap-4 text-center bg-white`}>
      <Heading
        text="Booking Confirmed!"
        color="text-black"
        centered={true}
        className="leading-none"
        size="text-50px"
      />
      <BodyText
        text="We've confirmed your booking! You'll receive a confirmation email shortly. Below is your meeting time and the time remaining until your meeting."
        centered={true}
        color="text-black"
        className="max-w-xl"
        size="text-20px"
      />
      <BodyText
        text={timeRemaining}
        centered={true}
        color="text-black"
        className="max-w-xl font-semibold"
        size="text-20px"
      />
      <BodyText
        text={`Meeting Time: ${moment(slot.start).tz('Asia/Karachi').format('dddd, MMMM D, h:mm A')}`}
        centered={true}
        color="text-black"
        className="max-w-xl"
        size="text-20px"
      />
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          name="Back to Home"
          bgColor="bg-black"
          textColor="text-white" // Improved contrast
          hoverBgColor="bg-black/90"
          hoverTextColor="text-white"
          fontSize="text-sm"
          fontWeight="font-bold"
          className="px-6 py-2 rounded-full"
          onClick={() => (window.location.href = '/')}
        />
        <Button
          name="Book Another Slot"
          bgColor="bg-black"
          textColor="text-white" // Improved contrast
          hoverBgColor="bg-black/90"
          hoverTextColor="text-white"
          fontSize="text-sm"
          fontWeight="font-bold"
          className="px-6 py-2 rounded-full"
          onClick={() => (window.location.href = '/schedule')}
        />
      </div>
    </div>
  );
};

export default BookingConfirmation;