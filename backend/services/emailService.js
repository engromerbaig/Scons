const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

function formatDate() {
  const now = new Date();
  const options = { day: '2-digit', month: 'short', year: 'numeric' }; // e.g., "30-Nov-2024"
  const date = now.toLocaleDateString('en-US', options);

  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }; // e.g., "5:47 AM"
  const time = now.toLocaleTimeString('en-US', timeOptions);

  return `${date} - ${time}`;
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
async function sendCareerEmails(formData, resumeFileUrl, coverLetterFileUrl, resumeFileName, coverLetterFileName) {
  const { firstName, lastName, email, phone, linkedin, role, source, resumeUrl, coverLetterUrl } = formData;
  const dateTime = formatDate();

  // Read the company email template from the file
  const companyEmailTemplatePath = path.join(__dirname, 'templates', 'companyEmailTemplate.html');
  console.log(companyEmailTemplatePath);  // Log to verify the correct path
  
  const companyEmailTemplate = fs.readFileSync(companyEmailTemplatePath, 'utf-8');

  // Replace placeholders in the company email template with dynamic data
  const companyEmailHtml = companyEmailTemplate
  .replace('{{dateTime}}', dateTime)
    .replace('{{firstName}}', firstName)
    .replace('{{lastName}}', lastName)
    .replace('{{email}}', email)
    .replace('{{phone}}', phone)
    .replace('{{linkedin}}', linkedin)
    .replace('{{role}}', role)
    .replace('{{source}}', source)
    .replace('{{resumeUrl}}', resumeUrl)
    .replace('{{coverLetterUrl}}', coverLetterUrl)
    .replace('{{resumeFileUrl}}', resumeFileUrl)
    .replace('{{coverLetterFileUrl}}', coverLetterFileUrl)
    .replace('{{resumeFileName}}', resumeFileName)
    .replace('{{coverLetterFileName}}', coverLetterFileName);

  // Read the thank-you email template from the file
  const thankYouEmailTemplatePath = path.join(__dirname, 'templates', 'thankYouEmailTemplate.html');
  console.log(thankYouEmailTemplatePath);  // Log to verify the correct path

  const thankYouEmailTemplate = fs.readFileSync(thankYouEmailTemplatePath, 'utf-8');

  // Replace placeholders in the thank-you email template with dynamic data
  const thankYouEmailHtml = thankYouEmailTemplate
    .replace('{{firstName}}', firstName);

  // Email to the company
  const mailToCompany = {
    from: process.env.EMAIL_USER,
    to: process.env.COMPANY_EMAIL,
    subject: `Career Tyfora - New Application: ${firstName} ${lastName}`,
    html: companyEmailHtml,  // The dynamic email content
  };

  // Email to the user (thank you email)
  const mailToUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for your application',
    html: thankYouEmailHtml,  // The dynamic thank you content
  };

  // Send the emails
  await transporter.sendMail(mailToCompany);
  await transporter.sendMail(mailToUser);
}

module.exports = { sendCareerEmails };
