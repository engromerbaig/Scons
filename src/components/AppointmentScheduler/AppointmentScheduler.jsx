import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import MeetingInfo from './MeetingInfo';
import CalendarView from './CalendarView';
import TimeSlots from './TimeSlots';
import BookingConfirmation from './BookingConfirmation';
import { theme } from '../../theme';
import { getHolidays } from './holidays';
import ogLogo from '../../assets/images/og-default.jpg'; // Same OG image as packages
import schema from '../../utilities/schema'; // Use same schema or create a new one if needed
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO

const AppointmentScheduler = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [confirmationData, setConfirmationData] = useState(null);
  const [userTimeZone, setUserTimeZone] = useState(null);
  const [baseTimeSlots, setBaseTimeSlots] = useState([]);
  const [groupedTimeSlots, setGroupedTimeSlots] = useState({});
  const [step, setStep] = useState(1); // 1: MeetingInfo, 2: CalendarView, 3: TimeSlots

  // Scroll to top when step or confirmationData changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, confirmationData]); // Trigger on step or confirmationData change

  // Meeting configuration
  const meetingInfo = {
    title: 'Free Consultation',
    duration: '30 mins - 1 hour',
    type: 'Google Meet',
    description:
      'Schedule a free consultation to discuss your website, app, or digital project. We’ll explore your goals and offer expert solutions tailored to your business needs.',
    timeZone: userTimeZone,
  };

