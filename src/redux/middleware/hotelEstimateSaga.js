import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'toastr';
import {
  CREATE_HOTEL_ESTIMATE,
  FETCH_ALL_HOTEL_ESTIMATES,
  UPDATE_HOTEL_ESTIMATE,
  DELETE_HOTEL_ESTIMATE
} from '../constants/actionTypes';
import {
  createHotelEstimateSuccess,
  createHotelEstimateFailure,
  fetchAllHotelEstimatesSuccess,
  fetchAllHotelEstimatesFailure,
  updateHotelEstimateSuccess,
  updateHotelEstimateFailure,
  deleteHotelEstimateSuccess,
  deleteHotelEstimateFailure
} from '../actionCreator/hotelEstimateAction';
import HotelEstimateAPI from '../../services/HotelEstimateAPI';
import { closeModal } from '../actionCreator/modalActions';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* createHotelEstimateSagaAsync(action) {
  const { history } = action;
  try {
    const response = yield call(
      HotelEstimateAPI.postHotelEstimate,
      action.requestData
    );
    yield put(createHotelEstimateSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
    history.push(`/travel-cost/hotel-estimates${history.location.search}`);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createHotelEstimateFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchCreateHotelEstimateAsync() {
  yield takeLatest(CREATE_HOTEL_ESTIMATE, createHotelEstimateSagaAsync);
}

export function* getAllHotelEstimatesSaga(action) {
  try {
    const result = yield call(
      HotelEstimateAPI.getAllHotelEstimates,
      action.url
    );
    yield put(fetchAllHotelEstimatesSuccess(result.data));
  } catch (errors) {
    let errorMessage = apiErrorHandler(errors);
    yield put(fetchAllHotelEstimatesFailure(errorMessage));
  }
}

export function* watchgetAllHotelEstimates() {
  yield takeLatest(FETCH_ALL_HOTEL_ESTIMATES, getAllHotelEstimatesSaga);
}

export function* updateHotelEstimateSaga(action) {
  const { estimateId, payload, history } = action;
  try {
    const response = yield call(
      HotelEstimateAPI.updateHotelEstimate,
      estimateId,
      payload
    );

    yield put(updateHotelEstimateSuccess(response.data));
    toast.success('Hotel Estimate successfully updated');
    yield put(closeModal());
    history.push(`/travel-cost/hotel-estimates${history.location.search}`);
  } catch (errors) {
    let errorMessage = apiErrorHandler(errors);

    yield put(updateHotelEstimateFailure(errors));
    toast.error(errorMessage);
  }
}

export function* watchUpdateHotelEstimate() {
  yield takeLatest(UPDATE_HOTEL_ESTIMATE, updateHotelEstimateSaga);
}

export function* deleteHotelEstimateSaga(action) {
  const { estimateId } = action;
  try {
    const response = yield call(
      HotelEstimateAPI.deleteHotelEstimate,
      estimateId
    );
    yield put(deleteHotelEstimateSuccess(response.data.message, estimateId));
    yield put(closeModal());
    toast.success(response.data.message);
  } catch (errors) {
    const errorMessage = apiErrorHandler(errors);
    yield put(deleteHotelEstimateFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchDeleteHotelEstimate() {
  yield takeLatest(DELETE_HOTEL_ESTIMATE, deleteHotelEstimateSaga);
}
