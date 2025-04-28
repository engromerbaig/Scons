const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendMail = async (emailData) => {
    const mailToCompany = {
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL,
        subject: `Career Tyfora - New Application: ${emailData.firstName} ${emailData.lastName}`,
        html: `
            <p>A new candidate has submitted their application:</p>
            <ul>
                <li><strong>Name:</strong> ${emailData.firstName} ${emailData.lastName}</li>
                <li><strong>Email:</strong> ${emailData.email}</li>
                <li><strong>Phone:</strong> ${emailData.phone}</li>
                <li><strong>Role:</strong> ${emailData.role}</li>
                <li><strong>Source:</strong> ${emailData.source}</li>
                <li><strong>Resume:</strong> ${emailData.resumeFile}</li>
                <li><strong>Cover Letter:</strong> ${emailData.coverLetterFile}</li>
            </ul>
        `,
    };

    const mailToUser = {
        from: process.env.EMAIL_USER,
        to: emailData.email,
        subject: 'Thank you for your application',
        text: `Dear ${emailData.firstName},\n\nThank you for applying to our company.`,
    };

    await transporter.sendMail(mailToCompany);
    await transporter.sendMail(mailToUser);
};
