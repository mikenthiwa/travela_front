import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ReminderAPI{
  static createReminder(payload) {
    return axios.post(`${baseUrl}/reminders`, payload);
  }

  static editReminder(payload, conditionId) {
    return axios.put(`${baseUrl}/reminders/${conditionId}`, payload);
  }

  static getSingleReminder(conditionId) {
    return axios.get(`${baseUrl}/reminders/${conditionId}`);
  }
}

export default ReminderAPI;
