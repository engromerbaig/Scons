import moment from 'moment';
import { CalendarDays } from 'lucide-react';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';

const TimeSlots = ({ selectedDate, setSelectedDate, availableTimeSlots, events, handleBookSlot }) => {
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);
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
      return { ...slot, isBooked };
    });
  };

  const handleSlotClick = (index) => {
    if (activeSlotIndex === index) {
      // Toggle off: slide "Reserve It" out and reset time text
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
      // Reset previous active slot if exists
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

      // Animate new slot
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

  return (
    <div className="col-span-12 lg:col-span-3 h-full">
      {selectedDate ? (
        <div className="bg-white rounded-lg shadow-sm border p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Available Slots
            </h3>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">
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
                        ? 'border-gray-300 text-gray-400 line-through cursor-not-allowed bg-gray-100' 
                        : 'border-neon text-neon hover:bg-neon hover:text-white transition-colors duration-200'}
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
                      onClick={() => handleBookSlot(slot)}
                      className="book-it-btn absolute top-0 right-0 h-full px-4 py-3 text-sm bg-black text-white font-bold rounded-r-lg transform translate-x-full"
                    >
                      Reserve It
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No available times for this date</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-6 h-full flex flex-col justify-center">
          <div className="text-center py-12">
            <CalendarDays size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select a date
            </h3>
            <p className="text-gray-500">
              Please select a date from the calendar to view available time slots
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;