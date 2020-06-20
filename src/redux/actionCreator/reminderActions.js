/* eslint-disable import/prefer-default-export */
import {
  CREATE_REMINDER,
  CREATE_REMINDER_SUCCESS,
  CREATE_REMINDER_FAILURE,
  EDIT_REMINDER,
  EDIT_REMINDER_SUCCESS,
  EDIT_REMINDER_FAILURE,
  GET_SINGLE_REMINDER,
  GET_SINGLE_REMINDER_SUCCESS,
  GET_SINGLE_REMINDER_FAILURE
} from '../constants/actionTypes';

export const createReminder = (reminderPayload, history) => ({
  type: CREATE_REMINDER,
  reminderPayload,
  history
});

export const createReminderSuccess = (createdReminder) => ({
  type: CREATE_REMINDER_SUCCESS,
  createdReminder,
});

export const createReminderFailure = (errors) => ({
  type: CREATE_REMINDER_FAILURE,
  errors,
});

export const editReminder = (reminderPayload, history, conditionId) => ({
  type: EDIT_REMINDER,
  reminderPayload,
  history,
  conditionId
});

export const editReminderSuccess = (updatedReminder) => ({
  type: EDIT_REMINDER_SUCCESS,
  updatedReminder,
});

export const editReminderFailure = (errors) => ({
  type: EDIT_REMINDER_FAILURE,
  errors
});

export const getSingleReminder = (conditionId) => ({
  type: GET_SINGLE_REMINDER,
  conditionId
});

export const getSingleReminderSuccess = (reminder) => ({
  type: GET_SINGLE_REMINDER_SUCCESS,
  reminder,
});

export const getSingleReminderFailure = (errors) => ({
  type: GET_SINGLE_REMINDER_FAILURE,
  errors
});
