import { put, takeLatest, call } from 'redux-saga/effects';
import FileSaver from 'file-saver';
import toast from 'toastr';

import {
  fetchAnalyticsSuccess, fetchAnalyticsFailure, downloadAnalyticsFailure
} from '../actionCreator/analyticsActions';
import { FETCH_ANALYTICS, DOWNLOAD_ANALYTICS } from '../constants/actionTypes';
import apiErrorHandler from '../../services/apiErrorHandler';
import AnalyticsAPI from '../../services/AnalyticsAPI';

export function* fetchAnalyticsSaga({query}) {
  try {
    const {data} = yield call(AnalyticsAPI.getAnalytics, query);
    yield put(fetchAnalyticsSuccess(data.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchAnalyticsFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchAnalytics() {
  yield takeLatest(FETCH_ANALYTICS, fetchAnalyticsSaga);
}

export function* downloadAnalyticsSaga({query}) {
  try {
    const {data} = yield call(AnalyticsAPI.exportAnalytics, query);
    yield FileSaver.saveAs(data, 'Requests/Trips Analytics');
    toast.success('Download Successful');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(downloadAnalyticsFailure(errorMessage));
    toast.error(errorMessage);
    toast.error('Download Unsuccessful');
  }
}

export function* watchdownloadAnalytics() {
  yield takeLatest(DOWNLOAD_ANALYTICS, downloadAnalyticsSaga);
}
