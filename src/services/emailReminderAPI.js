import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

export default class EmailReminderAPI {
  static getEmailReminders(query) {
    const config = {};
    if (query) {
      config['params'] = query;
    }
    return axios.get(`${baseUrl}/reminders`, config);
  }

  static enableDisabledReminderCondition({ conditionId }) {
    return axios.put(`${baseUrl}/reminders/conditions/enable/${conditionId}`);
  }

  static disableEmailReminderCondition({conditionId, reason}) {
    return axios.put(`${baseUrl}/reminders/conditions/disable/${conditionId}`, {
      reason: reason.disableReason
    });
  }
}
