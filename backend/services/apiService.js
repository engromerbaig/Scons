const axios = require('axios');
const FormData = require('form-data');

// Environment variables
const CRM_API_URL = process.env.CRM_API_URL;
const BRIEF_DATA_API_URL = process.env.BRIEF_DATA_API_URL;
const CRM_AUTH_TOKEN = process.env.CRM_AUTH_TOKEN;

// Service to post brief data
async function postBriefData(payload) {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
        if (Array.isArray(payload[key])) {
            formData.append(key, payload[key].join(', '));
        } else {
            formData.append(key, payload[key]);
        }
    });

    return await axios.post(BRIEF_DATA_API_URL, formData, {
        headers: formData.getHeaders(),
    });
}

// Service to forward data to CRM
async function forwardToCRM(payload) {
    return await axios.post(CRM_API_URL, payload, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            authtoken: CRM_AUTH_TOKEN,
            'Accept-Encoding': 'gzip,deflate',
        },
    });
}

module.exports = { postBriefData, forwardToCRM };
