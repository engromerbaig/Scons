import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CgArrowLongLeft } from 'react-icons/cg';
import { getHolidays, getFlagGradient } from './holidays';

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const CalendarView = ({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  events,
  handleDateClick,
  getBaseTimeSlots,
  isWithinNext90Days,
  onBack,
}) => {
  const holidays = getHolidays(moment().year());

  const getPriorityHoliday = (date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    const matchingHolidays = holidays.filter((h) => h.date === dateStr);

    if (matchingHolidays.length === 0) return null;
    const independenceDay = matchingHolidays.find((h) => h.isIndependence);
    if (independenceDay) return independenceDay;
    const islamicHoliday = matchingHolidays.find(
      (h) => h.isIslamic && h.country === 'Pakistan'
    );
    if (islamicHoliday) return islamicHoliday;
    const priorityOrder = ['USA', 'UK', 'Australia', 'Germany', 'Pakistan'];
    for (const country of priorityOrder) {
      const holiday = matchingHolidays.find((h) => h.country === country);
      if (holiday) return holiday;
    }
    return matchingHolidays[0];
  };

  const generateCalendarDates = () => {
    const startOfMonth = moment(currentMonth).startOf('month');
    const endOfMonth = moment(currentMonth).endOf('month');
    const dates = [];
    const leadingNulls = (startOfMonth.day() + 6) % 7;
    for (let i = 0; i < leadingNulls; i++) {
      dates.push(null);
    }
    const current = moment(startOfMonth);
    while (current.isSameOrBefore(endOfMonth)) {
      dates.push(current.toDate());
      current.add(1, 'day');
    }
    const trailingNulls = (7 - (dates.length % 7)) % 7;
    for (let i = 0; i < trailingNulls; i++) {
      dates.push(null);
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

  const isHoliday = (date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    return holidays.some((h) => h.date === dateStr);
  };

  const isFullyUnavailable = (date) => {
    const daySlots = getBaseTimeSlots(date);
    if (!daySlots.length) return false;
    const now = moment().tz('Asia/Karachi');
    return daySlots.every((slot) => {
      const [hour] = slot.pktTime.split(':');
      const slotStart = moment(date)
        .tz('Asia/Karachi')
        .set({ hour: parseInt(hour), minute: 0 })
        .toDate();
      const slotEnd = moment(slotStart).add(1, 'hour').toDate();
      const isBooked = events.some(
        (event) =>
          moment(slotStart).isBetween(event.start, event.end, null, '[)') ||
          moment(event.start).isBetween(slotStart, slotEnd, null, '[)')
      );
      const isTooClose = moment(slotStart).tz('Asia/Karachi').diff(now, 'hours', true) < 1;
      return isBooked || isTooClose;
    });
  };

  const isCurrentMonthInPast = () => {
    return moment(currentMonth).isBefore(moment(), 'month');
  };

  const hasAvailableDays = (monthDate) => {
    const startOfMonth = moment(monthDate).startOf('month');
    const endOfMonth = moment(monthDate).endOf('month');
    const today = moment().startOf('day');
    let current = moment.max(startOfMonth, today);
    while (current.isSameOrBefore(endOfMonth)) {
      const currentDate = current.toDate();
      const day = current.day();
      const isWeekendDay = day === 0 || day === 6;
      const isHolidayDate = isHoliday(currentDate);
      const withinRange = isWithinNext90Days(currentDate);
      if (!isWeekendDay && !isHolidayDate && withinRange) {
        return true;
      }
      current.add(1, 'day');
    }
    return false;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (isCurrentMonthInPast()) return;
      const prevMonth = moment(currentMonth).subtract(1, 'month').toDate();
      if (!hasAvailableDays(prevMonth)) return;
      setCurrentMonth(prevMonth);
    } else {
      const nextMonth = moment(currentMonth).add(1, 'month').toDate();
      if (!hasAvailableDays(nextMonth)) return;
      setCurrentMonth(nextMonth);
    }
  };

  const isPrevDisabled = () => {
    if (isCurrentMonthInPast()) return true;
    const prevMonth = moment(currentMonth).subtract(1, 'month').toDate();
    return !hasAvailableDays(prevMonth);
  };

  const isNextDisabled = () => {
    const nextMonth = moment(currentMonth).add(1, 'month').toDate();
    return !hasAvailableDays(nextMonth);
  };

  const calendarDates = generateCalendarDates();
  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="col-span-12 lg:col-span-6 h-full">
      <div className="bg-white rounded-lg lg:shadow-sm lg:border p-6 h-full relative overflow-hidden">
        {/* Ribbon for lg and above */}
<div className="hidden lg:flex absolute top-0 right-0 w-[145px] rotate-45 translate-x-[30px] translate-y-[30px] bg-neon text-black text-center text-10px font-semibold py-1  shadow-md z-10 items-center justify-center">
  Powered by Scons Tech
</div>

        {/* Header with Back Arrow and Title */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <button
              onClick={onBack}
              className="lg:hidden p-2 hover:bg-neon/20 rounded-full transition-colors"
              aria-label="Go back"
            >
              <CgArrowLongLeft size={20} className="text-neon" />
            </button>
            <h2 className="text-lg xl:text-xl font-semibold text-gray-900">
              Select a Date
            </h2>
          </div>
        </div>
        <div className="mb-4 text-xs text-gray-500 text-start">
          <p>Available for next 90 days • Holidays and weekends excluded</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className={`p-2 hover:bg-neon/20 rounded-full transition-colors ${
              isPrevDisabled() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isPrevDisabled()}
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-800">
            {moment(currentMonth).format('MMMM YYYY')}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className={`p-2 hover:bg-neon/20 rounded-full transition-colors ${
              isNextDisabled() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isNextDisabled()}
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="calendar-grid">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center py-2 text-sm font-medium text-gray-500"
              >
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
              const fullyUnavailable = isFullyUnavailable(date);
              const outside90Days = !isWithinNext90Days(date);
              const unavailable =
                pastDate || weekend || holiday || fullyUnavailable || outside90Days;
              const isSelected =
                selectedDate && moment(date).isSame(selectedDate, 'day');
              const priorityHoliday = getPriorityHoliday(date);

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
                      ${
                        isSelected
                          ? 'bg-black text-white'
                          : unavailable
                          ? 'text-gray-300'
                          : outside90Days
                          ? 'text-gray-400 opacity-50'
                          : 'text-neon bg-neon/10 hover:bg-neon/20 hover:text-neon'
                      }
                    `}
                    style={{
                      ...(holiday &&
                      priorityHoliday &&
                      !isSelected &&
                      !unavailable
                        ? {
                            background: getFlagGradient(priorityHoliday.country),
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                          }
                        : {}),
                    }}
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