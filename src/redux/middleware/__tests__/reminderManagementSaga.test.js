import {expectSaga} from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import {throwError} from 'redux-saga-test-plan/providers';
import { payload, errors, response, enableResponse,
  disableResponse, disableErrors, getTemplateResponse
} from '../../__mocks__/reminderManagement';
import {
  watchCreateEmailReminderTemplate,
  watchEnableEmailReminderTemplate,
  watchdisableEmailTemplate,
  watchUpdateSingleReminderEmailTemplateSaga,
  watchGetSingleEmailReminderTemplate,
} from '../reminderManagementSaga';
import ReminderManagementAPI from '../../../services/ReminderManagementAPI';

import {
  CREATE_REMINDER_EMAIL_TEMPLATE,
  CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  ENABLE_REMINDER_EMAIL_TEMPLATE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  DISABLE_EMAIL_TEMPLATE,
  DISABLE_EMAIL_TEMPLATE_SUCCESS,
  DISABLE_EMAIL_TEMPLATE_FAILURE,
  UPDATE_REMINDER_EMAIL_TEMPLATE,
  UPDATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  UPDATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  FETCH_ONE_EMAIL_TEMPLATE_SUCCESS,
  FETCH_ONE_EMAIL_TEMPLATE_FAILURE,
  FETCH_ONE_EMAIL_TEMPLATE
} from '../../constants/actionTypes';
import {
  reminderTemplateData, myResponse, enabledResponse
} from '../../../views/ReminderSetup/__mocks__/ReminderSetup';

describe('Reminder Management Saga', () => {
  const error = new Error('Server error, try again');
  error.response = { status: 500};

  const validationError = new Error('Validation failed');
  validationError.response = { data: {errors} , status: 422};

  describe('Reminder Setup', () => {
    it('creates a reminder email template', () => {
      return expectSaga(watchCreateEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.createEmailReminderTemplate, payload), response]
        ])
        .put({
          type: CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
          response: response.data
        })
        .dispatch({
          type: CREATE_REMINDER_EMAIL_TEMPLATE,
          payload,
          history: { push: jest.fn()}
        })
        .silentRun();
    });

    it('handles 422 errors from creating an email template', () => {
      return expectSaga(watchCreateEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.createEmailReminderTemplate, payload), throwError(validationError)]
        ])
        .put({
          type: CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
          errors: {
            [errors[0].name]: errors[0].message
          }
        })
        .dispatch({
          type: CREATE_REMINDER_EMAIL_TEMPLATE,
          payload,
          history: { push: jest.fn()}
        })
        .silentRun();
    });

    it('handles other errors from creating an email template', () => {
      return expectSaga(watchCreateEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.createEmailReminderTemplate, payload), throwError(error)]
        ])
        .put({
          type: CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
          errors: {}
        })
        .dispatch({
          type: CREATE_REMINDER_EMAIL_TEMPLATE,
          payload,
          history: { push: jest.fn()}
        })
        .silentRun();
    });
  });
  describe('Reminder Enabling', () => {
    const errors = new Error('Server error, try again');
    errors.response = { status: 500};
    const templateId = 1;
    it('should enable a reminder email template', () => {

      return expectSaga(watchEnableEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.enableEmailTemplates, templateId), throwError(errors)]
        ])
        .put({
          type: ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE,
          errors
        })
        .dispatch({
          type: ENABLE_REMINDER_EMAIL_TEMPLATE,
          templateId

        })
        .silentRun();
    });
    it('should enable a reminder email template', () => {

      return expectSaga(watchEnableEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.enableEmailTemplates, templateId), enableResponse]
        ])
        .put({
          type: ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
          enabledTemplate: enableResponse.data.updatedTemplate, templateId
        })
        .dispatch({
          type: ENABLE_REMINDER_EMAIL_TEMPLATE,
          templateId
        })
        .silentRun();
    });
  });

  describe('Reminder Disabling', () => {
    const payload2 = {
      templateId: { id: 1},
      disableReason: 'Not needed anymore'
    };
    it('should disable a reminder email template', () => {

      return expectSaga(watchdisableEmailTemplate)
        .provide([
          [call(ReminderManagementAPI.disableEmailTemplate, payload2), disableResponse]
        ])
        .put({
          type: DISABLE_EMAIL_TEMPLATE_SUCCESS,
          disabledTemplate: disableResponse.data.updatedTemplate,
          reason: payload2.disableReason
        })
        .dispatch({
          type: DISABLE_EMAIL_TEMPLATE,
          templateId: payload2.templateId,
          disableReason: payload2.disableReason
        })
        .silentRun();
    });
  });

  describe('Update single email template', () => {
    it('edits a single email reminder template', () => {
      const {id } = reminderTemplateData;
      return expectSaga(watchUpdateSingleReminderEmailTemplateSaga)
        .provide([
          [call(ReminderManagementAPI.updateSingleEmailTemplate, id, reminderTemplateData ), myResponse]
        ])
        .put({
          type: UPDATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
          response: myResponse.data
        })
        .dispatch({
          type: UPDATE_REMINDER_EMAIL_TEMPLATE,
          templateId: id,
          payload: reminderTemplateData,
          history: { push: jest.fn()}
        })
        .silentRun();
    });

    it('handles validation errors from updating an email template', () => {
      const {id } = reminderTemplateData;
      return expectSaga(watchUpdateSingleReminderEmailTemplateSaga)
        .provide([
          [call(ReminderManagementAPI.updateSingleEmailTemplate, id, reminderTemplateData),
            throwError(validationError)]
        ])
        .put({
          type: UPDATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
          errors: {
            [errors[0].name]: errors[0].message
          }
        })
        .dispatch({
          type: UPDATE_REMINDER_EMAIL_TEMPLATE,
          templateId: id,
          history: { push: jest.fn()},
          payload: reminderTemplateData
        })
        .silentRun();
    });
  });

  describe('Fetch single email reminder template', () => {
    it('fetches a single email reminder email template', () => {
      const {id } = reminderTemplateData;
      return expectSaga(watchGetSingleEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.getSingleEmailTemplate, id), getTemplateResponse]
        ])
        .put({
          type: FETCH_ONE_EMAIL_TEMPLATE_SUCCESS,
          response: getTemplateResponse.data
        })
        .dispatch({
          type: FETCH_ONE_EMAIL_TEMPLATE,
          templateId: id,
          history: { push: jest.fn()}
        })
        .silentRun();
    });

    it('updates with errors on failed fetch ', () => {
      const {id } = reminderTemplateData;
      return expectSaga(watchGetSingleEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.getSingleEmailTemplate, id), throwError(error)]
        ])
        .put({
          type: FETCH_ONE_EMAIL_TEMPLATE_FAILURE,
          errors: 'Server error, try again'
        })
        .dispatch({
          type: FETCH_ONE_EMAIL_TEMPLATE,
          templateId: id,
          history: { push: jest.fn()}
        })
        .silentRun();
    });
  });
});
