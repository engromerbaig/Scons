exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { title, start, end } = JSON.parse(event.body);
    if (!title || !start || !end) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Log the booked appointment to console
    console.log('Booked Appointment:', { title, start, end });

    // In-memory store (for demo purposes; use a database in production)
    const appointments = require('./appointments-store.json');
    appointments.push({ title, start, end });

    // Simulate saving to a persistent store
    // In production, write to a database like FaunaDB or MongoDB Atlas
    require('fs').writeFileSync('./appointments-store.json', JSON.stringify(appointments));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Appointment booked successfully' }),
    };
  } catch (error) {
    console.error('Error booking appointment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};