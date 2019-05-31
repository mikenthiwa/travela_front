import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'toastr';
import {
  CREATE_HOTEL_ESTIMATE,
  FETCH_ALL_HOTEL_ESTIMATES
} from '../constants/actionTypes';
import {
  createHotelEstimateSuccess,
  createHotelEstimateFailure,
  fetchAllHotelEstimatesSuccess,
  fetchAllHotelEstimatesFailure
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