//   meta text
const metaDescription =
    'Book a free consultation with Scons Tech to discuss your web, app, or digital project goals. We provide tailored expert advice to help your business grow.';
  const keywords = [
    'Scons Tech',
    'schedule a meeting',
    'free consultation',
    'web development meeting',
    'book appointment',
    'digital consultation',
    'UK software services'
  ].join(', ');


  // Define time slots in PKT
  const getBaseTimeSlots = (date) => {
    const day = moment(date).day();
    if (day === 1 || day === 3 || day === 4) {
      return [
  { time: '7:00 AM', value: '07:00', pktTime: '7:00' },     // Australia
  { time: '2:00 PM', value: '14:00', pktTime: '14:00' },    // UK
  { time: '8:00 PM', value: '20:00', pktTime: '20:00' },    // USA East
  { time: '11:00 PM', value: '23:00', pktTime: '23:00' }    // USA West
];
    } else if (day === 2 || day === 5) {
      return [
       { time: '11:00 AM', value: '11:00', pktTime: '11:00' }, // 🌏 Australia/New Zealand
{ time: '1:00 PM', value: '13:00', pktTime: '13:00' }  // 🌍 UK / Europe / UAE (not USA)

      ];
    }
    return [];
  };

  // Check if a date is within the next 90 days
  const isWithinNext90Days = (date) => {
    const today = moment().startOf('day');
    const targetDate = moment(date).startOf('day');
    const daysDiff = targetDate.diff(today, 'days');
    return daysDiff >= 0 && daysDiff <= 90;
  };

  // Initialize selectedDate with the first valid weekday
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
      if (date.diff(moment(), 'days') > 100) break;
    }
    return date.toDate();
  }

  // Enhanced GMT-based time zone detection
  const getLocalTimeZone = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      const offset = new Date().getTimezoneOffset();
      const hours = Math.abs(Math.floor(offset / 60));
      const minutes = Math.abs(offset % 60);
      const sign = offset <= 0 ? '+' : '-';
      return `GMT${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  };

  // Convert PKT to GMT manually (PKT is UTC+5)
  const convertPKTToGMT = (pktDateTimeString) => {
    const pktDateTime = new Date(pktDateTimeString + '+05:00');
    return new Date(pktDateTime.getTime() - 5 * 60 * 60 * 1000);
  };

  // Convert GMT to local timezone
  const convertGMTToLocal = (gmtDateTime) => {
    const localOffset = new Date().getTimezoneOffset() * 60 * 1000;
    return new Date(gmtDateTime.getTime() - localOffset);
  };

  // Fetch user's time zone
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
    // setSelectedDate(defaultDate);
    setBaseTimeSlots(getBaseTimeSlots(defaultDate));
  }, []);

  // Generate time slots only for the selected date
  const generateGroupedTimeSlots = (centerDate) => {
    if (!centerDate) return {};

    const grouped = {};
    const selectedDateStr = moment(centerDate).format('YYYY-MM-DD');
    const daySlots = getBaseTimeSlots(centerDate);

    if (daySlots.length > 0) {
      daySlots.forEach((slot) => {
        let localTime, localDate, timeZoneAbbr;

        try {
          const pktTime = moment.tz(
            `${selectedDateStr} ${slot.pktTime}`,
            'YYYY-MM-DD HH:mm',
            'Asia/Karachi'
          );
          localTime = pktTime.clone().tz(userTimeZone);
          localDate = localTime.format('YYYY-MM-DD');
          timeZoneAbbr = localTime.zoneAbbr() || userTimeZone;
        } catch (error) {
          console.warn('Falling back to GMT conversion:', error);
          try {
            const pktDateTime = convertPKTToGMT(
              `${selectedDateStr}T${slot.pktTime}:00`
            );
            const localDateTime = convertGMTToLocal(pktDateTime);
            localTime = moment(localDateTime);
            localDate = localTime.format('YYYY-MM-DD');
            timeZoneAbbr = 'GMT';
          } catch (fallbackError) {
            console.error('GMT fallback failed:', fallbackError);
            localTime = moment(`${selectedDateStr} ${slot.pktTime}`, 'YYYY-MM-DD HH:mm');
            localDate = selectedDateStr;
            timeZoneAbbr = 'GMT';
          }
        }

        const convertedSlot = {
          ...slot,
          time: localTime.format('h:mm A'),
          value: localTime.format('HH:mm'),
          timeZone: timeZoneAbbr,
          localDate,
          originalDate: selectedDateStr,
          originalDateObj: centerDate,
          dateCrossed: localDate !== selectedDateStr,
        };

        if (!grouped[localDate]) {
          grouped[localDate] = [];
        }
        grouped[localDate].push(convertedSlot);
      });
    }

    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => moment(a.value, 'HH:mm').diff(moment(b.value, 'HH:mm')));
    });

    return grouped;
  };

  // Update grouped time slots when selectedDate or userTimeZone changes
  useEffect(() => {
    if (selectedDate) {
      const grouped = generateGroupedTimeSlots(selectedDate);
      setGroupedTimeSlots(grouped);
    }
  }, [selectedDate, userTimeZone]);

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

    if (
      day === 0 ||
      day === 6 ||
      selectedDay.isBefore(today) ||
      !isWithinNext90Days(date)
    ) {
      return;
    }
    setSelectedDate(date);
    setStep(3); // Move to TimeSlots step
    setConfirmationData(null);
  };

  const handleBookSlot = async (timeSlot, formData) => {
    const [hour] = timeSlot.pktTime.split(':');
    const start = moment(timeSlot.originalDateObj)
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
        setEvents(
          updatedEvents.map((event) => ({
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
        );
        setSelectedDate(null);
        setStep(1); // Reset to MeetingInfo after booking
        return { success: true, appointment: newEvent };
      } else {
        console.error('Failed to book appointment:', result.error);
        return {
          success: false,
          error: result.error || 'Failed to book appointment. Please try again.',
        };
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
    setStep(1); // Return to MeetingInfo
  };

  const handleBookAnother = () => {
    setConfirmationData(null);
    setStep(1); // Reset to MeetingInfo for booking another appointment
  };

  // Handler for "Schedule Meeting" button
  const handleNextStep = () => {
    setStep(2); // Move to CalendarView
  };

  // Handler for back navigation
  const handleBack = () => {
    if (step === 3) {
      setStep(2); // Back to CalendarView
    } else if (step === 2) {
      setStep(1); // Back to MeetingInfo
    }
  };

  if (confirmationData) {
    return (
      <BookingConfirmation
        slot={confirmationData.slot}
        bookingResult={confirmationData.bookingResult}
        onClose={handleCloseConfirmation}
        onBookAnother={handleBookAnother}
      />
    );
  }

  return (
    <div
      className={`min-h-screen ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontalCalendar}`}
    >

        <Helmet>
  <title>Schedule a Meeting | Scons Tech</title>
  <meta name="description" content={metaDescription} />
  <meta name="keywords" content={keywords} />
  <link rel="canonical" href="https://sconstech.com/schedule-a-meeting" />

  {/* Open Graph */}
  <meta property="og:title" content="Schedule a Meeting | Scons Tech" />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sconstech.com/schedule-a-meeting" />
  <meta property="og:image" content={ogLogo} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Scons logo" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Schedule a Meeting | Scons Tech" />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={ogLogo} />

  {/* Structured Data */}
           <script type="application/ld+json">{schema}</script>

</Helmet>


      {/* Large screens (lg and above): Side-by-side grid */}
      <div className="hidden lg:grid grid-cols-12 gap-x-8 gap-y-6 min-h-full items-stretch">
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
            groupedTimeSlots={groupedTimeSlots}
            events={events}
            handleBookSlot={handleBookSlot}
            onShowConfirmation={handleShowConfirmation}
          />
        </div>
      </div>

      {/* Small screens (below lg): Step-by-step flow */}
      <div className="lg:hidden">
        {step === 1 && (
          <MeetingInfo
            meetingInfo={meetingInfo}
            selectedDate={selectedDate}
            onNext={handleNextStep}
          />
        )}
        {step === 2 && (
          <CalendarView
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
            events={events}
            handleDateClick={handleDateClick}
            getBaseTimeSlots={getBaseTimeSlots}
            isWithinNext90Days={isWithinNext90Days}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <TimeSlots
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            groupedTimeSlots={groupedTimeSlots}
            events={events}
            handleBookSlot={handleBookSlot}
            onShowConfirmation={handleShowConfirmation}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentScheduler;