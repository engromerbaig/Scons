import React, { useState } from 'react';
import moment from 'moment';
import { Clock, User, Video, MapPin, ArrowLeft, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { theme } from '../../theme';

const AppointmentScheduler = () => {
  const [events, setEvents] = useState([
    {
      title: 'Booked Meeting',
      start: new Date(2025, 5, 15, 14, 0), // June 15, 2025, 2:00 PM
      end: new Date(2025, 5, 15, 15, 0), // June 15, 2025, 3:00 PM
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Meeting configuration
  const meetingInfo = {
    title: "15 Minute Meeting",
    duration: "1 hour",
    type: "Google Meet",
    host: "John Doe",
    description: "A brief meeting to discuss your needs and how we can help."
  };

  // Available time slots for each day
  const availableTimeSlots = [
    { time: '11:00 AM - 12:00 PM', value: '11:00' },
    { time: '2:00 PM - 3:00 PM', value: '14:00' },
    { time: '5:00 PM - 6:00 PM', value: '17:00' },
    { time: '8:00 PM - 9:00 PM', value: '20:00' }
  ];

  const getAvailableSlots = (date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    if (isWeekend) return [];
    
    return availableTimeSlots.filter(slot => {
      const [hour] = slot.value.split(':');
      const slotStart = moment(date).set({
        hour: parseInt(hour),
        minute: 0,
      }).toDate();
      const slotEnd = moment(slotStart).add(1, 'hour').toDate();
      
      return !events.some(event => 
        moment(slotStart).isBetween(event.start, event.end, null, '[)') || 
        moment(event.start).isBetween(slotStart, slotEnd, null, '[)')
      );
    });
  };

  const handleDateClick = (date) => {
    const day = date.getDay();
    const today = moment().startOf('day');
    const selectedDay = moment(date).startOf('day');
    
    if (day === 0 || day === 6 || selectedDay.isBefore(today)) {
      return; // Don't select weekends or past dates
    }
    setSelectedDate(date);
  };

  const handleBookSlot = (timeSlot) => {
    const [hour] = timeSlot.value.split(':');
    const start = moment(selectedDate).set({
      hour: parseInt(hour),
      minute: 0,
    }).toDate();
    const end = moment(start).add(1, 'hour').toDate();
    
    const title = window.prompt('Enter your name for the appointment:');
    if (title) {
      setEvents((prev) => [...prev, { 
        title: `Meeting with ${title}`, 
        start, 
        end 
      }]);
      setSelectedDate(null);
      alert(`Appointment booked for ${moment(start).format('MMMM D, YYYY [at] h:mm A')}`);
    }
  };

  const generateCalendarDates = () => {
    const startOfMonth = moment(currentMonth).startOf('month');
    const endOfMonth = moment(currentMonth).endOf('month');
    const startOfCalendar = moment(startOfMonth).startOf('week');
    const endOfCalendar = moment(endOfMonth).endOf('week');
    
    const dates = [];
    const current = moment(startOfCalendar);
    
    while (current.isSameOrBefore(endOfCalendar)) {
      dates.push(moment(current).toDate());
      current.add(1, 'day');
    }
    
    return dates;
  };

  const isDateInCurrentMonth = (date) => {
    return moment(date).isSame(currentMonth, 'month');
  };

  const isToday = (date) => {
    return moment(date).isSame(moment(), 'day');
  };

  const isPastDate = (date) => {
    return moment(date).isBefore(moment(), 'day');
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentMonth(moment(currentMonth).subtract(1, 'month').toDate());
    } else {
      setCurrentMonth(moment(currentMonth).add(1, 'month').toDate());
    }
    setSelectedDate(null);
  };

  const calendarDates = generateCalendarDates();
  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className={`min-h-screen  ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
      <div className="p-0">
        <div className="grid grid-cols-12 gap-8 h-full">
          
          {/* Left Column - Meeting Info */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-neon rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{meetingInfo.host}</p>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {meetingInfo.title}
                </h1>
                <p className="text-gray-600 text-sm mb-4">
                  {meetingInfo.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock size={18} className="text-gray-500" />
                  <span className="text-sm">{meetingInfo.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Video size={18} className="text-gray-500" />
                  <span className="text-sm">{meetingInfo.type}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin size={18} className="text-gray-500" />
                  <span className="text-sm">Web conferencing details provided upon confirmation</span>
                </div>
              </div>

              {selectedDate && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-black">
                    Selected Date
                  </p>
                  <p className="text-sm text-blue-700">
                    {moment(selectedDate).format('dddd, MMMM D, YYYY')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Center Column - Calendar */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Select a Date
              </h2>
              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <h3 className="text-lg font-semibold text-gray-800">
                  {moment(currentMonth).format('MMMM YYYY')}
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="calendar-grid">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-0 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Dates */}
                <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                  {calendarDates.map((date, index) => {
                    const inCurrentMonth = isDateInCurrentMonth(date);
                    const todayDate = isToday(date);
                    const pastDate = isPastDate(date);
                    const weekend = isWeekend(date);
                    const unavailable = pastDate || weekend;
                    
                    return (
                      <div
                        key={index}
                        onClick={() => !unavailable && handleDateClick(date)}
                        className={`
                          relative h-16 border-r border-b border-gray-200 flex items-center justify-center cursor-pointer transition-colors
                          ${index % 7 === 6 ? 'border-r-0' : ''}
                          ${index >= calendarDates.length - 7 ? 'border-b-0' : ''}
                          ${!inCurrentMonth ? 'bg-gray-50 text-gray-300' : ''}
                          ${todayDate && inCurrentMonth ? 'bg-blue-100' : ''}
                          ${weekend || pastDate ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-50'}
                          ${selectedDate && moment(date).isSame(selectedDate, 'day') ? 'bg-blue-500 text-white' : ''}
                        `}
                      >
                        <span className={`
                          text-sm font-medium
                          ${todayDate && inCurrentMonth && (!selectedDate || !moment(date).isSame(selectedDate, 'day')) ? 'text-neon' : ''}
                          ${selectedDate && moment(date).isSame(selectedDate, 'day') ? 'text-white' : ''}
                        `}>
                          {moment(date).format('D')}
                        </span>
                        
                        {/* Show dot if date has events */}
                        {events.some(event => moment(event.start).isSame(date, 'day')) && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Available Time Slots */}
          <div className="col-span-12 lg:col-span-3">
            {selectedDate ? (
              <div className="bg-white rounded-lg shadow-sm border p-6">
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

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getAvailableSlots(selectedDate).length > 0 ? (
                    getAvailableSlots(selectedDate).map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => handleBookSlot(slot)}
                        className="w-full  px-4 py-3 text-sm border-2 border-neon text-center text-neon rounded-lg hover:bg-neon hover:text-white transition-colors duration-200 font-bold"
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
              <div className="bg-white rounded-lg shadow-sm border p-6">
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
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;