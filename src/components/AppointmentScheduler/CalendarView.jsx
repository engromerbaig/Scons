import React from 'react';
import moment from 'moment';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Ensure moment uses Sunday as the start of the week
moment.updateLocale('en', {
  week: {
    dow: 0, // Sunday as the first day of the week
  },
});

const CalendarView = ({ currentMonth, setCurrentMonth, selectedDate, events, handleDateClick }) => {
  const holidays = [
    // USA
    '2025-01-01', // New Year's Day
    '2025-01-20', // MLK Day
    '2025-02-17', // Presidents' Day
    '2025-05-26', // Memorial Day
    '2025-06-19', // Juneteenth
    '2025-07-04', // Independence Day
    '2025-09-01', // Labor Day
    '2025-10-13', // Columbus Day
    '2025-11-11', // Veterans Day
    '2025-11-27', // Thanksgiving
    '2025-12-25', // Christmas
    // UK
    '2025-04-18', // Good Friday
    '2025-04-21', // Easter Monday
    '2025-05-05', // Early May Bank Holiday
    '2025-08-25', // Summer Bank Holiday
    '2025-12-26', // Boxing Day
    // Germany
    '2025-05-01', // Labour Day
    '2025-05-29', // Ascension Day
    '2025-06-09', // Whit Monday
    '2025-10-03', // German Unity Day
  ];

  const generateCalendarDates = () => {
    const startOfMonth = moment(currentMonth).startOf('month');
    const endOfMonth = moment(currentMonth).endOf('month');
    const startOfCalendar = moment(startOfMonth);
    const endOfCalendar = moment(endOfMonth).endOf('week');

    const dates = [];
    const current = moment(startOfCalendar);

    while (current.isSameOrBefore(endOfCalendar)) {
      if (current.isSame(currentMonth, 'month')) {
        dates.push(moment(current).toDate());
      }
      current.add(1, 'day');
    }

    const firstDayOfMonth = moment(startOfMonth).day();
    const paddedDates = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      paddedDates.push(null);
    }
    return [...paddedDates, ...dates];
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

  const isHoliday = (date) => {
    return holidays.includes(moment(date).format('YYYY-MM-DD'));
  };

  const isCurrentMonthInPast = () => {
    const currentDate = moment();
    const currentMonthStart = moment(currentMonth).startOf('month');
    return currentMonthStart.isBefore(currentDate, 'month');
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev' && isCurrentMonthInPast()) {
      return;
    }
    if (direction === 'prev') {
      setCurrentMonth(moment(currentMonth).subtract(1, 'month').toDate());
    } else {
      setCurrentMonth(moment(currentMonth).add(1, 'month').toDate());
    }
  };

  const calendarDates = generateCalendarDates();
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="col-span-12 lg:col-span-6 h-full">
      <div className="bg-white rounded-lg shadow-sm border p-6 h-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Select a Date</h2>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${isCurrentMonthInPast() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isCurrentMonthInPast()}
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
        <div className="calendar-grid">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 rounded-lg overflow-hidden">
            {calendarDates.map((date, index) => {
              if (!date) {
                return <div key={index} className="h-16" />;
              }
              const inCurrentMonth = isDateInCurrentMonth(date);
              const todayDate = isToday(date);
              const pastDate = isPastDate(date);
              const weekend = isWeekend(date);
              const holiday = isHoliday(date);
              const unavailable = pastDate || weekend || holiday;
              const isSelected = selectedDate && moment(date).isSame(selectedDate, 'day');

              return (
                <div
                  key={index}
                  onClick={() => !unavailable && handleDateClick(date)}
                  className={`
                    relative h-16 flex items-center justify-center 
                    ${unavailable ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <span
                    className={`
                      w-10 h-10 xl:w-12 xl:h-12 p-4 flex items-center justify-center rounded-full text-sm xl:text-base font-black relative
                      ${isSelected ? 'bg-black text-white' : unavailable ? 'text-gray-300' : 'text-neon bg-neon/10 hover:bg-neon/20 hover:text-neon'}
                    `}
                  >
                    {moment(date).format('D')}
                    {todayDate && !pastDate && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-neon rounded-full"></div>
                    )}
                  </span>
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