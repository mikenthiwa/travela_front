import {
  CREATE_REMINDER,
  CREATE_REMINDER_SUCCESS,
  CREATE_REMINDER_FAILURE,
  GET_SINGLE_REMINDER,
  EDIT_REMINDER,
  EDIT_REMINDER_SUCCESS,
  EDIT_REMINDER_FAILURE
} from '../../constants/actionTypes';
import {
  createReminder,
  createReminderSuccess,
  createReminderFailure,
  getSingleReminder,
  editReminder,
  editReminderSuccess,
  editReminderFailure
} from '../reminderActions';

describe('Reminder actions', () => {
  describe('fetch reminder email templates', () => {
    it('should create the action CREATE_REMINDER type', () => {
      const reminderPayload = {
        documentType: 'passport',
        conditionName: 'Passport reminder',
      };

      const expectedAction = {
        type: CREATE_REMINDER,
        reminderPayload,
      };

      const action = createReminder(reminderPayload);
      expect(action).toEqual(expectedAction);
    });

    it('should create the action CREATE_REMINDER_SUCCESS type', () => {
      const createdReminder = {
        condition: {
          id: 1,
          conditionName: 'Passport reminder'
        },
        reminders: [{ id: 1}, { id: 2}]
      };
      const expectedAction = {
        type: CREATE_REMINDER_SUCCESS,
        createdReminder,
      };

      const action = createReminderSuccess(createdReminder);
      expect(action).toEqual(expectedAction);
    });

    it('should create the action CREATE_REMINDER_FAILURE type', () => {
      const errors = 'Error creating reminder';
      const expectedAction = {
        type: CREATE_REMINDER_FAILURE,
        errors,
      };

      const action = createReminderFailure(errors);
      expect(action).toEqual(expectedAction);
    });

  });

  describe('Update Reminder Actions', () => {
    it('should create the action of GET_SINGLE_REMINDER type', () => {
      const reminderPayload = {
        'reminder': {
          'id': 1,
          'conditionName': 'Travel Now',
          'documentType': 'Visa',
          'disabled': false,
        }
      };

      const expectedAction = {
        type: GET_SINGLE_REMINDER,
        conditionId: reminderPayload
      };

      const action = getSingleReminder(reminderPayload);
      expect(action).toEqual(expectedAction);
    });

    it('should create the action of EDIT_REMINDER type', () => {
      const reminderPayload = {
        documentType: 'passport',
        conditionName: 'Passport reminder',
        reminders: [
          { 
            frequency: '6 Days',
            reminderTemplateId: 1,
          },
        ]
      };

      const expectedAction = {
        type: EDIT_REMINDER,
        reminderPayload,
      };

      const action = editReminder(reminderPayload);
      expect(action).toEqual(expectedAction);
    });

    it('should create the action of EDIT_REMINDER_SUCCESS type', () => {
      const reminderPayload = {
        'conditionName': 'Travel Now',
        'id':1,
        'documentType': 'Visa',
        'reminders': [
          {
            'frequency': '9 Days',
            'id': 1,
            'reminderEmailTemplateId': '1'
          }
        ]
      };

      const expectedAction = {
        type: EDIT_REMINDER_SUCCESS,
        updatedReminder: reminderPayload
      };

      const action = editReminderSuccess(reminderPayload);
      expect(action).toEqual(expectedAction);
    });

    it('should create the action EDIT_REMINDER_FAILURE type', () => {
      const errors = 'Error updating reminder';
      const expectedAction = {
        type: EDIT_REMINDER_FAILURE,
        errors,
      };

      const action = editReminderFailure(errors);
      expect(action).toEqual(expectedAction);
    });
  });
});
