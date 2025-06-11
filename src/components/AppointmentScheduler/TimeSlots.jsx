import moment from 'moment';
import 'moment-timezone';
import { CalendarDays } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import BookingForm from './BookingForm';

const TimeSlots = ({ selectedDate, setSelectedDate, availableTimeSlots, events, handleBookSlot, onShowConfirmation }) => {
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const slotRefs = useRef([]);

  const getAvailableSlots = (date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    if (isWeekend) return [];

    return availableTimeSlots.map((slot) => {
      const [hour] = slot.pktTime.split(':'); // Use pkt time for consistency
      const slotStart = moment(date)
        .tz('Pakistan/Karachi')
        .set({
          hour: parseInt(hour),
          minute: 0,
        })
        .toDate();
      const slotEnd = moment(slotStart).add(1, 'hour').toDate();

      const isBooked = events.some(
        (event) =>
          moment(slotStart).isBetween(event.start, event.end, null, '[)') ||
          moment(event.start).isBetween(slotStart, slotEnd, null, '[)')
      );

      // Check if slot is within 1 hour of current time in pkt
      const now = moment().tz('America/Los_Angeles');
      const slotMoment = moment(slotStart).tz('America/Los_Angeles');
      const isTooClose = slotMoment.diff(now, 'hours', true) < 1;

      return { ...slot, isBooked, isTooClose, start: slotStart };
    });
  };

  const resetActiveSlot = () => {
    if (activeSlotIndex !== null) {
      gsap.to(slotRefs.current[activeSlotIndex].querySelector('.slot-time'), {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(slotRefs.current[activeSlotIndex].querySelector('.book-it-btn'), {
        x: '100%',
        duration: 0.3,
        ease: 'power2.out',
      });
      setActiveSlotIndex(null);
    }
  };

  const handleSlotClick = (index) => {
    if (activeSlotIndex === index) {
      // Do nothing
    } else {
      if (activeSlotIndex !== null) {
        gsap.to(slotRefs.current[activeSlotIndex].querySelector('.slot-time'), {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(slotRefs.current[activeSlotIndex].querySelector('.book-it-btn'), {
          x: '100%',
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      setActiveSlotIndex(index);
      gsap.to(slotRefs.current[index].querySelector('.slot-time'), {
        x: '-50%',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(slotRefs.current[index].querySelector('.book-it-btn'), {
        x: '0%',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const openBookingForm = (slot) => {
    console.log('Opening booking form for slot:', slot);
    setSelectedSlot(slot);
    setShowBookingForm(true);
    setTimeout(() => {
      setIsFormVisible(true);
    }, 10);
  };

  const closeBookingForm = () => {
    console.log('Closing booking form');
    setIsFormVisible(false);
    setTimeout(() => {
      setShowBookingForm(false);
      resetActiveSlot();
    }, 300);
  };

  const handleBookingSubmit = async (formData) => {
    console.log('Submitting booking with data:', formData);
    try {
      const result = await handleBookSlot(selectedSlot, formData);
      setIsFormVisible(false);
      setTimeout(() => {
        setShowBookingForm(false);
      }, 300);
      onShowConfirmation(selectedSlot, result);
    } catch (error) {
      console.error('Booking submission failed:', error);
      setIsFormVisible(false);
      setTimeout(() => {
        setShowBookingForm(false);
      }, 300);
      onShowConfirmation(selectedSlot, { success: false, error: 'An error occurred during booking.' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeSlotIndex === null || showBookingForm) return;

      const currentSlot = slotRefs.current[activeSlotIndex];
      if (!currentSlot) return;

      const slotButton = currentSlot.querySelector('button');
      const reserveButton = currentSlot.querySelector('.book-it-btn');

      if (
        !slotButton.contains(event.target) &&
        (!reserveButton || !reserveButton.contains(event.target))
      ) {
        resetActiveSlot();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeSlotIndex, showBookingForm]);

  return (
    <>
      <div className="col-span-12 lg:col-span-3 h-full">
        {selectedDate ? (
          <div className="rounded-lg shadow-sm border p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Available Slots</h3>
            </div>
            <div className="mb-4">
              <p className="text-gray-400 font-medium">{moment(selectedDate).format('dddd, MMMM D')}</p>
            </div>
            <div className="space-y-4 overflow-y-auto flex-1">
              {getAvailableSlots(selectedDate).length > 0 ? (
                getAvailableSlots(selectedDate).map((slot, index) => (
                  <div key={index} ref={(el) => (slotRefs.current[index] = el)} className="relative w-full overflow-hidden">
                    <button
                      onClick={() => !slot.isBooked && !slot.isTooClose && handleSlotClick(index)}
                      className={`
                        w-full px-4 py-3 text-sm border-2 rounded-lg text-center font-bold relative
                        ${
                          slot.isBooked || slot.isTooClose
                            ? 'border-gray-600 text-gray-500 line-through cursor-not-allowed bg-gray-50 opacity-50'
                            : 'border-neon text-neon hover:bg-neon hover:text-white hover:border-neon transition-colors duration-200'
                        }
                      `}
                      disabled={slot.isBooked || slot.isTooClose}
                    >
                      <span className="slot-time inline-block transform-origin-center" style={{ transformOrigin: 'center' }}>
                        {slot.time} {slot.timeZone}
                      </span>
                    </button>
                    {!slot.isBooked && !slot.isTooClose && (
                      <button
                        onClick={() => openBookingForm(slot)}
                        className="book-it-btn absolute top-0 right-0 h-full px-4 py-3 text-sm bg-black text-white font-bold rounded-r-lg transform translate-x-full"
                      >
                        Reserve
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No available times for this date</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-6 h-full flex flex-col justify-center">
            <div className="text-center py-12">
              <CalendarDays size={24} className="text-black mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">Select a Date</h3>
              <p className="text-gray-400">Please select a date from the calendar to view available time slots</p>
            </div>
          </div>
        )}
      </div>

      {selectedSlot && showBookingForm && (
        <BookingForm
          slot={selectedSlot}
          onSubmit={handleBookingSubmit}
          onClose={closeBookingForm}
          isOpen={isFormVisible}
        />
      )}
    </>
  );
};

export default TimeSlots;