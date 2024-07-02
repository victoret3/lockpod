import { VercelRequest, VercelResponse } from '@vercel/node';
import { HubSpotFormService } from './hubspot-form.service';

const hubSpotFormService = new HubSpotFormService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const response = await hubSpotFormService.submitForm({ Name, email, message, pageUri });
    console.log('Form submitted successfully');
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      console.log('Internal server error:', error.message);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
      console.log('Internal server error:', error);
      return res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
    }
  }
}
