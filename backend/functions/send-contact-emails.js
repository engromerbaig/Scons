const nodemailer = require('nodemailer');
const path = require('path');

// Load environment variables explicitly from .env in the same directory
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Validate environment variables
const requiredEnvVars = ['REACT_APP_EMAIL_USER', 'REACT_APP_EMAIL_PASS', 'REACT_APP_COMPANY_EMAIL'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing environment variables:', missingEnvVars);
  throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,
    pass: process.env.REACT_APP_EMAIL_PASS,
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
            src: url('https://your-netlify-site.netlify.app/fonts/manropeDisplay/manropeDisplay-Regular.woff2') format('woff2');
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
                        <a href="https://tyfora.com/" class="logo">
                            <img src="https://your-netlify-site.netlify.app/images/tyfora-logo.png" alt="Tyfora Logo" style="width: 150px;">
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
                    <p style="font-size: 14px; color: #cccbcb; font-weight: 600; line-height: 1.8;">
                        Your inquiry details:<br>
                        <strong>Phone:</strong> {{phone}}<br>
                        <strong>Topic:</strong> {{topic}}<br>
                        <strong>Description:</strong> {{description}}
                    </p>
                    <a href="https://tyfora.com/">
                        <img src="https://your-netlify-site.netlify.app/images/tyfora-logo.png" alt="Tyfora Logo" style="width: 150px;">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer" style="text-align: center;">
                    <a href="https://www.facebook.com/tyfora" aria-label="Facebook" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://your-netlify-site.netlify.app/images/facebook-icon.png" alt="Facebook" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.linkedin.com/company/tyfora" aria-label="LinkedIn" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://your-netlify-site.netlify.app/images/linkedin-icon.png" alt="LinkedIn" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.instagram.com/tyfora_/" aria-label="Instagram" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://your-netlify-site.netlify.app/images/instagram-icon.png" alt="Instagram" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://x.com/tyforaofficial" aria-label="X" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://your-netlify-site.netlify.app/images/x-icon.png" alt="X" style="width: 30px; height: 30px;">
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
                                <span>Copyright © 2025 <strong>TYFORA.</strong> All rights reserved.</span>
                            </td>
                            <td style="text-align: right; vertical-align: middle;">
                                <a href="https://tyfora.com/terms-and-conditions" style="color: #888; text-decoration: none; font-weight: 600;">
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
            src: url('https://your-netlify-site.netlify.app/fonts/manropeDisplay/manropeDisplay-Regular.woff2') format('woff2');
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
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Name:</strong> {{name}}</div>
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Email:</strong> {{email}}</div>
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Phone:</strong> {{phone}}</div>
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Topic:</strong> {{topic}}</div>
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Description:</strong> {{description}}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="main-content">
                    <p style="font-size: 14px; color: #cccbcb; font-weight: 600; line-height: 1.8;">
                        A new {{formName}} submission has been received. Please review the details above and follow up as needed.
                    </p>
                    <a href="https://tyfora.com/">
                        <img src="https://your-netlify-site.netlify.app/images/tyfora-logo.png" alt="Tyfora Logo" style="width: 150px;">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer">
                    <a href="https://www.facebook.com/tyfora" aria-label="Visit Tyfora on Facebook" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://your-netlify-site.netlify.app/images/facebook-icon.png" alt="Facebook" class="social-icons">
                    </a>
                    <a href="https://www.linkedin.com/company/tyfora" aria-label="Visit Tyfora on LinkedIn" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://your-netlify-site.netlify.app/images/linkedin-icon.png" alt="LinkedIn" class="social-icons">
                    </a>
                    <a href="https://www.instagram.com/tyfora_/" aria-label="Visit Tyfora on Instagram" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://your-netlify-site.netlify.app/images/instagram-icon.png" alt="Instagram" class="social-icons">
                    </a>
                    <a href="https://x.com/tyforaofficial" aria-label="Visit Tyfora on X" style="text-decoration: none; color: #00c5ff;">
                        <img src="https://your-netlify-site.netlify.app/images/x-icon.png" alt="X" class="social-icons">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer-bottom">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td style="text-align: left; vertical-align: middle;">
                                <span>Copyright © 2025 <strong>TYFORA.</strong> All rights reserved.</span>
                            </td>
                            <td style="text-align: right; vertical-align: middle;">
                                <a href="https://tyfora.com/terms-and-conditions" style="color: #888; text-decoration: none; font-weight: 600;">
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
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const date = now.toLocaleDateString('en-US', options);
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  const time = now.toLocaleTimeString('en-US', timeOptions);
  return `${date} - ${time}`;
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
    const { name, email, phone, topic = 'Not specified', description } = data;
    const dateTime = formatDate();

    // Validate required fields
    if (!name || !email || !phone || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Replace placeholders in templates
    const companyEmailHtml = companyEmailTemplate
      .replace('{{formName}}', formName.charAt(0).toUpperCase() + formName.slice(1))
      .replace('{{dateTime}}', dateTime)
      .replace('{{name}}', name)
      .replace('{{email}}', email)
      .replace('{{phone}}', phone)
      .replace('{{topic}}', topic)
      .replace('{{description}}', description);

    const thankYouEmailHtml = thankYouEmailTemplate
      .replace('{{name}}', name)
      .replace('{{phone}}', phone)
      .replace('{{topic}}', topic)
      .replace('{{description}}', description);

    // Email to the company
    const mailToCompany = {
      from: process.env.REACT_APP_EMAIL_USER,
      to: process.env.REACT_APP_COMPANY_EMAIL,
      subject: `New ${formName.charAt(0).toUpperCase() + formName.slice(1)} Submission from ${name}`,
      html: companyEmailHtml,
    };

    // Email to the user
    const mailToUser = {
      from: process.env.REACT_APP_EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Tyfora!',
      html: thankYouEmailHtml,
    };

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(mailToCompany),
      transporter.sendMail(mailToUser),
    ]);

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