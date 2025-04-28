const express = require('express');
const router = express.Router();
const apiService = require('../services/apiService');

// Route for brief data submission
router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        console.log('Received Payload:', payload);

        const response = await apiService.postBriefData(payload);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error posting brief data:', error.message);
        res.status(error.response?.status || 500).json({
            message: 'Failed to post brief data to API',
            error: error.response?.data || error.message,
        });
    }
});

module.exports = router;
