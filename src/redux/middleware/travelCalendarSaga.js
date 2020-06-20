import { put, takeLatest, call } from 'redux-saga/effects';
import FileSaver from 'file-saver';
import toast from 'toastr';

import {FETCH_CALENDAR_ANALYTICS, DOWNLOAD_CALENDAR_ANALYTICS} from '../constants/actionTypes';
import CalendarAnalyticsAPI from '../../services/TravelCalendarAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

import {
  fetchCalendarAnalyticsSuccess,
  fetchCalendarAnalyticsFailure,
  downloadCalendarAnalyticsFailure} from '../actionCreator/travelCalendarActions';

export function* fetchCalendarAnalyticsSaga(action) {
  try {
    const {query} = action;
    const response = yield call(CalendarAnalyticsAPI.getCalendarAnalytics, query);
    yield put(fetchCalendarAnalyticsSuccess(response.data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchCalendarAnalyticsFailure(errorMessage));
  }
}

export function* watchFetchCalendarAnalytics() {
  yield takeLatest(FETCH_CALENDAR_ANALYTICS, fetchCalendarAnalyticsSaga);
}

export function* downloadCalendarAnalyticsSaga(action) {
  try {
    const response = yield call(CalendarAnalyticsAPI.getCalendarAnalytics, action.query);
    yield FileSaver.saveAs(response.data, 'Travel Calendar Analytics');
    toast.success('Download Successful');
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(downloadCalendarAnalyticsFailure(errorMessage));
    toast.error('Download Unsuccessful');
  }
}

export function* watchDownloadCalendarAnalytics() {
  yield takeLatest(DOWNLOAD_CALENDAR_ANALYTICS, downloadCalendarAnalyticsSaga);
}
