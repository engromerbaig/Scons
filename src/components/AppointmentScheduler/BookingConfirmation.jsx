import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import BodyText from '../BodyText/BodyText';
import Button from '../../components/Button/Button';
import { CheckCircle, XCircle } from 'lucide-react';
import { theme } from '../../theme';

const BookingConfirmation = ({ slot, bookingResult, onClose, onBookAnother }) => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only on mount

  // Return null if slot is invalid
  if (!slot || !slot.start) {
    return null;
  }

  const isSuccess = bookingResult && bookingResult.success;
  const secondButtonText = isSuccess ? 'Book Another' : 'Try Again';

  const handleReturnHome = () => {
    onClose();
    navigate('/', { replace: true });
  };

  const handleSecondAction = () => {
    if (isSuccess) {
      if (onBookAnother) {
        onBookAnother();
      } else {
        onClose();
      }
    } else {
      onClose();
    }
  };

  // Format slot time with time zone and handle localDate
  const slotDate = slot.localDate || moment(slot.start).format('YYYY-MM-DD');
  const displayDateTime = moment(`${slotDate} ${slot.time}`, 'YYYY-MM-DD h:mm A')
    .tz(slot.timeZone || 'Asia/Karachi')
    .format('dddd, MMMM D, h:mm A');
  const displayTimeZone = slot.timeZone || 'PKT';

  return (
    <div
      className={`flex flex-col ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} h-screen justify-center items-center gap-4 text-center`}
    >
      {isSuccess ? (
        <>
          <CheckCircle size={64} className="text-green-500 mx-auto" />
          <Heading
            text="Booking Confirmed!"
            color="text-black"
            centered={true}
            className="leading-none"
          />
          <BodyText
            text="We've confirmed your booking! You'll receive a confirmation email shortly."
            centered={true}
            color="text-black"
            className="max-w-xl"
          />
          <BodyText
            text={`Meeting Time: ${displayDateTime} ${displayTimeZone}`}
            centered={true}
            color="text-black"
            className="max-w-xl font-medium"
          />
        </>
      ) : (
        <>
          <XCircle size={64} className="text-red-500 mx-auto" />
          <Heading
            text="Booking Failed"
            color="text-black"
            centered={true}
            className="leading-none"
          />
          <BodyText
            text={bookingResult?.error || 'Something went wrong while booking your appointment. Please try again.'}
            centered={true}
            color="text-black"
            className="max-w-xl"
          />
          <BodyText
            text={`Attempted Time: ${displayDateTime} ${displayTimeZone}`}
            centered={true}
            color="text-black"
            className="max-w-xl font-medium"
          />
        </>
      )}
      <div className="flex flex-row xl:flex-row gap-2 xl:gap-4 w-full justify-center items-center max-w-xs">
        <Button
          name="Return Home"
          bgColor="bg-black"
          textColor="white"
          hoverBgColor="bg-black/90"
          hoverTextColor="white"
          fontSize="text-sm"
          textAlign="justify-center"
          fontWeight="font-bold"
          className="px-4 py-2 rounded-full w-full max-w-xs text-center"
          onClick={handleReturnHome}
        />
        <Button
          name={secondButtonText}
          bgColor="bg-black"
          textColor="white"
          hoverBgColor="bg-black/90"
          hoverTextColor="white"
          fontSize="text-sm"
          fontWeight="font-bold"
          textAlign="justify-center"
          className="px-4 py-2 rounded-full w-full max-w-xs text-center"
          onClick={handleSecondAction}
        />
      </div>
    </div>
  );
};

export default BookingConfirmation;