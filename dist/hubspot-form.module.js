"use strict";
// api/hubspot-form.module.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubSpotFormModule = void 0;
const hubspot_form_service_1 = require("./hubspot-form.service");
const submit_form_controller_1 = __importDefault(require("./submit-form.controller"));
exports.HubSpotFormModule = {
    service: hubspot_form_service_1.HubSpotFormService,
    handler: submit_form_controller_1.default
};
