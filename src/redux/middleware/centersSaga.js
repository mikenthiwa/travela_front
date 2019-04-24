import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import { FETCH_CENTERS } from '../constants/actionTypes';
import CentersAPI from '../../services/CentersAPI';
import { closeModal } from '../actionCreator/modalActions';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchCentersSuccess,
  fetchCentersFailure,
  updateUserCenterFailure,
  updateUserCenter,
  updateUserCenterSuccess
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


export function* watchUpdateUserCenters() {
  yield takeLatest(updateUserCenter().type, updateCenterSaga);
}
export function* updateCenterSaga(action) {
  try {
    const response = yield call(CentersAPI.updateUserCenters, action.data);
    yield put(updateUserCenterSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateUserCenterFailure(errorMessage));
    toast.error(errorMessage);
  }
}
