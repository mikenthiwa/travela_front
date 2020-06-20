import moxios from 'moxios';
import ReminderManagementAPI from '../ReminderManagementAPI';

describe('ReminderSetup', () => {
  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('sends get request to the api with a query', async () => {
    const url = '?page=2';
    moxios.stubRequest(`${baseUrl}/reminderManagement/emailTemplates${url}`, {});
    const response = await ReminderManagementAPI.getAllEmailTemplates(url);
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/reminderManagement/emailTemplates${url}`);
    expect(response.data).toEqual();
  });
  it('sends enable request to the api', async () => {
    const templateId = 3;

    moxios.stubRequest(`${baseUrl}/reminderManagement/emailTemplates/enable/${templateId}`, {
      status: 200,
      response: 'Reminder email template has been successfully enabled'
    });

    const response = await ReminderManagementAPI.enableEmailTemplates(templateId);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/reminderManagement/emailTemplates/enable/${templateId}`);
    expect(response.data).toEqual('Reminder email template has been successfully enabled');

  });


  it('sends disable request to the api', async () => {
    const templateId = '3';
    const data = {
      templateId: 3,
      disableReason: {
        disableReason: 'No longer applicable'
      }
    };

    moxios.stubRequest(`${baseUrl}/reminderManagement/emailTemplates/disable/${templateId}`, {
      status: 200,
      response: 'Email template disabled successfully'
    });

    const response = await ReminderManagementAPI.disableEmailTemplate(data);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/reminderManagement/emailTemplates/disable/${templateId}`);
    expect(response.data).toEqual('Email template disabled successfully');
  });
});
