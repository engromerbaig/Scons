exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Load appointments from in-memory store
    // In production, fetch from a database like FaunaDB or MongoDB Atlas
    let appointments = [];
    try {
      appointments = require('./appointments-store.json');
    } catch (e) {
      // If file doesn't exist, return empty array
      appointments = [];
    }

    return {
      statusCode: 200,
      body: JSON.stringify(appointments),
    };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};