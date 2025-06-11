const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const moment = require('moment');
require('moment-timezone');
const dotenv = require('dotenv');

dotenv.config();

// Validate environment variables
const requiredEnvVars = ['REACT_APP_EMAIL_USER', 'REACT_APP_EMAIL_PASS', 'REACT_APP_COMPANY_EMAIL', 'JSONBIN_API_KEY'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing environment variables:', missingEnvVars);
  throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,
    pass: process.env.REACT_APP_EMAIL_PASS,
  },
});

// Email templates
const userEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @font-face {
            font-family: 'manrope';
            src: url('https://lucent-mandazi-5f971b.netlify.app/manrope/Manrope-Regular.ttf') format('ttf');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }
        body {
            font-family: 'manrope', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: transparent;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            position: relative;
        }
        .logo {
            position: absolute;
            top: 20px;
            left: 20px;
        }
        .main-content {
            text-align: center;
            padding: 20px;
        }
        .footer {
            background-color: #00c5ff;
            text-align: center;
            padding: 20px 0;
        }
        .social-icons img {
            margin: 0 10px;
            width: 25px;
        }
        .footer-bottom {
            background-color: #ffffff;
            text-align: center;
            font-size: 12px;
            color: #888;
        }
        .footer-bottom a {
            color: #888;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <table class="email-container" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
        <tr>
            <td>
                <div class="header">
                    <div style="table-responsive">
                        <a href="https://sconstech.com/" class="logo">
                            <img src="https://lustrous-sundae-be0a50.netlify.app/logo.png" alt="Scons Logo" style="width: 150px;">
                        </a>
                    </div>
                    <div style="margin-top: 40px; margin-bottom: 40px; padding: 40px 0;">
                        <h1 style="font-family: 'manrope', Arial, sans-serif; font-size: 24px; color: #333; margin: 0;">Your Meeting is Confirmed!</h1>
                        <p style="font-size: 16px; color: #333; font-weight: 600; margin: 10px 0;">Thank you, {{name}}, for scheduling a meeting with us.</p>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="main-content">
                    <p style="font-size: 14px; color: #000; font-weight: bold; line-height: 1.8;">
                        Your meeting details:<br>
                        {{meetingDetails}}
                        <br>
                        Join the meeting using this link:<br>
                        <a href="https://meet.google.com/ygz-ypbt-dja" style="color: #00c5ff; text-decoration: underline;">Google Meet Link</a>
                    </p>
                    <a href="https://sconstech.com/">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/logo.png" alt="Scons Logo" style="width: 150px;">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer">
                    <a href="https://www.facebook.com/sconstech/" aria-label="Facebook" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/facebook.png" alt="Facebook" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.linkedin.com/company/sconstech/" aria-label="LinkedIn" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/linkedin.png" alt="LinkedIn" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.instagram.com/sconstech/" aria-label="Instagram" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/instagram.png" alt="Instagram" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://x.com/sconstech" aria-label="X" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/twitter.png" alt="X" style="width: 30px; height: 30px;">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer-bottom" style="background-color: #ffffff; font-size: 12px; color: #888; padding: 10px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                        <tr>
                            <td style="text-align: left; vertical-align: middle;">
                                <span>Copyright © 2025 <strong>Scons.</strong> All rights reserved.</span>
                            </td>
                            <td style="text-align: right; vertical-align: middle;">
                                <a href="https://sconstech.com/terms-and-conditions/" style="color: #888; text-decoration: none; font-weight: 600;">
                                    Terms & Conditions
                                </a>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
`;

const companyEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @font-face {
            font-family: 'manrope';
            src: url('https://lucent-mandazi-5f971b.netlify.app/manrope/Manrope-Regular.ttf') format('ttf');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }
        body {
            font-family: 'manrope', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: transparent;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background-color: #f4f4f4;
            text-align: center;
            padding: 50px 0 20px 0;
            color: #333;
        }
        .data-fields {
            padding: 20px;
            text-align: left;
            background: #f4f4f4;
        }
        .main-content {
            text-align: center;
            padding: 20px;
        }
        .footer {
            background-color: #00c5ff;
            text-align: center;
            padding: 20px 0;
        }
        .social-icons {
            margin: 0 10px;
            width: 30px;
            height: 30px;
        }
        .footer-bottom {
            background-color: #ffffff;
            text-align: center;
            font-size: 12px;
            color: #888;
            padding: 10px 0;
        }
        .footer-bottom a {
            color: #888;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <table class="email-container" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
        <tr>
            <td class="header">
                <h1 style="font-size: 24px; background: #00c5ff; padding: 15px 0; margin: 0 0 10px 0;">New Meeting Booking</h1>
                <p style="font-size: 14px; font-weight: bold; color: #555; margin-top: 30px;">{{dateTime}}</p>
            </td>
        </tr>
        <tr>
            <td class="data-fields">
                {{meetingDetails}}
            </td>
        </tr>
        <tr>
            <td>
                <div class="main-content">
                    <p style="font-size: 14px; color: #000; font-weight: 600; line-height: 1.8;">
                        A new meeting has been scheduled. Please review the details above and prepare for the meeting.
                    </p>
                    <a href="https://sconstech.com/">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/logo.png" alt="Scons Logo" style="width: 150px;">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer">
                    <a href="https://www.facebook.com/sconstech/" aria-label="Facebook" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/facebook.png" alt="Facebook" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.linkedin.com/company/sconstech/" aria-label="LinkedIn" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/linkedin.png" alt="LinkedIn" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.instagram.com/sconstech/" aria-label="Instagram" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/instagram.png" alt="Instagram" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://x.com/sconstech" aria-label="X" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/twitter.png" alt="X" style="width: 30px; height: 30px;">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer-bottom" style="background-color: #ffffff; font-size: 12px; color: #888; padding: 10px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                        <tr>
                            <td style="text-align: left; vertical-align: middle;">
                                <span>Copyright © 2025 <strong>Scons.</strong> All rights reserved.</span>
                            </td>
                            <td style="text-align: right; vertical-align: middle;">
                                <a href="https://sconstech.com/terms-and-conditions/" style="color: #888; text-decoration: none; font-weight: 600;">
                                    Terms & Conditions
                                </a>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
`;

function formatDate(userTimeZone) {
  const timeZone = userTimeZone || 'Asia/Karachi'; // Fallback to PKT
  return moment()
    .tz(timeZone)
    .format('DD MMM YYYY - h:mm A [ZZ]');
}

function formatMeetingDateTime(start, userTimeZone) {
  const startMoment = moment(start).tz('Asia/Karachi'); // Booking time in PKT
  const pktTime = startMoment.format('dddd, MMMM D, YYYY, h:mm A [PKT]');
  const localTime = startMoment
    .clone()
    .tz(userTimeZone || 'Asia/Karachi')
    .format('dddd, MMMM D, YYYY, h:mm A [ZZ]');
  return `${pktTime}<br>(${localTime})`;
}

function generateFieldHtml(label, value) {
  if (!value) return '';
  return `<div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">${label}:</strong> ${value}</div>`;
}

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
    const { title, start, end, email, userTimeZone } = JSON.parse(event.body);
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
    console.log('Booking attempt:', { title, start, end, email, userTimeZone });

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
    const hasConflict = appointments.some((appointment) => {
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
      userTimeZone: userTimeZone || 'Asia/Karachi',
      bookedAt: new Date().toISOString(),
      status: 'confirmed',
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

    // Extract name from title
    const name = title.replace('Meeting with ', '').trim();
    const dateTime = formatDate(userTimeZone);
    const meetingTime = formatMeetingDateTime(start, userTimeZone);

    // Generate meeting details for emails
    const meetingDetails = `
      ${generateFieldHtml('Name', name)}
      ${generateFieldHtml('Email', email)}
      ${generateFieldHtml('Meeting Time', meetingTime)}
    `.trim();

    // Replace placeholders in templates
    const userEmailHtml = userEmailTemplate
      .replace('{{name}}', name)
      .replace('{{meetingDetails}}', meetingDetails);

    const companyEmailHtml = companyEmailTemplate
      .replace('{{dateTime}}', dateTime)
      .replace('{{meetingDetails}}', meetingDetails);

    // Email to the company
    const mailToCompany = {
      from: process.env.REACT_APP_EMAIL_USER,
      to: process.env.REACT_APP_COMPANY_EMAIL,
      subject: `New Meeting Booking from ${name}`,
      html: companyEmailHtml,
    };

    // Email to the user
    const mailToUser = {
      from: process.env.REACT_APP_EMAIL_USER,
      to: email,
      subject: 'Your Meeting with Scons is Confirmed!',
      html: userEmailHtml,
    };

    // Send both emails concurrently with a delay
    await Promise.all([
      transporter.sendMail(mailToCompany),
      new Promise((resolve) => setTimeout(resolve, 1000)),
      transporter.sendMail(mailToUser),
    ]);

    console.log('Appointment booked and emails sent successfully:', newAppointment);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        message: 'Appointment booked successfully and emails sent',
        appointment: newAppointment,
      }),
    };
  } catch (error) {
    console.error('Error booking appointment or sending emails:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        error: 'Internal server error. Please try again later.',
        details: error.message,
      }),
    };
  }
};