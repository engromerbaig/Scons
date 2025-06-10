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
    const { title, start, end } = JSON.parse(event.body);
    if (!title || !start || !end) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Log the booked appointment
    console.log('Booked Appointment:', { title, start, end });

    // Fetch current appointments from JSONBin.io
    const binResponse = await fetch('https://api.jsonbin.io/v3/b/684839328a456b7966abcf8f', {
      headers: {
        'X-Master-Key': process.env.JSONBIN_API_KEY,
      },
    });
    if (!binResponse.ok) throw new Error('Failed to fetch bin');
    const binData = await binResponse.json();
    const appointments = binData.record.appointments || [];

    // Add new appointment
    appointments.push({ title, start, end });

    // Update JSONBin.io
    const updateResponse = await fetch('https://api.jsonbin.io/v3/b/684839328a456b7966abcf8f', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': process.env.JSONBIN_API_KEY,
      },
      body: JSON.stringify({ appointments }),
    });
    if (!updateResponse.ok) throw new Error('Failed to update bin');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: 'Appointment booked successfully' }),
    };
  } catch (error) {
    console.error('Error booking appointment:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};