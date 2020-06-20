import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'toastr';
import {
  FETCH_ALL_FLIGHT_ESTIMATES,
  CREATE_FLIGHT_ESTIMATE,
  EDIT_FLIGHT_ESTIMATE,
  DELETE_FLIGHT_ESTIMATE
} from '../constants/actionTypes';
import {
  fetchAllFlightEstimatesSuccess,
  fetchAllFlightEstimatesFailure,
  createFlightEstimateSuccess,
  createFlightEstimateFailure,
  updateFlightEstimateSuccess,
  updateFlightEstimateFailure,
  deleteFlightEstimateSuccess,
  deleteFlightEstimateFailure
} from '../actionCreator/flightEstimatesActions';
import FlightEstimateAPI from '../../services/FlightEstimateAPI';
import { closeModal } from '../actionCreator/modalActions';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* createFlightEstimateSagaAsync(action) {
  const { history } = action;
  try {
    const response = yield call(
      FlightEstimateAPI.postFlightEstimate,
      action.requestData
    );
    yield put(createFlightEstimateSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
    history.push('/travel-cost/flight-estimates');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createFlightEstimateFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchCreateFlightEstimateAsync() {
  yield takeLatest(CREATE_FLIGHT_ESTIMATE, createFlightEstimateSagaAsync);
}

export function* getAllflightEstimatesSaga() {
  try {
    const result = yield call(
      FlightEstimateAPI.getAllFlightEstimates
    );
    yield put(fetchAllFlightEstimatesSuccess(result.data));
  } catch (errors) {
    let errorMessage = apiErrorHandler(errors);
    yield put(fetchAllFlightEstimatesFailure(errorMessage));
  }
}
  
export function* watchGetAllFlightEstimates() {
  yield takeLatest(FETCH_ALL_FLIGHT_ESTIMATES, getAllflightEstimatesSaga);
}

export function* updateFlightEstimateSaga(action) {
  const { payload, estimateId, history } = action;
  try {
    const result = yield call(
      FlightEstimateAPI.updateFlightEstimate, estimateId, payload
    );
    yield put(updateFlightEstimateSuccess(result.data));
    toast.success(result.data.message);
    yield put(closeModal());
    history.push('/travel-cost/flight-estimates');
  } catch (errors) {
    let errorMessage = apiErrorHandler(errors);
    yield put(updateFlightEstimateFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchUpdateFlightEstimate() {
  yield takeLatest(EDIT_FLIGHT_ESTIMATE, updateFlightEstimateSaga);
}

export function* deleteFlightEstimateSaga(action) {
  const { estimateId } = action;
  try {
    const result = yield call(
      FlightEstimateAPI.deleteFlightEstimate, estimateId
    );
    yield put(deleteFlightEstimateSuccess(result.data.message, estimateId));
    yield put(closeModal());
    toast.success(result.data.message);
  } catch (error) {
    let errorMessage = apiErrorHandler(error);
    yield put(deleteFlightEstimateFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchDeleteFlightEstimate() {
  yield takeLatest(DELETE_FLIGHT_ESTIMATE, deleteFlightEstimateSaga);
}
