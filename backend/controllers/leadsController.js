const axios = require('axios');

exports.forwardLeads = async (req, res) => {
    try {
        const payload = req.body;
        const response = await axios.post(process.env.CRM_API_URL, payload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authtoken': process.env.CRM_AUTH_TOKEN,
                'Accept-Encoding': 'gzip,deflate',
            },
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: 'Failed to forward request to CRM API',
            error: error.response?.data || error.message,
        });
    }
};
