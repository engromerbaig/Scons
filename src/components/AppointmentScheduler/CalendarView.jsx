import React from 'react';
import moment from 'moment';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = ({ currentMonth, setCurrentMonth, selectedDate, events, handleDateClick }) => {
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
  };

  const calendarDates = generateCalendarDates();
  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
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
  );
};

export default CalendarView;