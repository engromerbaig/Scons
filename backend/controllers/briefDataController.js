const axios = require('axios');
const FormData = require('form-data');

exports.submitBriefData = async (req, res) => {
    try {
        const payload = req.body;
        const formData = new FormData();

        Object.keys(payload).forEach((key) => {
            if (Array.isArray(payload[key])) {
                formData.append(key, payload[key].join(', '));
            } else {
                formData.append(key, payload[key]);
            }
        });

        const response = await axios.post(process.env.BRIEF_DATA_API_URL, formData, {
            headers: formData.getHeaders(),
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: 'Failed to post brief data to API',
            error: error.response?.data || error.message,
        });
    }
};
