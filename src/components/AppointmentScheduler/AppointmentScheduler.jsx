import React, { useState, useEffect } from 'react';
import moment from 'moment';
import MeetingInfo from './MeetingInfo';
import CalendarView from './CalendarView';
import TimeSlots from './TimeSlots';
import { theme } from '../../theme';

const AppointmentScheduler = () => {
  const [events, setEvents] = useState([]);
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
    
    if (day === 0 || day === 6 || selectedDay.isBefore(today)) {
      return; // Don't select weekends or past dates
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