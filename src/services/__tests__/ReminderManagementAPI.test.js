import moxios from 'moxios';
import ReminderManagementAPI from '../ReminderManagementAPI';
import {
  payload, errors, response,
  getTemplateResponse, reminderEmailTemplate,
  updateTemplateResponse
} from '../../redux/__mocks__/reminderManagement';

import { resolveBaseUrl} from '..';

const baseUrl = resolveBaseUrl();

describe('ReminderManagementAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a POST request to create a reminder email template', async () => {
    moxios.stubRequest(`${baseUrl}/reminderManagement/emailTemplates`, {
      status: 200,
      response
    });
    const res = await ReminderManagementAPI.createEmailReminderTemplate(payload);

    expect(res.data).toEqual({
      data: response.data
    });
  });

  it('sends a GET request to fetch reminder email template', async () => {
    moxios.stubRequest(
      `${baseUrl}/reminderManagement/emailTemplates/${reminderEmailTemplate.id}`,
      {
        status: 200,
        response: getTemplateResponse
      });
    const res = await ReminderManagementAPI.getSingleEmailTemplate(reminderEmailTemplate.id);

    expect(res.data).toEqual({
      data: getTemplateResponse.data
    });
  });

  it('sends a PUT request to update reminder email template', async () => {
    moxios.stubRequest(
      `${baseUrl}/reminderManagement/emailTemplates/${reminderEmailTemplate.id}`,
      {
        status: 200,
        response: updateTemplateResponse
      });
    const res = await ReminderManagementAPI.updateSingleEmailTemplate(reminderEmailTemplate.id);

    expect(res.data).toEqual({
      data: updateTemplateResponse.data
    });
  });
});
