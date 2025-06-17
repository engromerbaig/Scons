export const handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    // You can save this to a database, send to Mailchimp, etc.
    console.log('Email received:', email);

    // Example: store in Netlify Forms (or just log for now)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email received', email }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: err.message }),
    };
  }
};
