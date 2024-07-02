"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubSpotFormService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const HUBSPOT_API_URL = 'https://api.hsforms.com/submissions/v3/integration/submit';
const HUBSPOT_PORTAL_ID = '144974746';
const HUBSPOT_FORM_ID = '3b8ff1e7-07dc-4331-bf35-7412eebd8714';
class HubSpotFormService {
    async submitForm(data) {
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
            const response = await (0, node_fetch_1.default)(apiUrl, {
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
        }
        catch (error) {
            console.error('Error submitting form to HubSpot:', error);
            throw new Error('Failed to submit form to HubSpot');
        }
    }
}
exports.HubSpotFormService = HubSpotFormService;
