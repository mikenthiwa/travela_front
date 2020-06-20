/* eslint-disable import/prefer-default-export */
import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import { 
  createReminderSuccess, 
  createReminderFailure ,
  editReminderFailure,
  editReminderSuccess,
  getSingleReminderSuccess,
  getSingleReminderFailure,
} from '../actionCreator/reminderActions';
import apiErrorHandler from '../../services/apiErrorHandler';
import { CREATE_REMINDER, EDIT_REMINDER, GET_SINGLE_REMINDER} from '../constants/actionTypes';
import ReminderAPI from '../../services/ReminderAPI';
import apiValidationErrorHandler from '../../services/apiValidationErrorHandler';

export function* createReminderAsync(action) {
  const { reminderPayload, history } = action;
  try {
    const response = yield call(ReminderAPI.createReminder, reminderPayload);
    yield put(createReminderSuccess(response.data));
    toast.success(response.data.message);
    const { data: {reminder: {condition:{documentType} } }}= response;
    history.push(`/settings/reminders?document=${documentType.toLowerCase()}`);
  } catch (error) {
    let errors = {};
    if(error.response && error.response.status === 422) {
      errors = apiValidationErrorHandler(error);
    }
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);

    yield put(createReminderFailure(errors));
  }
}

export function* watchCreateReminder() {
  yield takeLatest(CREATE_REMINDER, createReminderAsync);
}

export function* editReminderAsync(action) {
  const { reminderPayload, history, conditionId } = action;
  try {
    const response = yield call(ReminderAPI.editReminder, reminderPayload, conditionId);
    yield put(editReminderSuccess(response.data));
    toast.success(response.data.message);
    const { documentType } = response.data.reminder.condition;
    history.push(`/settings/reminders?document=${documentType.toLowerCase()}`);
  } catch (error) {
    let errors = {};
    if(error.response && error.response.status === 422) {
      errors = apiValidationErrorHandler(error);
    }
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);

    yield put(editReminderFailure(errors));
  }
}

export function* watchEditReminder() {
  yield takeLatest(EDIT_REMINDER, editReminderAsync);
}

export function* getSingleReminderAsync(action) {
  const { conditionId } = action;
  try {
    const response = yield call(ReminderAPI.getSingleReminder, conditionId);
    yield put(getSingleReminderSuccess(response.data));
  } catch (error) {
    let errors = {};
    if(error.response && error.response.status === 422) {
      errors = apiValidationErrorHandler(error);
    }
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);

    yield put(getSingleReminderFailure(errors));
  }
}

export function* watchGetSingleReminder() {
  yield takeLatest(GET_SINGLE_REMINDER, getSingleReminderAsync);
}
