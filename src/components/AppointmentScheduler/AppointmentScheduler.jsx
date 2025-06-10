import React, { useState } from 'react';
import moment from 'moment';
import MeetingInfo from './MeetingInfo';
import CalendarView from './CalendarView';
import TimeSlots from './TimeSlots';
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

  return (
    <div className={`min-h-screen ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
      <div className="p-0">
        <div className="grid grid-cols-12 gap-8 h-full">
          <MeetingInfo meetingInfo={meetingInfo} selectedDate={selectedDate} />
          <CalendarView
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
            events={events}
            handleDateClick={handleDateClick}
          />
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
  );
};

export default AppointmentScheduler;