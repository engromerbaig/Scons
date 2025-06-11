import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
  const [confirmationData, setConfirmationData] = useState(null); // { slot, bookingResult }

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

  // Set default date on component mount
  useEffect(() => {
    setSelectedDate(getDefaultDate());
  }, []);

  // Meeting configuration
  const meetingInfo = {
    title: "Free Meeting",
    duration: "30 mins - 1 hour",
    type: "Google Meet",
    description: "A brief meeting to discuss your needs and how we can help."
  };

  // Available time slots for each day
  const availableTimeSlots = [
    { time: '11:00 AM', value: '11:00' },
    { time: '2:00 PM', value: '14:00' },
    { time: '4:00 PM', value: '16:00' },
    { time: '6:00 PM', value: '18:00' }
  ];

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/.netlify/functions/getAppointments');
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setEvents(data.map(event => ({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        })));
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

    // Only check for weekends and past dates, as CalendarView already handles holidays
    if (day === 0 || day === 6 || selectedDay.isBefore(today)) {
      return; // Don't select weekends or past dates
    }
    setSelectedDate(date);
    setConfirmationData(null); // Reset confirmation when selecting a new date
  };

  const handleBookSlot = async (timeSlot, formData) => {
    const [hour] = timeSlot.value.split(':');
    const start = moment(selectedDate).set({
      hour: parseInt(hour),
      minute: 0,
    }).toDate();
    const end = moment(start).add(1, 'hour').toDate();
    
    const newEvent = { 
      title: `Meeting with ${formData.name}`, 
      start: start.toISOString(), 
      end: end.toISOString(),
      email: formData.email
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
        // Fetch updated appointments
        const fetchResponse = await fetch('/.netlify/functions/getAppointments');
        if (!fetchResponse.ok) {
          console.error('Failed to fetch appointments:', await fetchResponse.text());
          throw new Error('Failed to fetch appointments');
        }
        const updatedEvents = await fetchResponse.json();
        console.log('Updated Appointments:', updatedEvents);
        setEvents(updatedEvents.map(event => ({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        })));
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

  // Render BookingConfirmation at the top level, outside the grid
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
            />
          </div>
          <div className="col-span-12 lg:col-span-3 h-full">
            <TimeSlots
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              availableTimeSlots={availableTimeSlots}
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