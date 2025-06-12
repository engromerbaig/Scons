import moment from 'moment';
import 'moment-timezone';
import { CalendarDays } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import BookingForm from './BookingForm';

const TimeSlots = ({ 
  selectedDate, 
  setSelectedDate, 
  groupedTimeSlots, 
  events, 
  handleBookSlot, 
  onShowConfirmation 
}) => {
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);
  const [activeSlotGroup, setActiveSlotGroup] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const slotRefs = useRef({});

  const checkSlotAvailability = (slot) => {
    // Use original date for checking availability
    const [hour] = slot.pktTime.split(':');
    const slotStart = moment(slot.originalDateObj)
      .tz('Asia/Karachi')
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

    // Check if slot is within 1 hour of current time in PKT
    const now = moment().tz('Asia/Karachi');
    const slotMoment = moment(slotStart).tz('Asia/Karachi');
    const isTooClose = slotMoment.diff(now, 'hours', true) < 1;

    return { ...slot, isBooked, isTooClose, start: slotStart };
  };

  const resetActiveSlot = () => {
    if (activeSlotIndex !== null && activeSlotGroup !== null) {
      const slotRef = slotRefs.current[`${activeSlotGroup}-${activeSlotIndex}`];
      if (slotRef) {
        gsap.to(slotRef.querySelector('.slot-time'), {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(slotRef.querySelector('.book-it-btn'), {
          x: '100%',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
      setActiveSlotIndex(null);
      setActiveSlotGroup(null);
    }
  };

  const handleSlotClick = (groupDate, index) => {
    const currentKey = `${groupDate}-${index}`;
    const activeKey = activeSlotGroup && activeSlotIndex !== null ? `${activeSlotGroup}-${activeSlotIndex}` : null;

    if (activeKey === currentKey) {
      // Do nothing if clicking the same slot
    } else {
      // Reset previous active slot
      if (activeKey && slotRefs.current[activeKey]) {
        gsap.to(slotRefs.current[activeKey].querySelector('.slot-time'), {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(slotRefs.current[activeKey].querySelector('.book-it-btn'), {
          x: '100%',
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Activate new slot
      setActiveSlotIndex(index);
      setActiveSlotGroup(groupDate);
      
      const newSlotRef = slotRefs.current[currentKey];
      if (newSlotRef) {
        gsap.to(newSlotRef.querySelector('.slot-time'), {
          x: '-50%',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(newSlotRef.querySelector('.book-it-btn'), {
          x: '0%',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
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
      if (activeSlotIndex === null || activeSlotGroup === null || showBookingForm) return;

      const currentKey = `${activeSlotGroup}-${activeSlotIndex}`;
      const currentSlot = slotRefs.current[currentKey];
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
  }, [activeSlotIndex, activeSlotGroup, showBookingForm]);

  // Get formatted date for display
  const getDateDisplay = (dateStr) => {
    const date = moment(dateStr);
    const today = moment().startOf('day');
    const tomorrow = moment().add(1, 'day').startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');

    if (date.isSame(today, 'day')) {
      return 'Today';
    } else if (date.isSame(tomorrow, 'day')) {
      return 'Tomorrow';
    } else if (date.isSame(yesterday, 'day')) {
      return 'Yesterday';
    } else {
      return date.format('dddd, MMMM D');
    }
  };

  // Sort grouped dates chronologically
  const sortedGroupDates = Object.keys(groupedTimeSlots).sort((a, b) => 
    moment(a).diff(moment(b))
  );

  const hasAnySlots = sortedGroupDates.length > 0;

  return (
    <>
      <div className="col-span-12 lg:col-span-3 h-full">
        {selectedDate ? (
          <div className="rounded-lg shadow-sm border p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Available Slots</h3>
            </div>
            
            <div className="space-y-6 overflow-y-auto flex-1">
              {hasAnySlots ? (
                sortedGroupDates.map((groupDate) => {
                  const slots = groupedTimeSlots[groupDate];
                  const hasAvailableSlots = slots.some(slot => {
                    const checkedSlot = checkSlotAvailability(slot);
                    return !checkedSlot.isBooked && !checkedSlot.isTooClose;
                  });

                  return (
                    <div key={groupDate} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-700">
                          {getDateDisplay(groupDate)}
                        </h4>
                        <span className="text-xs text-gray-400">
                          {moment(groupDate).format('MMM D')}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {slots.map((slot, index) => {
                          const checkedSlot = checkSlotAvailability(slot);
                          const slotKey = `${groupDate}-${index}`;
                          
                          return (
                            <div 
                              key={index} 
                              ref={(el) => (slotRefs.current[slotKey] = el)} 
                              className="relative w-full overflow-hidden"
                            >
                        <button
  onClick={() =>
    !checkedSlot.isBooked &&
    !checkedSlot.isTooClose &&
    handleSlotClick(groupDate, index)
  }
  className={`
    w-full px-4 py-3 text-sm border-2 rounded-lg text-center font-bold relative
    ${
      checkedSlot.isBooked || checkedSlot.isTooClose
        ? 'border-gray-600 text-gray-500 cursor-not-allowed bg-gray-50 opacity-50'
        : 'border-neon text-neon hover:bg-neon hover:text-white hover:border-neon transition-colors duration-200'
    }
  `}
  disabled={checkedSlot.isBooked || checkedSlot.isTooClose}
>
  <span
    className={`
      slot-time inline-block transform-origin-center
      ${checkedSlot.isBooked || checkedSlot.isTooClose ? 'line-through' : ''}
    `}
  >
    {checkedSlot.time} {checkedSlot.timeZone}
  </span>
</button>

                              {!checkedSlot.isBooked && !checkedSlot.isTooClose && (
                                <button
                                  onClick={() => openBookingForm(checkedSlot)}
                                  className="book-it-btn absolute top-0 right-0 h-full px-4 py-3 text-sm bg-black text-white font-bold rounded-r-lg transform translate-x-full"
                                >
                                  Reserve
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      {!hasAvailableSlots && (
                        <p className="text-xs text-gray-400 italic text-center py-2">
                          No available slots for this date
                        </p>
                      )}
                    </div>
                  );
                })
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