const express = require('express');
const router = express.Router();
const apiService = require('../services/apiService');

// Route for forwarding leads to CRM
router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        const response = await apiService.forwardToCRM(payload);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding leads:', error.message);
        res.status(error.response?.status || 500).json({
            message: 'Failed to forward request to CRM API',
            error: error.response?.data || error.message,
        });
    }
});

module.exports = router;
