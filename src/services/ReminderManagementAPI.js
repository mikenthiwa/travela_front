import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ReminderManagementAPI{
  static createEmailReminderTemplate(data) {
    return axios.post( `${baseUrl}/reminderManagement/emailTemplates`,data);
  }
  static getAllEmailTemplates = (parameters) =>
    axios.get(`${baseUrl}/reminderManagement/emailTemplates${parameters}`);

  static disableEmailTemplate({templateId, disableReason}) {
    const reason = disableReason.disableReason;
    return axios.put(
      `${resolveBaseUrl()}/reminderManagement/emailTemplates/disable/${templateId}`, {
        reason
      });
  }
  static enableEmailTemplates = (templateId) =>
    axios.put(`${baseUrl}/reminderManagement/emailTemplates/enable/${templateId}`);

  static getSingleEmailTemplate(templateId){
    return axios.get(`${baseUrl}/reminderManagement/emailTemplates/${templateId}`);
  }

  static updateSingleEmailTemplate(templateId, payload){
    return axios.put(`${baseUrl}/reminderManagement/emailTemplates/${templateId}`, payload);
  }
}

export default ReminderManagementAPI;
