// This is a Netlify Function to handle form submissions and send emails using Nodemailer.
// send-contact-emails.js
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config(); // Loads .env from same directory

// Validate environment variables
const requiredEnvVars = ['REACT_APP_EMAIL_USER', 'REACT_APP_EMAIL_PASS', 'REACT_APP_COMPANY_EMAIL'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing environment variables:', missingEnvVars);
  throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com', // or 'smtp.zoho.eu' if your domain is hosted in Europe
  port: 465,
  secure: true, // true for port 465, false for port 587
  auth: {
    user: process.env.REACT_APP_EMAIL_USER, // e.g., 'sales@sconstech.com'
    pass: process.env.REACT_APP_EMAIL_PASS, // App Password from Zoho
  },
});

// Embedded HTML templates
const thankYouEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
                    <div style="text-align: left;">
                        <a href="https://sconstech.com/" class="logo">
                            <img src="https://lustrous-sundae-be0a50.netlify.app/logo.png/" alt="Scons Tech Logo" style="width: 150px;">
                        </a>
                    </div>
                    <div style="margin-top: 40px; margin-bottom: 40px; padding: 40px 0;">
                        <h1 style="font-family: 'manrope', Arial, sans-serif; font-size: 24px; color: #333; margin: 0;">Thank you for contacting us!</h1>
                        <p style="font-size: 16px; color: #333; font-weight: 600; margin: 10px 0;">We appreciate your interest, {{name}}.</p>
                        <p style="font-size: 16px; color: #333; font-weight: 600; margin: 10px 0;">Our team will review your inquiry and get back to you soon.</p>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="main-content">
                    <p style="font-size: 14px; color: #000; font-weight: 600; line-height: 1.8;">
                        Your inquiry details:<br>
                        {{inquiryDetails}}
                    </p>
                    <a href="https://sconstech.com/">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/logo.png/" alt="Scons Tech Logo" style="width: 150px;">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer" style="text-align: center;">
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
                                <span>Copyright © 2025 <strong>Scons Tech.</strong> All rights reserved.</span>
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
                <h1 style="font-size: 24px; background: #00c5ff; padding: 15px 0; margin: 0 0 10px 0;">New {{formName}} Submission</h1>
                <p style="font-size: 14px; font-weight: bold; color: #555; margin-top: 30px;">{{dateTime}}</p>
            </td>
        </tr>
        <tr>
            <td class="data-fields">
                {{inquiryDetails}}
            </td>
        </tr>
        <tr>
            <td>
                <div class="main-content">
                    <p style="font-size: 14px; color: #000; font-weight: 600; line-height: 1.8;">
                        A new submission has been received. Please review the details above and follow up as needed.
                    </p>
                    <a href="https://sconstech.com/">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/logo.png/" alt="Scons Logo" style="width: 150px;">
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
                                <span>Copyright © 2025 <strong>Scons Tech.</strong> All rights reserved.</span>
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

function formatDate() {
  const now = new Date();
  const options = { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Karachi' };
  const date = now.toLocaleDateString('en-US', options);
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Karachi' };
  const time = now.toLocaleTimeString('en-US', timeOptions);
  return `${date} - ${time}`;
}

// Helper function to generate field HTML only for non-empty values
function generateFieldHtml(label, value) {
  if (!value || (Array.isArray(value) && value.length === 0)) return '';
  const formattedValue = Array.isArray(value) ? value.join(', ') : value;
  return `<div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">${label}:</strong> ${formattedValue}</div>`;
}

exports.handler = async function (event, context) {
  // Log environment variables for debugging
  console.log('Environment Variables:', {
    REACT_APP_EMAIL_USER: process.env.REACT_APP_EMAIL_USER,
    REACT_APP_EMAIL_PASS: process.env.REACT_APP_EMAIL_PASS ? '[REDACTED]' : 'undefined',
    REACT_APP_COMPANY_EMAIL: process.env.REACT_APP_COMPANY_EMAIL,
  });

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse form data from Netlify
    const data = JSON.parse(event.body);
    const formName = data['form-name'] || 'contact';
    const { name, email, phone, topics = [], description, url } = data;
    const dateTime = formatDate();

    // Validate required fields
    if (!name || !email || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Map topic values to human-readable labels
    const topicLabels = {
      audit: 'Audit',
      web_development: 'Web Development',
      mobile_app_dev: 'Mobile App Development',
      design_services: 'Design Services',
      marketing_seo: 'Marketing & SEO',
      ai_bot: 'AI Bot',
    };
    const formattedTopics = Array.isArray(topics)
      ? topics.map((t) => topicLabels[t] || t).join(', ')
      : topics;

    // Generate dynamic inquiry details for both emails
    const inquiryDetails = `
      ${generateFieldHtml('Name', name)}
      ${generateFieldHtml('Email', email)}
      ${generateFieldHtml('Phone', phone)}
      ${generateFieldHtml('Topics', formattedTopics)}
      ${generateFieldHtml('Description', description)}
      ${generateFieldHtml('URL', url)}
    `.trim();

    // Replace placeholders in templates
    const companyEmailHtml = companyEmailTemplate
      .replace('{{formName}}', formName.charAt(0).toUpperCase() + formName.slice(1))
      .replace('{{dateTime}}', dateTime)
      .replace('{{inquiryDetails}}', inquiryDetails);

    const thankYouEmailHtml = thankYouEmailTemplate
      .replace('{{name}}', name)
      .replace('{{inquiryDetails}}', inquiryDetails);

    // Email to the company
const mailToCompany = {
  from: '"Contact Scons Tech" <' + process.env.REACT_APP_EMAIL_USER + '>',
  to: process.env.REACT_APP_COMPANY_EMAIL,
  subject: `New ${formName.charAt(0).toUpperCase() + formName.slice(1)} Submission from ${name}`,
  html: companyEmailHtml,
};

// Email to the user
const mailToUser = {
  from: '"Contact Scons Tech" <' + process.env.REACT_APP_EMAIL_USER + '>',
  to: email,
  subject: 'Thank You for Contacting Scons Tech!',
  html: thankYouEmailHtml,
};

    // Send both emails concurrently
    await transporter.sendMail(mailToCompany);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    await transporter.sendMail(mailToUser);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error sending emails',
        error: error.message,
        stack: error.stack,
      }),
    };
  }
};
