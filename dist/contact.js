import fetch from 'node-fetch';
const HUBSPOT_API_URL = 'https://api.hsforms.com/submissions/v3/integration/submit';
const HUBSPOT_PORTAL_ID = '144974746';
const HUBSPOT_FORM_ID = '3b8ff1e7-07dc-4331-bf35-7412eebd8714';
async function submitForm(data) {
    const apiUrl = `${HUBSPOT_API_URL}/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
    const body = {
        fields: [
            { name: 'firstname', value: data.Name },
            { name: 'email', value: data.email },
            { name: 'message', value: data.message },
        ],
        context: {
            pageUri: data.pageUri,
            pageName: 'Contact Form'
        }
    };
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Failed to submit form: ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error submitting form to HubSpot:', error);
        throw new Error('Failed to submit form to HubSpot');
    }
}
export default async function handler(req, res) {
    console.log('Handler invoked');
    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }
    const { Name, email, message, pageUri } = req.body;
    console.log('Request body:', req.body);
    if (!Name || !email || !message) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const response = await submitForm({ Name, email, message, pageUri });
        console.log('Form submitted successfully');
        return res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('Internal server error:', error.message);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
        else {
            console.log('Internal server error:', error);
            return res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
        }
    }
}
