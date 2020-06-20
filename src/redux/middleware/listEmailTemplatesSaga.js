import {put, takeLatest, call} from 'redux-saga/effects';
import toast from 'toastr';
import { FETCH_ALL_EMAIL_TEMPLATES } from '../constants/actionTypes';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchAllEmailTemplatesSuccess, fetchAllEmailTemplatesFailure
} from '../actionCreator/listEmailTemplatesActions';
import ReminderManagementAPI from '../../services/ReminderManagementAPI';

export function* fetchAllEmailTemplatesSaga(action) {
  try {
    const response = yield call(ReminderManagementAPI.getAllEmailTemplates, action.url);
    yield put(fetchAllEmailTemplatesSuccess(response.data.metaData));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchAllEmailTemplatesFailure(errorMessage));
    toast.error('Possible network error');
  }
}

export function* watchFetchAllEmailTemplates() {
  yield takeLatest(FETCH_ALL_EMAIL_TEMPLATES, fetchAllEmailTemplatesSaga);
}
