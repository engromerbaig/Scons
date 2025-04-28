// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Initialize the app so it works
// remote reposd
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File uploads folder
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);
app.use('/uploads', express.static(UPLOADS_DIR));

// Serve static frontend files
const DIST_PATH = path.resolve(__dirname, '../dist');
app.use(express.static(DIST_PATH));

// Import routes
// const briefdataRoutes = require('./routes/briefdata');
const briefdataRoutes = require('./routes/brief');
const leadsRoutes = require('./routes/leads');
const careerRoutes = require('./routes/career');

// Use routes
app.use('/api/briefdata', briefdataRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/forms/career', careerRoutes);

// Catch-all route for the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'), (err) => {
        if (err) res.status(500).send('Error serving frontend.');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
