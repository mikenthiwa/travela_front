import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_CENTERS } from '../constants/actionTypes';
import CentersAPI from '../../services/CentersAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchCentersSuccess,
  fetchCentersFailure,
} from '../actionCreator/centersActions';

export function* watchFetchCenters() {
  yield takeLatest(FETCH_CENTERS, fetchCentersSaga);
}
export function* fetchCentersSaga(action) {
  try {
    const response = yield call(CentersAPI.fetchCenters);
    yield put(fetchCentersSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchCentersFailure(errorMessage));
  }
}
