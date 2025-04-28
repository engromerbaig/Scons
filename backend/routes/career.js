const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const emailService = require('../services/emailService');

// Configure file uploads with absolute path
const UPLOADS_DIR = path.join(__dirname, '../uploads');
// Ensure the directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Route for form submission with file uploads
router.post(
    '/',
    upload.fields([{ name: 'resumeFile', maxCount: 1 }, { name: 'coverLetterFile', maxCount: 1 }]),
    async (req, res) => {
        try {
            console.log('Form submission received:', req.body);
            console.log('Files received:', req.files);
            
            const formData = req.body;
            const resumeFile = req.files?.resumeFile?.[0];
            const coverLetterFile = req.files?.coverLetterFile?.[0];

            // Generate file URLs
            const resumeFileUrl = resumeFile
                ? `${req.protocol}://${req.get('host')}/uploads/${resumeFile.filename}`
                : 'Not provided';
            const coverLetterFileUrl = coverLetterFile
                ? `${req.protocol}://${req.get('host')}/uploads/${coverLetterFile.filename}`
                : 'Not provided';

            // Get original file names
            const resumeFileName = resumeFile?.originalname || 'Not provided';
            const coverLetterFileName = coverLetterFile?.originalname || 'Not provided';

            // Send emails
            await emailService.sendCareerEmails(
                formData,
                resumeFileUrl,
                coverLetterFileUrl,
                resumeFileName,
                coverLetterFileName
            );

            res.status(200).json({ message: 'Emails sent successfully!' });
        } catch (error) {
            console.error('Error sending emails:', error);
            res.status(500).json({ message: 'Error sending emails' });
        }
    }
);

module.exports = router;