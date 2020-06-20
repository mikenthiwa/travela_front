import {
  fetchEmailReminder,
  fetchEmailReminderFailure,
  fetchEmailReminderSuccess,
  disableReminderCondition,
  disableReminderConditionSuccess,
  disableReminderConditionFailure,
  enableDisabledReminderCondition,
  enableDisabledReminderConditionSuccess,
  enableDisabledReminderConditionFailure,
} from '../emailReminderAction';

import {
  DISABLE_REMINDER_CONDITION,
  DISABLE_REMINDER_CONDITION_SUCCESS,
  DISABLE_REMINDER_CONDITION_FAILURE,
  ENABLE_DISABLED_REMINDER_CONDITION,
  ENABLE_DISABLED_REMINDER_CONDITION_SUCCESS,
  ENABLE_DISABLED_REMINDER_CONDITION_FAILURE,
} from '../../constants/actionTypes';

import emailReminderMockData from '../../__mocks__/emailReminderConditionMockData';

describe('Reminder Actions', () => {
  describe('Email Reminder Action', () => {
    it('should return FETCH_EMAIL_REMINDERS_SUCCESS', () => {
      const expectedAction = {
        type: 'FETCH_EMAIL_REMINDERS_SUCCESS'
      };
      const newAction = fetchEmailReminderSuccess(emailReminderMockData);
      expect(newAction.type).toEqual(expectedAction.type);
    });

    it('should  return action TYPE FETCH_EMAIL_REMINDERS', () => {
      const expectedActionType = {
        type: 'FETCH_EMAIL_REMINDERS'
      };
      const newAction = fetchEmailReminder();
      expect(newAction.type).toEqual(expectedActionType.type);
    });

    it('should  return action TYPE FETCH_EMAIL_REMINDERS', () => {
      const expectedActionType = {
        type: 'FETCH_EMAIL_REMINDERS_FAILURE'
      };
      const newAction = fetchEmailReminderFailure({});
      expect(newAction.type).toEqual(expectedActionType.type);
    });
  });

  describe('Email Reminder Action', () => {
    describe('Disable Email Reminder Actions', () => {
      it('should return action of type DISABLE_REMINDER_CONDITION', () => {
        const expectedAction = {
          type: DISABLE_REMINDER_CONDITION,
          conditionId: 'zdy6fs77sq',
          reason: 'No longer applicable',
        };
        const newAction = disableReminderCondition('zdy6fs77sq', 'No longer applicable');
        expect(newAction).toEqual(expectedAction);
      });

      it('should return action of type DISABLE_REMINDER_CONDITION_SUCCESS', () => {
        const expectedAction = {
          type: DISABLE_REMINDER_CONDITION_SUCCESS,
          condition: 'No longer applicable',
        };
        const newAction = disableReminderConditionSuccess('No longer applicable');
        expect(newAction).toEqual(expectedAction);
      });

      it('should return action of type DISABLE_REMINDER_CONDITION_FAILURE', () => {
        const expectedAction = {
          type: DISABLE_REMINDER_CONDITION_FAILURE,
          error: 'Condition not found'
        };
        const newAction = disableReminderConditionFailure('Condition not found');
        expect(newAction).toEqual(expectedAction);
      });
    });
  });

  describe('Enable disabled Email Reminder Actions', () => {
    it('should return action of type ENABLE_DISABLED_REMINDER_CONDITION', () => {
      const expectedAction = {
        type: ENABLE_DISABLED_REMINDER_CONDITION,
        conditionId: 'restoration',
      };
      const newAction = enableDisabledReminderCondition('restoration');
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DISABLE_REMINDER_CONDITION_SUCCESS', () => {
      const expectedAction = {
        type: ENABLE_DISABLED_REMINDER_CONDITION_SUCCESS,
        condition: 'Brought back from the edge of extinction',
      };
      const newAction = enableDisabledReminderConditionSuccess('Brought back from the edge of extinction');
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DISABLE_REMINDER_CONDITION_FAILURE', () => {
      const expectedAction = {
        type: ENABLE_DISABLED_REMINDER_CONDITION_FAILURE,
        error: 'Condition not found'
      };
      const newAction = enableDisabledReminderConditionFailure('Condition not found');
      expect(newAction).toEqual(expectedAction);
    });
  });
});
