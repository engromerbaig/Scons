const { sendMail } = require('../middleware/email');

exports.handleCareerForm = async (req, res) => {
    try {
        const { body: formData, files } = req;
        const resumeFile = files?.resumeFile?.[0];
        const coverLetterFile = files?.coverLetterFile?.[0];

        const emailData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            source: formData.source,
            linkedin: formData.linkedin,
            resumeFile: resumeFile ? `${req.protocol}://${req.get('host')}/uploads/${resumeFile.filename}` : 'Not provided',
            coverLetterFile: coverLetterFile ? `${req.protocol}://${req.get('host')}/uploads/${coverLetterFile.filename}` : 'Not provided',
        };

        await sendMail(emailData);
        res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending emails' });
    }
};
