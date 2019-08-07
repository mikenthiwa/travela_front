import { takeLatest, call, put } from 'redux-saga/effects';
import {
  ADD_NO_PASSPORT_NOTIFICATION, ADD_NO_PASSPORT_NOTIFICATION_SUCCESS, ADD_NO_PASSPORT_NOTIFICATION_FAILURE
} from '../constants/actionTypes';
import {
  sendNoPassportNotificationSuccess, sendNoPassportNotificationFailure
}  from '../actionCreator/noPassportActions';
import NoPassportAPI from '../../services/noPassportAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* postNoPassportNotification() {
  try {
    const response = yield call(NoPassportAPI.postNoPassport);
    yield put(sendNoPassportNotificationSuccess(response.data.message));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(sendNoPassportNotificationFailure(errorMessage));
  }
}

export function* watchPostNoPassportNotification() {
  yield takeLatest(ADD_NO_PASSPORT_NOTIFICATION, postNoPassportNotification);
}




