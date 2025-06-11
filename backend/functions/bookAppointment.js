const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { title, start, end, email } = JSON.parse(event.body);
    if (!title || !start || !end || !email) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Missing required fields (title, start, end, email)' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Log the booking attempt
    console.log('Booking attempt:', { title, start, end, email });

    // Fetch current appointments from JSONBin.io
    const binResponse = await fetch('https://api.jsonbin.io/v3/b/684839328a456b7966abcf8f', {
      headers: {
        'X-Master-Key': process.env.JSONBIN_API_KEY,
      },
    });
    
    if (!binResponse.ok) {
      console.error('Failed to fetch bin:', await binResponse.text());
      throw new Error('Failed to fetch current appointments');
    }
    
    const binData = await binResponse.json();
    const appointments = binData.record.appointments || [];

    // Check for conflicts
    const newStart = new Date(start);
    const newEnd = new Date(end);
    const hasConflict = appointments.some(appointment => {
      const existingStart = new Date(appointment.start);
      const existingEnd = new Date(appointment.end);
      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });

    if (hasConflict) {
      return {
        statusCode: 409,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Time slot is no longer available' }),
      };
    }

    // Add new appointment with additional metadata
    const newAppointment = {
      title,
      start,
      end,
      email,
      bookedAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    appointments.push(newAppointment);

    // Update JSONBin.io
    const updateResponse = await fetch('https://api.jsonbin.io/v3/b/684839328a456b7966abcf8f', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': process.env.JSONBIN_API_KEY,
      },
      body: JSON.stringify({ appointments }),
    });
    
    if (!updateResponse.ok) {
      console.error('Failed to update bin:', await updateResponse.text());
      throw new Error('Failed to save appointment');
    }

    console.log('Appointment booked successfully:', newAppointment);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        message: 'Appointment booked successfully',
        appointment: newAppointment
      }),
    };
  } catch (error) {
    console.error('Error booking appointment:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        error: 'Internal server error. Please try again later.',
        details: error.message
      }),
    };
  }
};