import React from 'react';
import moment from 'moment';
import { ArrowLeft, CalendarDays } from 'lucide-react';

const TimeSlots = ({ selectedDate, setSelectedDate, availableTimeSlots, events, handleBookSlot }) => {
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

  return (
    <div className="col-span-12 lg:col-span-3 h-full">
      {selectedDate ? (
        <div className="bg-white rounded-lg shadow-sm border p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Available Times
            </h3>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-neon hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">
              {moment(selectedDate).format('dddd, MMMM D')}
            </p>
          </div>
          <div className="space-y-3 overflow-y-auto flex-1">
            {getAvailableSlots(selectedDate).length > 0 ? (
              getAvailableSlots(selectedDate).map((slot, index) => (
                <button
                  key={index}
                  onClick={() => !slot.isBooked && handleBookSlot(slot)}
                  className={`
                    w-full px-4 py-3 text-sm border-2 rounded-lg text-center font-bold
                    ${slot.isBooked 
                      ? 'border-gray-300 text-gray-400 line-through cursor-not-allowed bg-gray-100' 
                      : 'border-neon text-neon hover:bg-neon hover:text-white transition-colors duration-200'}
                  `}
                  disabled={slot.isBooked}
                >
                  {slot.time}
                </button>
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