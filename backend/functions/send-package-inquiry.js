const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

// Validate environment variables
const requiredEnvVars = ['REACT_APP_EMAIL_USER', 'REACT_APP_EMAIL_PASS', 'REACT_APP_COMPANY_EMAIL'];
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

// HTML email templates
const thankYouEmailTemplate = `
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
                    <div style="text-align: left;">
                        <a href="https://sconstech.com/" class="logo">
                            <img src="https://lustrous-sundae-be0a50.netlify.app/logo.png/" alt="Scons Tech Logo" style="width: 150px;">
                        </a>
                    </div>
                    <div style="margin-top: 40px; margin-bottom: 40px; padding: 40px 0;">
                        <h1 style="font-family: 'manrope', Arial, sans-serif; font-size: 24px; color: #333; margin: 0;">Thank you for your package inquiry {{name}}</h1>
                        <p style="font-size: 16px; color: #333; font-weight: 600; margin: 10px 0;">We appreciate your interest in, {{packageName}}</p>
                        <p style="font-size: 16px; color: #333; font-weight: 600; margin: 10px 0;">Our team will review your interest and get back to you soon.</p>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="main-content">
                    <p style="font-size: 14px; color: #000; font-weight: 600; line-height: 1.8;">
                        Your inquiry details:<br>
                        <strong>Package Name:</strong> {{packageName}}<br>
                        <strong>Package Price:</strong> {{packagePrice}}<br>
                        <strong>Phone:</strong> {{phone}}<br>
                        <strong>Email:</strong> {{email}}
                    </p>

                    <!-- Add inside the main-content div after inquiry details -->
<p style="font-size: 16px; color: #333; font-weight: 700; margin-top: 40px;">Payment Information</p>

<div style="font-size: 14px; color: #444; line-height: 1.6; font-weight: 500; text-align: left; max-width: 500px; margin: 0 auto;">

    <p><strong>For Payments Inside Pakistan:</strong><br>
    PK19NAYA1234503112136495</p>

    <p><strong>British Pound:</strong><br>
    Beneficiary: Muhammad Omer Baig<br>
    Sort Code: 04-29-09<br>
    Account: 68661258<br>
    Revolut Ltd, 7 Westferry Circus, London, E14 4HD, UK</p>

    <p><strong>Euro:</strong><br>
    Beneficiary: Muhammad Omer Baig<br>
    IBAN: LT03 3250 0950 1703 0955<br>
    BIC: REVOLT21<br>
    Revolut Bank UAB, Vilnius, Lithuania<br>
    Correspondent BIC: CHASDEFX</p>

    <p><strong>US Dollar:</strong><br>
    Beneficiary: Muhammad Omer Baig<br>
    IBAN: LT03 3250 0950 1703 0955<br>
    BIC: REVOLT21<br>
    Revolut Bank UAB, Vilnius, Lithuania<br>
    Correspondent BIC: CHASGB2L</p>

    <p style="margin-top: 20px; color: #000;"><strong>Note:</strong> Once you make the payment, please email the receipt to <a href="mailto:sales@sconstech.com" style="color: #00c5ff;">sales@sconstech.com</a>. For any issues, contact <a href="mailto:help@sconstech.com" style="color: #00c5ff;">help@sconstech.com</a>.</p>
</div>

                    <a href="https://sconstech.com/">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/logo.png/" alt="Scons Tech Logo" style="width: 150px;">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer">
                    <a href="https://www.facebook.com/sconstech/" aria-label="Facebook">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/facebook.png" alt="Facebook" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.linkedin.com/company/sconstech/" aria-label="LinkedIn">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/linkedin.png" alt="LinkedIn" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.instagram.com/sconstech/" aria-label="Instagram">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/instagram.png" alt="Instagram" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://x.com/sconstech" aria-label="X">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/twitter.png" alt="X" style="width: 30px; height: 30px;">
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
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Name:</strong> {{name}}</div>
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Email:</strong> {{email}}</div>
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Phone:</strong> {{phone}}</div>
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Package Name:</strong> {{packageName}}</div>
                <div style="margin-bottom: 20px; font-size: 20px;"><strong style="color: #333;">Package Price:</strong> {{packagePrice}}</div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="main-content">
                    <p style="font-size: 14px; color: #000; font-weight: 600; line-height: 1.8;">
                        A new package inquiry has been received. Please review the details above and follow up as needed.
                    </p>
                    <a href="https://sconstech.com/">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/logo.png/" alt="Scons Tech Logo" style="width: 150px;">
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="footer">
                    <a href="https://www.facebook.com/sconstech/" aria-label="Facebook">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/facebook.png" alt="Facebook" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.linkedin.com/company/sconstech/" aria-label="LinkedIn">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/linkedin.png" alt="LinkedIn" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://www.instagram.com/sconstech/" aria-label="Instagram">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/instagram.png" alt="Instagram" style="width: 30px; height: 30px; margin-right: 10px;">
                    </a>
                    <a href="https://x.com/sconstech" aria-label="X">
                        <img src="https://lustrous-sundae-be0a50.netlify.app/twitter.png" alt="X" style="width: 30px; height: 30px;">
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
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const date = now.toLocaleDateString('en-US', options);
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  const time = now.toLocaleTimeString('en-US', timeOptions);
  return `${date} - ${time}`;
}

exports.handler = async function (event, context) {
  console.log('Function invoked: send-package-inquiry');
  console.log('Environment Variables:', {
    REACT_APP_EMAIL_USER: process.env.REACT_APP_EMAIL_USER,
    REACT_APP_EMAIL_PASS: process.env.REACT_APP_EMAIL_PASS ? '[REDACTED]' : 'undefined',
    REACT_APP_COMPANY_EMAIL: process.env.REACT_APP_COMPANY_EMAIL,
  });

  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    console.log('Parsed form data:', data);

    const formName = data['form-name'] || 'package-inquiry';
    const { name, email, phone, packageName, packagePrice } = data;

    if (!name || !email || !phone || !packageName || !packagePrice) {
      console.log('Validation failed. Missing fields:', { name, email, phone, packageName, packagePrice });
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing required fields',
          missing: { name, email, phone, packageName, packagePrice },
        }),
      };
    }

    const dateTime = formatDate();

    const companyEmailHtml = companyEmailTemplate
      .replace('{{formName}}', formName.charAt(0).toUpperCase() + formName.slice(1))
      .replace('{{dateTime}}', dateTime)
      .replace('{{name}}', name)
      .replace('{{email}}', email)
      .replace('{{phone}}', phone)
      .replace('{{packageName}}', packageName)
      .replace('{{packagePrice}}', packagePrice);

    const thankYouEmailHtml = thankYouEmailTemplate
      .replace('{{name}}', name)
      .replace('{{email}}', email)
      .replace('{{phone}}', phone)
      .replace('{{packageName}}', packageName)
      .replace('{{packagePrice}}', packagePrice);

    const mailToCompany = {
      from: process.env.REACT_APP_EMAIL_USER,
      to: process.env.REACT_APP_COMPANY_EMAIL,
      subject: `New ${formName.charAt(0).toUpperCase() + formName.slice(1)} Submission from ${name}`,
      html: companyEmailHtml,
    };

    const mailToUser = {
      from: process.env.REACT_APP_EMAIL_USER,
      to: email,
      subject: 'Thank You for Your Package Inquiry!',
      html: thankYouEmailHtml,
    };

    console.log('Sending company email:', mailToCompany);
    await transporter.sendMail(mailToCompany);
    console.log('Company email sent');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Sending user email:', mailToUser);
    await transporter.sendMail(mailToUser);
    console.log('User email sent');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' }),
    };
  } catch (error) {
    console.error('Error in send-package-inquiry:', error);
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