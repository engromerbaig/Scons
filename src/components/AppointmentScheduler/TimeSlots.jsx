import moment from 'moment';
import { CalendarDays } from 'lucide-react';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import BookingForm from './BookingForm';
import BookingConfirmation from './BookingConfirmation';

const TimeSlots = ({ selectedDate, setSelectedDate, availableTimeSlots, events, handleBookSlot }) => {
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const slotRefs = useRef([]);

  const getAvailableSlots = (date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    if (isWeekend) return [];
    
    return availableTimeSlots.map(slot => {
      const [hour] = slot.value.split(':');
      const slotStart = moment(date).set({
        hour: parseInt(hour),
        minute: 0,
      }).toDate();
      const slotEnd = moment(slotStart).add(1, 'hour').toDate();
      
      const isBooked = events.some(event => 
        moment(slotStart).isBetween(event.start, event.end, null, '[)') || 
        moment(event.start).isBetween(slotStart, slotEnd, null, '[)')
      );
      return { ...slot, isBooked, start: slotStart };
    });
  };

  const handleSlotClick = (index) => {
    if (activeSlotIndex === index) {
      gsap.to(slotRefs.current[index].querySelector('.slot-time'), {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(slotRefs.current[index].querySelector('.book-it-btn'), {
        x: '100%',
        duration: 0.3,
        ease: 'power2.out',
      });
      setActiveSlotIndex(null);
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
        x: '-60%',
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
  };

  const closeBookingForm = () => {
    console.log('Closing booking form');
    setShowBookingForm(false);
    setActiveSlotIndex(null);
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
  };

  const handleBookingSubmit = async (formData) => {
    console.log('Submitting booking with data:', formData);
    try {
      const result = await handleBookSlot(selectedSlot, formData);
      setBookingResult(result);
      setShowBookingForm(false);
      setIsConfirmationVisible(true);
    } catch (error) {
      console.error('Booking submission failed:', error);
    }
  };

  const closeConfirmation = () => {
    console.log('Closing confirmation');
    setIsConfirmationVisible(false);
    setSelectedSlot(null);
    setBookingResult(null);
    setActiveSlotIndex(null);
  };

  return (
    <div className="col-span-12 lg:col-span-3 h-full">
      {selectedDate && !showBookingForm && !isConfirmationVisible ? (
        <div className=" rounded-lg shadow-sm border p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold ">
              Available Slots
            </h3>
          </div>
          <div className="mb-4">
            <p className="text-gray-400 font-medium">
              {moment(selectedDate).format('dddd, MMMM D')}
            </p>
          </div>
          <div className="space-y-4 overflow-y-auto flex-1">
            {getAvailableSlots(selectedDate).length > 0 ? (
              getAvailableSlots(selectedDate).map((slot, index) => (
                <div
                  key={index}
                  ref={(el) => (slotRefs.current[index] = el)}
                  className="relative w-full overflow-hidden"
                >
                  <button
                    onClick={() => !slot.isBooked && handleSlotClick(index)}
                    className={`
                      w-full px-4 py-3 text-sm border-2 rounded-lg text-center font-bold relative
                      ${slot.isBooked 
                        ? 'border-gray-700 text-gray-500 line-through cursor-not-allowed bg-gray-800' 
                        : 'border-neon text-neon hover:bg-neon hover:text-charcoal transition-colors duration-200'}
                    `}
                    disabled={slot.isBooked}
                  >
                    <span 
                      className="slot-time inline-block transform-origin-center" 
                      style={{ transformOrigin: 'center' }}
                    >
                      {slot.time}
                    </span>
                  </button>
                  {!slot.isBooked && (
                    <button
                      onClick={() => openBookingForm(slot)}
                      className="book-it-btn absolute top-0 right-0 h-full px-4 py-3 text-sm bg-black text-white font-bold rounded-r-lg transform translate-x-full"
                    >
                      Reserve It
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
      ) : selectedDate && showBookingForm ? (
        <BookingForm
          slot={selectedSlot}
          onSubmit={handleBookingSubmit}
          onClose={closeBookingForm}
          isOpen={showBookingForm}
        />
      ) : isConfirmationVisible ? (
        <BookingConfirmation 
          slot={selectedSlot} 
          bookingResult={bookingResult}
          onClose={closeConfirmation}
        />
      ) : (
        <div className="bg-charcoal rounded-lg shadow-sm border border-gray-700 p-6 h-full flex flex-col justify-center">
          <div className="text-center py-12">
            <CalendarDays size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Select a date
            </h3>
            <p className="text-gray-400">
              Please select a date from the calendar to view available time slots
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;