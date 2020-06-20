import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';

import { closeModal } from '../actionCreator/modalActions';
import {
  DISABLE_REMINDER_CONDITION,
  FETCH_EMAIL_REMINDERS,
  ENABLE_DISABLED_REMINDER_CONDITION,
} from '../constants/actionTypes';

import EmailReminderAPI from '../../services/emailReminderAPI';
import apiErrorHandler from '../../services/apiErrorHandler';


import {
  disableReminderConditionSuccess,
  disableReminderConditionFailure,
  fetchEmailReminderSuccess,
  fetchEmailReminderFailure,
  enableDisabledReminderConditionSuccess,
  enableDisabledReminderConditionFailure
} from '../actionCreator/emailReminderAction';

export function* fetchEmailRemindersAsync(action) {
  try {
    const { query } = action;
    const response = yield call(EmailReminderAPI.getEmailReminders, query);
    const { reminders, meta } = response.data;
    yield put(fetchEmailReminderSuccess({ reminders, meta }));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchEmailReminderFailure(errorMessage));
  }
}

export function* watchfetchEmailReminders() {
  yield takeLatest(FETCH_EMAIL_REMINDERS, fetchEmailRemindersAsync);
}
export function* disableReminderConditionAsync(action) {
  try {
    const { conditionId, reason } = action;
    const response = yield call(EmailReminderAPI.disableEmailReminderCondition, { conditionId, reason });
    yield put(disableReminderConditionSuccess(response.data.condition));
    yield put(closeModal());
    toast.success(response.data.message);
  }
  catch (error) {
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(disableReminderConditionFailure(errorMessage));
  }
}

export function* watchDisableReminderCondition() {
  yield takeLatest(DISABLE_REMINDER_CONDITION, disableReminderConditionAsync);
}

export function* enableDisabledReminderConditionAsync(action) {
  try {
    const { conditionId } = action;
    const response = yield call(
      EmailReminderAPI.enableDisabledReminderCondition, { conditionId }
    );
    yield put(enableDisabledReminderConditionSuccess(response.data.condition));
    yield put(closeModal());
    toast.success(response.data.message);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(enableDisabledReminderConditionFailure(errorMessage));
  }
}

export function* watchEnableDisabledReminderCondition() {
  yield takeLatest(ENABLE_DISABLED_REMINDER_CONDITION, enableDisabledReminderConditionAsync);
}

