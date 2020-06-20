import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import toast from 'toastr';
import { watchCreateReminder, watchEditReminder, watchGetSingleReminder } from '../reminderSaga';
import {
  CREATE_REMINDER_SUCCESS,
  CREATE_REMINDER,
  CREATE_REMINDER_FAILURE,
  GET_SINGLE_REMINDER_SUCCESS,
  GET_SINGLE_REMINDER,
  GET_SINGLE_REMINDER_FAILURE,
  EDIT_REMINDER_SUCCESS,
  EDIT_REMINDER,
  EDIT_REMINDER_FAILURE
} from '../../constants/actionTypes';
import ReminderAPI from '../../../services/ReminderAPI';

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

toast.error = jest.fn();
toast.success = jest.fn();

describe('Reminder sagas', () => {
  describe('createReminderAsync', () => {
    it('creates a reminder', () => {
      return expectSaga(watchCreateReminder, ReminderAPI)
        .provide([
          [call(ReminderAPI.createReminder, payload), response]
        ])
        .put({
          type: CREATE_REMINDER_SUCCESS,
          createdReminder: response.data,
        })
        .dispatch({
          type: CREATE_REMINDER,
          reminderPayload: payload,
          history: { push: jest.fn() }
        })
        .silentRun();
    });

    it('handles errors from the API', () => {
      return expectSaga(watchCreateReminder)
        .provide([
          [call(ReminderAPI.createReminder, payload), throwError('unable to fetch')]
        ])
        .put({
          type: CREATE_REMINDER_FAILURE,
          errors: {},
        })
        .dispatch({
          type: CREATE_REMINDER,
          payload,
          history: { push: jest.fn()}
        })
        .silentRun();
    });

    it('handles validation errors from the API', () => {
      const error = new Error('Condition name must be unique');
      error.response = {
        data: {
          errors: [{
            message: 'Reminder condition name already exists',
            name: 'conditionName'
          }]
        },
        status: 422
      };
      return expectSaga(watchCreateReminder)
        .provide([
          [call(ReminderAPI.createReminder, payload), throwError(error)]
        ])
        .put({
          type: CREATE_REMINDER_FAILURE,
          errors: {
            conditionName: 'Reminder condition name already exists'
          },
        })
        .dispatch({
          type: CREATE_REMINDER,
          reminderPayload: payload,
          history: { push: jest.fn()}
        })
        .silentRun();
    });
  });

  describe('GetSingleReminderAsync', () => {
    const conditionId = 1;
    it('returns single reminder', () => {
      return expectSaga(watchGetSingleReminder, ReminderAPI)
        .provide([
          [call(ReminderAPI.getSingleReminder, conditionId), response]
        ])
        .put({
          type: GET_SINGLE_REMINDER_SUCCESS,
          reminder: response.data,
        })
        .dispatch({
          type: GET_SINGLE_REMINDER,
          conditionId,
        })
        .silentRun();
    });

    it('handles errors from the API', () => {
      return expectSaga(watchGetSingleReminder)
        .provide([
          [call(ReminderAPI.getSingleReminder, conditionId), throwError('unable to fetch')]
        ])
        .put({
          type: GET_SINGLE_REMINDER_FAILURE,
          errors: {},
        })
        .dispatch({
          type: GET_SINGLE_REMINDER,
          conditionId
        })
        .silentRun();
    });

    it('handles validation errors from the API', () => {
      const error = new Error('Condition Id should be a number');
      error.response = {
        data: {
          errors: [{
            message: 'Conddition Id should be a number',
            name: 'conditionId'
          }]
        },
        status: 422
      };
      return expectSaga(watchGetSingleReminder)
        .provide([
          [call(ReminderAPI.getSingleReminder, 'conditionId'), throwError(error)]
        ])
        .put({
          type: GET_SINGLE_REMINDER_FAILURE,
          errors: {
            conditionId: 'Conddition Id should be a number'
          },
        })
        .dispatch({
          type: GET_SINGLE_REMINDER,
          conditionId: 'conditionId'
        })
        .silentRun();
    });
  });

  describe('EditSingleReminderAsync', () => {
    const conditionId = 1;
    it('updates a single reminder', () => {
      return expectSaga(watchEditReminder, ReminderAPI)
        .provide([
          [call(ReminderAPI.editReminder, payload, conditionId), response]
        ])
        .put({
          type: EDIT_REMINDER_SUCCESS,
          updatedReminder: response.data,
        })
        .dispatch({
          type: EDIT_REMINDER,
          reminderPayload: payload,
          conditionId,
          history: { push: jest.fn()}
        })
        .silentRun();
    });

    it('handles errors from the API', () => {
      return expectSaga(watchEditReminder)
        .provide([
          [call(ReminderAPI.editReminder, payload, conditionId), throwError('unable to fetch')]
        ])
        .put({
          type: EDIT_REMINDER_FAILURE,
          errors: {},
        })
        .dispatch({
          type: EDIT_REMINDER,
          payload,
          conditionId
        })
        .silentRun();
    });

    it('handles validation errors from the API', () => {
      const error = new Error('Condition name must be unique');
      error.response = {
        data: {
          errors: [{
            message: 'Reminder condition name already exists',
            name: 'conditionName'
          }]
        },
        status: 422
      };
      return expectSaga(watchEditReminder)
        .provide([
          [call(ReminderAPI.editReminder, payload, conditionId), throwError(error)]
        ])
        .put({
          type: EDIT_REMINDER_FAILURE,
          errors: {
            conditionName: 'Reminder condition name already exists'
          },
        })
        .dispatch({
          type: EDIT_REMINDER,
          reminderPayload: payload,
          conditionId,
        })
        .silentRun();
    });
  });
});
