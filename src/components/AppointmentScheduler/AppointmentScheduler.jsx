import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import MeetingInfo from './MeetingInfo';
import CalendarView from './CalendarView';
import TimeSlots from './TimeSlots';
import BookingConfirmation from './BookingConfirmation';
import { theme } from '../../theme';
import { getHolidays } from './holidays';

const AppointmentScheduler = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [confirmationData, setConfirmationData] = useState(null);
  const [userTimeZone, setUserTimeZone] = useState('GMT'); // Default to GMT
  const [baseTimeSlots, setBaseTimeSlots] = useState([]);

  // Meeting configuration
  const meetingInfo = {
    title: 'Free Meeting',
    duration: '30 mins - 1 hour',
    type: 'Google Meet',
    description: 'A brief meeting to discuss your needs and how we can help.',
    timeZone: userTimeZone,
  };

  // Define time slots in PKT
  const getBaseTimeSlots = (date) => {
    const day = moment(date).day();
    if (day === 1 || day === 4) {
      // Monday or Thursday: 10 AM, 12 PM, 2 PM, 4 PM PKT
      return [
        { time: '2:00 AM', value: '2:00', pktTime: '2:00' },
        { time: '12:00 PM', value: '12:00', pktTime: '12:00' },
        { time: '2:00 PM', value: '14:00', pktTime: '14:00' },
        { time: '4:00 PM', value: '16:00', pktTime: '16:00' },
      ];
    } else if (day === 2 || day === 3 || day === 5) {
      // Tuesday, Wednesday, Friday: 11 AM, 1 PM PKT
      return [
        { time: '11:00 AM', value: '11:00', pktTime: '11:00' },
        { time: '1:00 PM', value: '13:00', pktTime: '13:00' },
      ];
    }
    return []; // No slots for weekends
  };

  // Check if a date is within the next 90 days
  const isWithinNext90Days = (date) => {
    const today = moment().startOf('day');
    const targetDate = moment(date).startOf('day');
    const daysDiff = targetDate.diff(today, 'days');
    return daysDiff >= 0 && daysDiff <= 90;
  };

  // Initialize selectedDate with the first valid weekday (non-holiday, non-past, within 90 days)
  function getDefaultDate() {
    let date = moment().startOf('day');
    const holidays = getHolidays(moment().year());
    while (
      date.day() === 0 ||
      date.day() === 6 ||
      date.isBefore(moment(), 'day') ||
      !isWithinNext90Days(date.toDate()) ||
      holidays.some((h) => h.date === date.format('YYYY-MM-DD'))
    ) {
      date = date.add(1, 'day');
      // Prevent infinite loop
      if (date.diff(moment(), 'days') > 100) break;
    }
    return date.toDate();
  }

  // Enhanced GMT-based time zone detection with PKT to GMT conversion
  const getLocalTimeZone = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      // Fallback to GMT offset calculation
      const offset = new Date().getTimezoneOffset();
      const hours = Math.abs(Math.floor(offset / 60));
      const minutes = Math.abs(offset % 60);
      const sign = offset <= 0 ? '+' : '-';
      return `GMT${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  };

  // Convert PKT to GMT manually (PKT is UTC+5)
  const convertPKTToGMT = (pktDateTimeString) => {
    const pktDateTime = new Date(pktDateTimeString + '+05:00'); // PKT is UTC+5
    return new Date(pktDateTime.getTime() - (5 * 60 * 60 * 1000)); // Convert to GMT
  };

  // Convert GMT to local timezone
  const convertGMTToLocal = (gmtDateTime) => {
    const localOffset = new Date().getTimezoneOffset() * 60 * 1000; // Local offset in ms
    return new Date(gmtDateTime.getTime() - localOffset);
  };

  // Fetch user's time zone with fallback to GMT
  useEffect(() => {
    const fetchTimeZone = async () => {
      try {
        const response = await fetch(
          'https://api.ipgeolocation.io/timezone?apiKey=63dedc3a703f4b4993363b7d8f922401'
        );
        if (!response.ok) throw new Error('Failed to fetch time zone');
        const data = await response.json();
        setUserTimeZone(data.timezone || getLocalTimeZone());
      } catch (error) {
        console.error('Error fetching time zone:', error);
        setUserTimeZone(getLocalTimeZone());
      }
    };
    fetchTimeZone();
  }, []);

  // Set default date and initial time slots
  useEffect(() => {
    const defaultDate = getDefaultDate();
    setSelectedDate(defaultDate);
    setBaseTimeSlots(getBaseTimeSlots(defaultDate));
  }, []);

  // Update time slots when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setBaseTimeSlots(getBaseTimeSlots(selectedDate));
    }
  }, [selectedDate]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/.netlify/functions/getAppointments');
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setEvents(
          data.map((event) => ({
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
        );
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDateClick = (date) => {
    const day = date.getDay();
    const today = moment().startOf('day');
    const selectedDay = moment(date).startOf('day');

    if (day === 0 || day === 6 || selectedDay.isBefore(today) || !isWithinNext90Days(date)) {
      return;
    }
    setSelectedDate(date);
    setConfirmationData(null);
  };

  const handleBookSlot = async (timeSlot, formData) => {
    const [hour] = timeSlot.pktTime.split(':'); // Use PKT time for booking
    const start = moment(selectedDate)
      .tz('Asia/Karachi')
      .set({
        hour: parseInt(hour),
        minute: 0,
      })
      .toDate();
    const end = moment(start).add(1, 'hour').toDate();

    const newEvent = {
      title: `Meeting with ${formData.name}`,
      start: start.toISOString(),
      end: end.toISOString(),
      email: formData.email,
      userTimeZone,
    };
    console.log('Booked Appointment:', newEvent);

    try {
      const response = await fetch('/.netlify/functions/bookAppointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      const result = await response.json();
      if (response.ok) {
        const fetchResponse = await fetch('/.netlify/functions/getAppointments');
        if (!fetchResponse.ok) {
          console.error('Failed to fetch appointments:', await fetchResponse.text());
          throw new Error('Failed to fetch appointments');
        }
        const updatedEvents = await fetchResponse.json();
        console.log('Updated Appointments:', updatedEvents);
        setEvents(
          updatedEvents.map((event) => ({
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
        );
        setSelectedDate(null);
        return { success: true, appointment: newEvent };
      } else {
        console.error('Failed to book appointment:', result.error);
        return { success: false, error: result.error || 'Failed to book appointment. Please try again.' };
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      return { success: false, error: 'An error occurred. Please try again.' };
    }
  };

  const handleShowConfirmation = (slot, bookingResult) => {
    setConfirmationData({ slot, bookingResult });
  };

  const handleCloseConfirmation = () => {
    setConfirmationData(null);
  };

  // Convert time slots to user's time zone with proper date handling
  const convertedTimeSlots = baseTimeSlots.map((slot) => {
    const selectedDateStr = moment(selectedDate || new Date()).format('YYYY-MM-DD');
    let localTime, localDate, timeZoneAbbr;

    try {
      // Primary conversion using moment-timezone
      const pktTime = moment.tz(`${selectedDateStr} ${slot.pktTime}`, 'YYYY-MM-DD HH:mm', 'Asia/Karachi');
      localTime = pktTime.clone().tz(userTimeZone);
      localDate = localTime.format('YYYY-MM-DD');
      timeZoneAbbr = localTime.zoneAbbr() || userTimeZone;
    } catch (error) {
      // Manual GMT-based fallback
      console.warn('Falling back to GMT conversion:', error);
      try {
        const pktDateTime = convertPKTToGMT(`${selectedDateStr}T${slot.pktTime}:00`);
        const localDateTime = convertGMTToLocal(pktDateTime);
        localTime = moment(localDateTime);
        localDate = localTime.format('YYYY-MM-DD');
        timeZoneAbbr = 'GMT';
      } catch (fallbackError) {
        console.error('GMT fallback failed:', fallbackError);
        // Final fallback - use selected date
        localTime = moment(`${selectedDateStr} ${slot.pktTime}`, 'YYYY-MM-DD HH:mm');
        localDate = selectedDateStr;
        timeZoneAbbr = 'GMT';
      }
    }

    return {
      ...slot,
      time: localTime.format('h:mm A'), // e.g., "10:00 AM"
      value: localTime.format('HH:mm'), // e.g., "10:00"
      timeZone: timeZoneAbbr, // e.g., "PKT", "EDT", "GMT"
      localDate, // Track date for midnight crossing
      originalDate: selectedDateStr, // Keep track of original date
      dateCrossed: localDate !== selectedDateStr, // Flag if date changed
    };
  });

  if (confirmationData) {
    return (
      <BookingConfirmation
        slot={confirmationData.slot}
        bookingResult={confirmationData.bookingResult}
        onClose={handleCloseConfirmation}
      />
    );
  }

  return (
    <div className={`min-h-screen ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
      <div className="p-0">
        <div className="grid grid-cols-12 gap-8 min-h-full items-stretch">
          <div className="col-span-12 lg:col-span-3 h-full">
            <MeetingInfo meetingInfo={meetingInfo} selectedDate={selectedDate} />
          </div>
          <div className="col-span-12 lg:col-span-6 h-full">
            <CalendarView
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              selectedDate={selectedDate}
              events={events}
              handleDateClick={handleDateClick}
              getBaseTimeSlots={getBaseTimeSlots}
              isWithinNext90Days={isWithinNext90Days}
            />
          </div>
          <div className="col-span-12 lg:col-span-3 h-full">
            <TimeSlots
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              availableTimeSlots={convertedTimeSlots}
              events={events}
              handleBookSlot={handleBookSlot}
              onShowConfirmation={handleShowConfirmation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;