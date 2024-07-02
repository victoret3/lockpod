import fetch from 'node-fetch';

const HUBSPOT_API_URL = process.env.HUBSPOT_API_URL;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID;

export class HubSpotFormService {
  async submitForm(data: any): Promise<any> {
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
        const errorData = await response.json();
        console.error('Error submitting form to HubSpot:', errorData);
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting form to HubSpot:', error);
      throw new Error('Failed to submit form to HubSpot');
    }
  }
}
