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
  const [userTimeZone, setUserTimeZone] = useState('America/Los_Angeles'); // Default PST
  const [baseTimeSlots, setBaseTimeSlots] = useState([]);


    // Meeting configuration
  const meetingInfo = {
    title: 'Free Meeting',
    duration: '30 mins - 1 hour',
    type: 'Google Meet',
    description: 'A brief meeting to discuss your needs and how we can help.',
  };

  // Define time slots based on day of week (PST)
  const getBaseTimeSlots = (date) => {
    const day = moment(date).day();
    if (day === 1 || day === 4) {
      // Monday or Thursday: 10 AM, 12 PM, 2 PM, 4 PM PST
      return [
        { time: '10:00 AM', value: '10:00', pstTime: '10:00' },
        { time: '12:00 PM', value: '12:00', pstTime: '12:00' },
        { time: '2:00 PM', value: '14:00', pstTime: '14:00' },
        { time: '4:00 PM', value: '16:00', pstTime: '16:00' },
      ];
    } else if (day === 2 || day === 3 || day === 5) {
      // Tuesday, Wednesday, Friday: 11 AM, 1 PM PST
      return [
        { time: '11:00 AM', value: '11:00', pstTime: '11:00' },
        { time: '1:00 PM', value: '13:00', pstTime: '13:00' },
      ];
    }
    return []; // No slots for weekends
  };

  // Initialize selectedDate with the first valid weekday (non-holiday, non-past)
  function getDefaultDate() {
    let date = moment().startOf('day');
    const holidays = getHolidays(moment().year());
    while (
      date.day() === 0 ||
      date.day() === 6 ||
      date.isBefore(moment(), 'day') ||
      holidays.some((h) => h.date === date.format('YYYY-MM-DD'))
    ) {
      date = date.add(1, 'day');
    }
    return date.toDate();
  }

  // Fetch user's time zone from ipgeolocation.io
  useEffect(() => {
    const fetchTimeZone = async () => {
      try {
        const response = await fetch(
          'https://api.ipgeolocation.io/timezone?apiKey=63dedc3a703f4b4993363b7d8f922401'
        );
        if (!response.ok) throw new Error('Failed to fetch time zone');
        const data = await response.json();
        setUserTimeZone(data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);
      } catch (error) {
        console.error('Error fetching time zone:', error);
        setUserTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone); // Fallback
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

    if (day === 0 || day === 6 || selectedDay.isBefore(today)) {
      return;
    }
    setSelectedDate(date);
    setConfirmationData(null);
  };

  const handleBookSlot = async (timeSlot, formData) => {
    const [hour] = timeSlot.pstTime.split(':'); // Use PST time for booking
    const start = moment(selectedDate)
      .tz('America/Los_Angeles')
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
      userTimeZone, // Include for email updates later
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

  // Convert time slots to user's time zone
  const convertedTimeSlots = baseTimeSlots.map((slot) => {
    const today = moment(selectedDate || new Date()).format('YYYY-MM-DD');
    const pstTime = moment.tz(`${today} ${slot.pstTime}`, 'YYYY-MM-DD HH:mm', 'America/Los_Angeles');
    const localTime = pstTime.clone().tz(userTimeZone);
    return {
      ...slot,
      time: localTime.format('h:mm A'), // e.g., "10:00 AM"
      value: localTime.format('HH:mm'), // e.g., "10:00"
      timeZone: localTime.zoneAbbr(), // e.g., "EDT"
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
            <MeetingInfo meetingInfo={{ ...meetingInfo, timeZone: userTimeZone }} selectedDate={selectedDate} />
          </div>
          <div className="col-span-12 lg:col-span-6 h-full">
            <CalendarView
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              selectedDate={selectedDate}
              events={events}
              handleDateClick={handleDateClick}
              getBaseTimeSlots={getBaseTimeSlots} // Pass for fully booked check
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