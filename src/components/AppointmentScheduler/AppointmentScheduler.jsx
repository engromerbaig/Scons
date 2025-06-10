import React, { useState, useEffect } from 'react';
import moment from 'moment';
import MeetingInfo from './MeetingInfo';
import CalendarView from './CalendarView';
import TimeSlots from './TimeSlots';
import { theme } from '../../theme';

const AppointmentScheduler = () => {
  const [events, setEvents] = useState([]);
  // Initialize selectedDate with the first valid weekday (non-holiday, non-past)
  const getDefaultDate = () => {
    let date = moment().startOf('day');
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
    while (
      date.day() === 0 ||
      date.day() === 6 ||
      date.isBefore(moment(), 'day') ||
      holidays.includes(date.format('YYYY-MM-DD'))
    ) {
      date = date.add(1, 'day');
    }
    return date.toDate();
  };
  const [selectedDate, setSelectedDate] = useState(getDefaultDate());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Meeting configuration
  const meetingInfo = {
    title: "Free Meeting",
    duration: "30 mins - 1 hour",
    type: "Google Meet",
    description: "A brief meeting to discuss your needs and how we can help."
  };

  // Available time slots for each day
  const availableTimeSlots = [
    { time: '11:00 AM - 12:00 PM', value: '11:00' },
    { time: '2:00 PM - 3:00 PM', value: '14:00' },
    { time: '5:00 PM - 6:00 PM', value: '17:00' },
    { time: '8:00 PM - 9:00 PM', value: '20:00' }
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
    const holidays = [
      '2025-01-01',
      '2025-01-20',
      '2025-02-17',
      '2025-05-26',
      '2025-06-19',
      '2025-07-04',
      '2025-09-01',
      '2025-10-13',
      '2025-11-11',
      '2025-11-27',
      '2025-12-25',
      '2025-04-18',
      '2025-04-21',
      '2025-05-05',
      '2025-08-25',
      '2025-12-26',
      '2025-05-01',
      '2025-05-29',
      '2025-06-09',
      '2025-10-03',
    ];
    
    if (
      day === 0 ||
      day === 6 ||
      selectedDay.isBefore(today) ||
      holidays.includes(selectedDay.format('YYYY-MM-DD'))
    ) {
      return; // Don't select weekends, past dates, or holidays
    }
    setSelectedDate(date);
  };

  const handleBookSlot = async (timeSlot) => {
    const [hour] = timeSlot.value.split(':');
    const start = moment(selectedDate).set({
      hour: parseInt(hour),
      minute: 0,
    }).toDate();
    const end = moment(start).add(1, 'hour').toDate();
    
    const title = window.prompt('Enter your name for the appointment:');
    if (title) {
      const newEvent = { 
        title: `Meeting with ${title}`, 
        start: start.toISOString(), 
        end: end.toISOString() 
      };
      console.log('Booked Appointment:', newEvent);
      
      try {
        const response = await fetch('/.netlify/functions/bookAppointment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent),
        });
        if (response.ok) {
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
          alert(`Appointment booked for ${moment(start).format('MMMM D, YYYY [at] h:mm A')}`);
        } else {
          console.error('Failed to book appointment:', await response.text());
          alert('Failed to book appointment. Please try again.');
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;