import moxios from 'moxios';
import ReminderAPI from '../ReminderAPI';
import { resolveBaseUrl} from '..';

const baseUrl = resolveBaseUrl();

const response = {
  data: {
    'success': true,
    'message': 'Reminder successfully created',
    'reminder': {
      'condition': {
        'id': 1,
        'conditionName': 'Travel Readiness reminder',
        'documentType': 'Passport',
        'userId': '-LMIzC-bCc10w7Uqc7-A',
        'updatedAt': '2019-01-17T05:01:17.325Z',
        'createdAt': '2019-01-17T05:01:17.325Z'
      },
      'reminders': [{
        'id': 1,
        'frequency': '1 Weeks',
        'createdAt': '2019-01-17T05:01:17.338Z',
        'updatedAt': '2019-01-17T05:01:17.338Z',
        'reminderEmailTemplateId': '10',
        'conditionId': 1
      },
      {
        'id': 2,
        'frequency': '5 Days',
        'createdAt': '2019-01-17T05:01:17.338Z',
        'updatedAt': '2019-01-17T05:01:17.338Z',
        'reminderEmailTemplateId': '20',
        'conditionId': 1
      }
      ]
    }
  }
};

const payload = {
  'conditionName': 'Travel Readiness reminder',
  'documentType': 'Passport',
  'reminders': [{
    'frequency': '2 Weeks',
    'reminderEmailTemplateId': '10'
  },
  {
    'frequency': '5 Days',
    'reminderEmailTemplateId': '10'
  }
  ]
};

describe('ReminderAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a POST request to create a reminder', async () => {
    moxios.stubRequest(`${baseUrl}/reminders`, {
      status: 201,
      response
    });
    const res = await ReminderAPI.createReminder(payload);

    expect(res.data).toEqual(response);
  });

  it('retrieves one reminder', async () => {
    moxios.stubRequest(`${baseUrl}/reminders/1`, {
      status: 200,
      response
    });
    const res = await ReminderAPI.getSingleReminder('1');
    expect(res.data).toEqual(response);
  });
});
