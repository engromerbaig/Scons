import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import Button from '../Button/Button';

const BookingConfirmation = ({ slot, onClose, onBookAnother }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

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
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] p-8">
      <div className="w-full max-w-2xl space-y-6 text-center">
        <Heading
          text="Booking"
          spanText="Confirmed"
          spanColor="text-neon"
          color="text-white"
          size="text-50px"
          centered={true}
        />
        <BodyText
          text="Your meeting is scheduled. Time remaining until your meeting:"
          centered={true}
          color="text-white"
          size="text-20px"
        />
        <BodyText
          text={timeRemaining}
          centered={true}
          color="text-white"
          size="text-20px"
          className="font-semibold"
        />
        <BodyText
          text={`Meeting Time: ${moment(slot.start).format('dddd, MMMM D, h:mm A')}`}
          centered={true}
          color="text-white"
          size="text-20px"
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            name="Return Home"
            link="/"
            bgColor="bg-neon"
            textColor="text-charcoal"
            hoverBgColor="bg-neon-dark"
            hoverTextColor="text-charcoal"
            fontSize="text-sm"
            fontWeight="font-bold"
            className="px-6 py-2 rounded-full"
          />
          <Button
            name="Book Another Slot"
            onClick={onBookAnother}
            bgColor="bg-neon"
            textColor="text-charcoal"
            hoverBgColor="bg-neon-dark"
            hoverTextColor="text-charcoal"
            fontSize="text-sm"
            fontWeight="font-bold"
            className="px-6 py-2 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;